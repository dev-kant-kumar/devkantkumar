import { Activity, FileText, Lightbulb, TestTube } from "lucide-react";
import { CodeBlock, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part9_Testing() {
  return (
    <div className="space-y-16">
      {/* API Testing */}
      <section>
        <SectionHeading id="api-testing" icon={TestTube} gradient="from-green-500 to-emerald-600">
          API Testing
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">Integration Testing with Supertest</h3>
          <CodeBlock language="js" code={`const request = require('supertest');
const app = require('../src/app');

describe('POST /users', () => {
  it('creates a user and returns 201', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('Authorization', \`Bearer \${testToken}\`)
      .send({ name: 'Alice', email: 'alice@example.com', password: 'Str0ng!Pass' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Alice', email: 'alice@example.com' });
    expect(res.body).not.toHaveProperty('password');
    expect(res.headers.location).toMatch(/\\/users\\/.+/);
  });

  it('returns 409 for duplicate email', async () => {
    await createUser({ email: 'existing@example.com' });
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'existing@example.com', name: 'Bob', password: 'Str0ng!Pass' });

    expect(res.status).toBe(409);
    expect(res.body.error).toBeDefined();
  });
});`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Load Testing with k6</h3>
          <CodeBlock language="js" filename="k6 load test script" code={`import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // ramp up to 50 users
    { duration: '3m', target: 50 },   // hold
    { duration: '1m', target: 200 },  // spike
    { duration: '2m', target: 200 },  // hold spike
    { duration: '1m', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.01'],
  },
};

export default function() {
  const res = http.get(\`\${__ENV.API_URL}/users\`, {
    headers: { Authorization: \`Bearer \${__ENV.TOKEN}\` },
  });

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  errorRate.add(!success);
  sleep(1);
}`} />
        </div>
      </section>

      {/* Documentation */}
      <section>
        <SectionHeading id="api-documentation" icon={FileText} gradient="from-blue-500 to-cyan-600">
          API Documentation
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">OpenAPI 3.x Specification</h3>
          <CodeBlock language="yaml" code={`openapi: 3.1.0
info:
  title: My Production API
  version: 2.0.0
  description: Production-grade RESTful API

servers:
  - url: https://api.example.com/v2
    description: Production
  - url: https://staging-api.example.com/v2
    description: Staging

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    User:
      type: object
      required: [id, name, email, createdAt]
      properties:
        id: { type: string, format: uuid }
        name: { type: string, minLength: 2 }
        email: { type: string, format: email }
        createdAt: { type: string, format: date-time }

    Error:
      type: object
      required: [error]
      properties:
        error:
          type: object
          required: [message, code]
          properties:
            message: { type: string }
            code: { type: string }

security:
  - bearerAuth: []

paths:
  /users:
    get:
      summary: List users
      operationId: listUsers
      parameters:
        - name: page
          in: query
          schema: { type: integer, minimum: 1, default: 1 }
        - name: limit
          in: query
          schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
      responses:
        '200':
          description: Paginated user list`} />

          <InfoBox type="tip" title="DX Best Practices" icon={Lightbulb}>
            <ul className="space-y-1 text-sm">
              <li>• Use <strong>Swagger UI</strong>, <strong>Redoc</strong>, or <strong>Scalar</strong> for interactive docs</li>
              <li>• Maintain a <strong>changelog</strong> for every API version</li>
              <li>• Provide <strong>runnable code samples</strong> in multiple languages</li>
              <li>• Include a <strong>Postman collection</strong> for quick testing</li>
            </ul>
          </InfoBox>
        </div>
      </section>

      {/* Observability */}
      <section>
        <SectionHeading id="observability" icon={Activity} gradient="from-purple-500 to-pink-600">
          API Observability & Monitoring
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">Structured Logging with Pino</h3>
          <CodeBlock language="js" code={`const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: 'user-api',
    version: process.env.npm_package_version,
    env: process.env.NODE_ENV,
  },
});

// Request logging middleware
app.use((req, res, next) => {
  req.log = logger.child({ requestId: req.id });
  const start = Date.now();

  res.on('finish', () => {
    req.log.info({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: Date.now() - start,
    }, 'request completed');
  });

  next();
});`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">OpenTelemetry Tracing</h3>
          <CodeBlock language="js" code={`const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: 'http://otel-collector:4318/v1/traces' }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PgInstrumentation(),
  ],
  serviceName: 'user-api',
});

sdk.start(); // Must be called before any other imports!`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Health Check Endpoint</h3>
          <CodeBlock language="js" code={`app.get('/health', async (req, res) => {
  const checks = await Promise.allSettled([
    db.query('SELECT 1'),
    redis.ping(),
    checkExternalService(),
  ]);

  const [db_check, redis_check, external_check] = checks;
  const allHealthy = checks.every(c => c.status === 'fulfilled');

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    checks: {
      database: db_check.status === 'fulfilled' ? 'up' : 'down',
      cache: redis_check.status === 'fulfilled' ? 'up' : 'down',
      external: external_check.status === 'fulfilled' ? 'up' : 'down',
    },
    uptime: process.uptime(),
  });
});`} />
        </div>
      </section>
    </div>
  );
}
