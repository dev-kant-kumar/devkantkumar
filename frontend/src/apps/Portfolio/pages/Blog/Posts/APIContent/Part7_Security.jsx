import { Shield, Zap } from "lucide-react";
import { CodeBlock, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part7_Security() {
  return (
    <div className="space-y-16">
      {/* API Security */}
      <section>
        <SectionHeading id="api-security" icon={Shield} gradient="from-red-500 to-pink-600">
          API Security
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">JWT — Production Implementation</h3>
          <CodeBlock language="js" code={`const jwt = require('jsonwebtoken');

// Access token: short-lived (15 minutes)
function generateAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m', issuer: 'api.example.com', audience: 'app.example.com' }
  );
}

// Refresh token: long-lived (7 days), stored in DB
function generateRefreshToken(user) {
  return jwt.sign(
    { sub: user.id, tokenFamily: uuidv4() },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
}

// Middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      issuer: 'api.example.com',
      audience: 'app.example.com',
    });
    req.user = payload;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Rate Limiting</h3>
          <CodeBlock language="js" code={`const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

// Global rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ client: redisClient }),
}));

// Strict limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts', retryAfter: 900 },
  keyGenerator: (req) => \`\${req.ip}:\${req.body?.email ?? 'unknown'}\`,
});

app.post('/auth/login', authLimiter, loginHandler);`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">OWASP API Security Top 10 (2023)</h3>
          <div className="space-y-3">
            {[
              { num: 1, title: "Broken Object Level Authorization", desc: "Always check user owns the resource" },
              { num: 2, title: "Broken Authentication", desc: "Proper token validation, no secrets in URLs" },
              { num: 3, title: "Broken Object Property Level Authorization", desc: "Don't return excess fields" },
              { num: 4, title: "Unrestricted Resource Consumption", desc: "Rate limiting, pagination limits" },
              { num: 5, title: "Broken Function Level Authorization", desc: "Check permissions per endpoint" },
              { num: 6, title: "Unrestricted Access to Sensitive Business Flows", desc: "Anti-automation" },
              { num: 7, title: "Server-Side Request Forgery (SSRF)", desc: "Validate URLs in user input" },
              { num: 8, title: "Security Misconfiguration", desc: "Remove default creds, disable debug in prod" },
              { num: 9, title: "Improper Inventory Management", desc: "Document and retire old API versions" },
              { num: 10, title: "Unsafe Consumption of APIs", desc: "Validate third-party API responses" },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-3 p-3 rounded-lg bg-red-900/10 border border-red-800/30">
                <span className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs flex-shrink-0 mt-0.5">
                  {item.num}
                </span>
                <div>
                  <span className="font-bold text-red-300 text-sm">{item.title}</span>
                  <span className="text-slate-400 text-sm"> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Performance */}
      <section>
        <SectionHeading id="api-performance" icon={Zap} gradient="from-yellow-500 to-amber-600">
          API Performance & Optimization
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">Caching Strategy (Redis)</h3>
          <CodeBlock language="js" code={`const redis = require('ioredis');
const client = new redis(process.env.REDIS_URL);

// Cache middleware
const cache = (ttl = 60) => async (req, res, next) => {
  if (req.method !== 'GET') return next();

  const key = \`cache:\${req.originalUrl}:\${req.user?.id ?? 'anon'}\`;
  const cached = await client.get(key);

  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(JSON.parse(cached));
  }

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    client.setex(key, ttl, JSON.stringify(data)).catch(() => {});
    res.setHeader('X-Cache', 'MISS');
    return originalJson(data);
  };

  next();
};

// Use on specific routes
app.get('/products', cache(300), getProducts);     // 5 min
app.get('/products/:id', cache(3600), getProduct); // 1 hour`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">HTTP Caching with ETags</h3>
          <CodeBlock language="js" code={`const crypto = require('crypto');

app.get('/users/:id', async (req, res) => {
  const user = await UserService.findById(req.params.id);
  if (!user) return res.status(404).end();

  const etag = \`"\${crypto.createHash('md5').update(JSON.stringify(user)).digest('hex')}"\`;
  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');

  // Conditional GET — avoid sending body if unchanged
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }

  res.json(user);
});`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Compression</h3>
          <CodeBlock language="js" code={`const compression = require('compression');

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  level: 6,      // balance between speed and compression
  threshold: 1024, // only compress responses > 1KB
}));`} />

          <InfoBox type="tip" title="Performance Quick Wins" icon={Zap}>
            <ul className="space-y-1 text-sm">
              <li>• Use <strong>Redis</strong> for hot-path caching (user sessions, product listings)</li>
              <li>• Set <strong>ETags</strong> on GET responses for conditional requests</li>
              <li>• Enable <strong>gzip/Brotli compression</strong> for all JSON responses</li>
              <li>• Use <strong>connection pooling</strong> for database and HTTP agents</li>
              <li>• Stream large responses instead of buffering in memory</li>
            </ul>
          </InfoBox>
        </div>
      </section>
    </div>
  );
}
