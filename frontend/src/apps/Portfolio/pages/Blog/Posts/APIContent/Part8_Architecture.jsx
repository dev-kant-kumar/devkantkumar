import { AlertTriangle, Blocks, Server } from "lucide-react";
import { CodeBlock, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part8_Architecture() {
  return (
    <div className="space-y-16">
      {/* Design Patterns */}
      <section>
        <SectionHeading id="design-patterns" icon={Blocks} gradient="from-indigo-500 to-violet-600">
          API Design Patterns
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">Service Layer Pattern</h3>
          <CodeBlock language="bash" code={`Routes → Controllers → Services → Repositories → Database
           ↓               ↓
       Validates        Business
       HTTP layer        Logic`} />

          <CodeBlock language="js" code={`// Repository — only DB queries
class UserRepository {
  async findById(id) { return db.query('SELECT * FROM users WHERE id = $1', [id]); }
  async create(data) { return db.query('INSERT INTO users...', [...Object.values(data)]); }
}

// Service — business logic
class UserService {
  constructor(userRepo, emailService) {
    this.userRepo = userRepo;
    this.emailService = emailService;
  }

  async create(data) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new ConflictError('Email already registered');

    const hashed = await bcrypt.hash(data.password, 12);
    const user = await this.userRepo.create({ ...data, password: hashed });

    await this.emailService.sendWelcome(user.email);
    return this.sanitize(user);
  }

  sanitize(user) {
    const { password, ...safe } = user;
    return safe;
  }
}

// Controller — HTTP concern only
const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201)
       .setHeader('Location', \`/users/\${user.id}\`)
       .json(user);
  } catch (err) {
    next(err);
  }
};`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Long-Running Jobs (202 Accepted)</h3>
          <CodeBlock language="js" code={`// POST /exports — start async job
app.post('/exports', authenticate, async (req, res) => {
  const jobId = uuidv4();

  // Start async job (don't await)
  exportQueue.add(jobId, { userId: req.user.id, params: req.body });

  res.status(202)
     .setHeader('Location', \`/exports/\${jobId}/status\`)
     .json({ jobId, status: 'queued' });
});

// GET /exports/:jobId/status — poll for status
app.get('/exports/:jobId/status', authenticate, async (req, res) => {
  const job = await exportQueue.getJob(req.params.jobId);
  const state = await job.getState();

  const statusMap = { waiting: 'queued', active: 'processing',
                      completed: 'done', failed: 'failed' };

  res.json({
    jobId: job.id,
    status: statusMap[state],
    progress: job.progress,
    result: state === 'completed' ? job.returnvalue : null,
    error: state === 'failed' ? job.failedReason : null,
  });
});`} />
        </div>
      </section>

      {/* API Gateway */}
      <section>
        <SectionHeading id="api-gateway" icon={Server} gradient="from-slate-500 to-gray-600">
          API Gateway & Reverse Proxy
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">Nginx as API Gateway</h3>
          <CodeBlock language="nginx" code={`upstream api_v1 {
    least_conn;
    server app1:3000 weight=5;
    server app2:3000 weight=5;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    # SSL
    ssl_certificate /etc/ssl/certs/api.crt;
    ssl_certificate_key /etc/ssl/private/api.key;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
    limit_req zone=api burst=20 nodelay;

    location /api/ {
        proxy_pass http://api_v1;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Request-ID $request_id;

        # Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}`} />
        </div>
      </section>

      {/* Microservices */}
      <section>
        <SectionHeading id="microservices" icon={Blocks} gradient="from-teal-500 to-emerald-600">
          Microservices & API Communication
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">Circuit Breaker Pattern</h3>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            Prevents cascading failures when a downstream service goes down. The circuit <strong className="text-white">opens</strong> after too many failures and stops sending requests until the service recovers.
          </p>

          <CodeBlock language="js" code={`const CircuitBreaker = require('opossum');

const paymentServiceCall = (data) => axios.post('http://payment-service/charge', data);

const breaker = new CircuitBreaker(paymentServiceCall, {
  timeout: 3000,        // fail if takes > 3s
  errorThresholdPercentage: 50,  // open if >50% fail
  resetTimeout: 30000,  // try again after 30s
  volumeThreshold: 10,  // min requests before calculating %
});

breaker.on('open', () => logger.warn('Payment circuit breaker OPEN'));
breaker.on('halfOpen', () => logger.info('Payment circuit breaker testing'));
breaker.on('close', () => logger.info('Payment circuit breaker CLOSED'));

// Fallback when circuit is open
breaker.fallback((data) => ({ status: 'queued', message: 'Processing delayed' }));

// Use
const result = await breaker.fire(paymentData);`} />

          <InfoBox type="warning" title="Microservices Communication Rules" icon={AlertTriangle}>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Sync (HTTP/gRPC)</strong> — only for request-response where you need an immediate answer</li>
              <li>• <strong>Async (Message Queue)</strong> — for fire-and-forget events, decoupled processing</li>
              <li>• Always implement <strong>circuit breakers</strong> for inter-service calls</li>
              <li>• Use <strong>service discovery</strong> instead of hardcoded URLs</li>
              <li>• Implement the <strong>Saga pattern</strong> for distributed transactions</li>
            </ul>
          </InfoBox>
        </div>
      </section>
    </div>
  );
}
