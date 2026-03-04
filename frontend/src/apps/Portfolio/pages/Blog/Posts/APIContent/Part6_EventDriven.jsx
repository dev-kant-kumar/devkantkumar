import { Bell, Code2, Layers, Lightbulb } from "lucide-react";
import { CodeBlock, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part6_EventDriven() {
  return (
    <div className="space-y-16">
      {/* Webhooks */}
      <section>
        <SectionHeading id="webhooks" icon={Bell} gradient="from-amber-500 to-orange-600">
          Webhooks
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Webhooks are <strong className="text-white">user-defined HTTP callbacks</strong> — your server calls someone else's server when an event occurs. The push model is far more efficient than polling.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Receiving Webhooks Securely</h3>
          <CodeBlock language="js" code={`const express = require('express');
const crypto = require('crypto');

// CRITICAL: use raw body for signature verification
app.use('/webhooks', express.raw({ type: 'application/json' }));

function verifyStripeSignature(payload, sigHeader, secret) {
  const parts = sigHeader.split(',');
  const timestamp = parts.find(p => p.startsWith('t=')).split('=')[1];
  const sig = parts.find(p => p.startsWith('v1=')).split('=')[1];

  // Protect against replay attacks
  const tolerance = 300; // 5 minutes
  if (Math.abs(Date.now() / 1000 - parseInt(timestamp)) > tolerance) {
    throw new Error('Webhook timestamp too old');
  }

  const signedPayload = \`\${timestamp}.\${payload}\`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  // Use timingSafeEqual to prevent timing attacks
  const expected = Buffer.from(expectedSig);
  const received = Buffer.from(sig);
  if (!crypto.timingSafeEqual(expected, received)) {
    throw new Error('Invalid webhook signature');
  }
}

app.post('/webhooks/stripe', async (req, res) => {
  try {
    verifyStripeSignature(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const event = JSON.parse(req.body);
  res.json({ received: true }); // Acknowledge IMMEDIATELY

  await webhookQueue.add(event.type, event); // Process async
});`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Delivering Webhooks Reliably</h3>
          <CodeBlock language="js" code={`const Queue = require('bull');
const axios = require('axios');

const webhookQueue = new Queue('webhooks', { redis: redisConfig });

webhookQueue.process(async (job) => {
  const { url, payload, secret, attempt } = job.data;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': \`sha256=\${signature}\`,
      'X-Webhook-ID': job.id,
      'X-Delivery-Attempt': attempt,
    },
    timeout: 10_000,
  });

  if (response.status >= 400) {
    throw new Error(\`Webhook delivery failed: \${response.status}\`);
  }
});

// Exponential backoff retry
webhookQueue.defaultJobOptions = {
  attempts: 5,
  backoff: { type: 'exponential', delay: 1000 }, // 1s, 2s, 4s, 8s, 16s
  removeOnComplete: 100,
  removeOnFail: 500,
};`} />
        </div>
      </section>

      {/* tRPC */}
      <section>
        <SectionHeading id="trpc" icon={Code2} gradient="from-blue-500 to-indigo-600">
          tRPC
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            tRPC provides <strong className="text-white">end-to-end type-safe APIs</strong> between Node.js backend and TypeScript frontend — no code generation, no schemas, just types that flow.
          </p>

          <CodeBlock language="ts" filename="server/router.ts" code={`import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  users: t.router({
    list: t.procedure
      .input(z.object({ page: z.number().min(1).default(1) }))
      .query(async ({ input, ctx }) => {
        return ctx.db.users.findMany({ skip: (input.page - 1) * 20 });
      }),

    create: t.procedure
      .input(z.object({ name: z.string().min(2), email: z.string().email() }))
      .mutation(async ({ input, ctx }) => {
        return ctx.db.users.create({ data: input });
      }),
  }),
});

// Client (React + TypeScript) — fully typed!
const { data } = trpc.users.list.useQuery({ page: 1 });
//       ^-- inferred: User[]`} />

          <InfoBox type="tip" title="When to Use tRPC" icon={Lightbulb}>
            <ul className="space-y-1 text-sm">
              <li>• Full-stack TypeScript monorepo? <strong>→ Use tRPC</strong></li>
              <li>• Public API consumed by third parties? <strong>→ Use REST + OpenAPI</strong></li>
              <li>• Multiple client teams/languages? <strong>→ Use GraphQL or REST</strong></li>
            </ul>
          </InfoBox>
        </div>
      </section>

      {/* Message Queues */}
      <section>
        <SectionHeading id="message-queues" icon={Layers} gradient="from-teal-500 to-cyan-600">
          Message Queue APIs & Event-Driven Architecture
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            For decoupled, resilient async communication between services. When you need to guarantee processing even if consumers are temporarily down.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">BullMQ (Redis-based Queue)</h3>
          <CodeBlock language="js" code={`const { Queue, Worker } = require('bullmq');
const connection = { host: 'localhost', port: 6379 };

// Producer
const emailQueue = new Queue('emails', { connection });

await emailQueue.add('welcome-email', {
  to: 'user@example.com',
  templateId: 'welcome',
  userId: '123',
}, {
  delay: 5000,        // send after 5 seconds
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: { age: 3600, count: 1000 },
  removeOnFail: { age: 24 * 3600 },
});

// Consumer
const worker = new Worker('emails', async (job) => {
  const { to, templateId, userId } = job.data;
  await emailService.send(to, templateId, userId);
  return { sent: true };
}, { connection, concurrency: 10 });

worker.on('completed', (job) => console.log(\`Job \${job.id} completed\`));
worker.on('failed', (job, err) => console.error(\`Job \${job.id} failed:\`, err));`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Kafka with Node.js</h3>
          <CodeBlock language="js" code={`const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['kafka:9092'] });

// Producer
const producer = kafka.producer();
await producer.connect();

await producer.send({
  topic: 'user-events',
  messages: [{
    key: userId,
    value: JSON.stringify({ type: 'USER_CREATED', userId, timestamp: Date.now() }),
    headers: { 'content-type': 'application/json' },
  }],
});

// Consumer
const consumer = kafka.consumer({ groupId: 'notification-service' });
await consumer.connect();
await consumer.subscribe({ topics: ['user-events'], fromBeginning: false });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const event = JSON.parse(message.value.toString());
    await handleEvent(event);
  },
});`} />
        </div>
      </section>
    </div>
  );
}
