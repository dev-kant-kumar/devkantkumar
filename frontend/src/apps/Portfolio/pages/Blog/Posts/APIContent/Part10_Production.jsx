import { ArrowRight, Rocket, Target } from "lucide-react";
import { CodeBlock, ComparisonTable, SectionHeading } from "./SharedComponents";

export default function Part10_Production() {
  return (
    <div className="space-y-16">
      {/* Deployment */}
      <section>
        <SectionHeading id="deployment" icon={Rocket} gradient="from-sky-500 to-blue-600">
          Deployment & CI/CD for APIs
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">Production Dockerfile</h3>
          <CodeBlock language="dockerfile" code={`FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache dumb-init

# Dependencies stage
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build stage (if using TypeScript)
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV=production

# Run as non-root
USER node

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \\
  CMD wget --quiet --tries=1 http://localhost:3000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Graceful Shutdown</h3>
          <CodeBlock language="js" code={`const server = app.listen(PORT, () => {
  logger.info(\`Server listening on port \${PORT}\`);
});

// Track active connections
let connections = new Set();
server.on('connection', (conn) => {
  connections.add(conn);
  conn.on('close', () => connections.delete(conn));
});

const gracefulShutdown = async (signal) => {
  logger.info(\`Received \${signal}, shutting down gracefully\`);

  // Stop accepting new connections
  server.close(async () => {
    logger.info('HTTP server closed');

    // Cleanup resources
    await Promise.all([
      db.end(),
      redis.quit(),
      worker.close(),
    ]);

    logger.info('All connections closed, exiting');
    process.exit(0);
  });

  // Force-close lingering connections after 30s
  setTimeout(() => {
    logger.warn('Forcing close of remaining connections');
    connections.forEach((conn) => conn.destroy());
  }, 30_000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));`} />
        </div>
      </section>

      {/* Production Patterns */}
      <section>
        <SectionHeading id="production-patterns" icon={Target} gradient="from-amber-500 to-orange-600">
          Real-World Production Patterns
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <h3 className="text-2xl font-bold text-white mt-6 mb-4">File Upload with Presigned URLs (AWS S3)</h3>
          <CodeBlock language="js" code={`const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({ region: 'us-east-1' });

app.post('/uploads/presigned', authenticate, async (req, res) => {
  const { filename, contentType } = req.body;

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowed.includes(contentType)) {
    return res.status(422).json({ error: 'File type not allowed' });
  }

  const key = \`uploads/\${req.user.id}/\${uuidv4()}-\${filename}\`;

  const url = await getSignedUrl(s3, new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
    ContentLength: req.body.fileSize,
    Metadata: { userId: req.user.id },
  }), { expiresIn: 300 }); // 5 minutes

  res.json({ uploadUrl: url, key, expiresIn: 300 });
});`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Idempotency Keys</h3>
          <CodeBlock language="js" code={`const idempotency = async (req, res, next) => {
  const key = req.headers['idempotency-key'];
  if (!key) return next();

  const cacheKey = \`idempotency:\${req.user.id}:\${key}\`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    const { statusCode, body } = JSON.parse(cached);
    res.setHeader('X-Idempotent-Replayed', 'true');
    return res.status(statusCode).json(body);
  }

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    redis.setex(cacheKey, 86400, JSON.stringify({
      statusCode: res.statusCode,
      body: data,
    }));
    return originalJson(data);
  };

  next();
};

app.post('/payments', authenticate, idempotency, processPayment);`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">API Versioning & Sunset Headers</h3>
          <CodeBlock language="js" code={`// Sunset header — warn clients about deprecation
app.use('/api/v1', (req, res, next) => {
  res.setHeader('Deprecation', 'true');
  res.setHeader('Sunset', 'Sat, 31 Dec 2025 23:59:59 GMT');
  res.setHeader('Link', '</api/v2/docs>; rel="successor-version"');
  next();
}, v1Router);`} />
        </div>
      </section>

      {/* Comparison */}
      <section>
        <SectionHeading id="comparison" icon={ArrowRight} gradient="from-purple-500 to-indigo-600">
          Comparing All API Paradigms
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <ComparisonTable
            headers={["Paradigm", "Transport", "Direction", "Format", "Best Use Case", "Node.js Library"]}
            rows={[
              ["REST", "HTTP", "Request/Response", "JSON", "CRUD APIs, public APIs", "Express, Fastify"],
              ["GraphQL", "HTTP", "Request/Response", "JSON", "Flexible queries, BFF", "Apollo, Yoga"],
              ["gRPC", "HTTP/2", "All stream types", "Protobuf", "Microservices, high perf", "@grpc/grpc-js"],
              ["SOAP", "HTTP", "Request/Response", "XML", "Enterprise/legacy", "node-soap"],
              ["WebSocket", "TCP", "Bidirectional", "Any", "Real-time, chat, games", "ws, Socket.IO"],
              ["SSE", "HTTP", "Server→Client", "Text", "Live feeds, AI streaming", "Native (res.write)"],
              ["Webhook", "HTTP", "Server→Server", "JSON", "Event notifications", "Express receiver"],
              ["WebRTC", "UDP", "P2P", "Binary", "Video/audio, P2P data", "Signaling server"],
              ["tRPC", "HTTP", "Request/Response", "JSON", "Full-stack TypeScript", "@trpc/server"],
              ["Message Queue", "TCP", "Async", "Any", "Decoupled services", "BullMQ, kafkajs"],
            ]}
          />

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">Decision Guide</h3>
          <div className="space-y-4">
            {[
              { q: "Need a public API for web/mobile?", a: "Use REST" },
              { q: "Frontend needs very specific data shapes / aggregation?", a: "Use GraphQL" },
              { q: "Internal microservice-to-microservice (high throughput)?", a: "Use gRPC" },
              { q: "Need real-time bidirectional communication (chat, multiplayer)?", a: "Use WebSockets" },
              { q: "Need to push server updates to browser (notifications, AI)?", a: "Use SSE" },
              { q: "Need to notify another system when something happens?", a: "Use Webhooks" },
              { q: "Need peer-to-peer audio/video?", a: "Use WebRTC" },
              { q: "Full-stack TypeScript, need type safety?", a: "Use tRPC" },
              { q: "Need decoupled async processing across services?", a: "Use Message Queue" },
              { q: "Must integrate with bank/ERP/government legacy?", a: "Use SOAP" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                <ArrowRight size={18} className="text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-slate-300 text-sm">{item.q}</span>
                  <span className="text-purple-300 font-bold text-sm ml-2">→ {item.a}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mt-16">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">You're Now an API Master! 🚀</h2>
          <p className="text-slate-300 text-lg mb-6 max-w-3xl mx-auto">
            You've covered the full API landscape for Node.js — from HTTP fundamentals to production deployment. Work through the code examples, implement them in your projects, and architect any API system with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#what-is-api" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-colors inline-flex items-center gap-2">
              Back to Top <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
