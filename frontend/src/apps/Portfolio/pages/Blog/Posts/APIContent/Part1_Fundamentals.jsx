import { ArrowRight, Globe, Layers, Zap } from "lucide-react";
import { CodeBlock, ComparisonTable, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part1_Fundamentals() {
  return (
    <div className="space-y-16">
      {/* Section 1: What is an API? */}
      <section>
        <SectionHeading id="what-is-api" icon={Globe} gradient="from-emerald-500 to-teal-600">
          What is an API?
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            An <strong className="text-white">API (Application Programming Interface)</strong> is a contract between two software systems that defines how they communicate — what requests can be made, what data to send, and what responses to expect.
          </p>

          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            Think of it as a <strong className="text-white">waiter in a restaurant</strong>: you (the client) don't go into the kitchen (the server) directly. You tell the waiter (the API) what you want, and the waiter brings back the result.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">Key Terms</h3>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              { term: "Client", desc: "The consumer making requests (browser, mobile app, another server)" },
              { term: "Server", desc: "The system exposing functionality through the API" },
              { term: "Endpoint", desc: "A specific URL/address that handles a type of request" },
              { term: "Request", desc: "Data sent from client to server (method, headers, body, params)" },
              { term: "Response", desc: "Data returned from server to client (status code, headers, body)" },
              { term: "Protocol", desc: "The rules governing communication (HTTP, TCP, WebSocket)" },
              { term: "Payload", desc: "The actual data inside a request or response body" },
              { term: "Serialization", desc: "Converting data to a transferable format (JSON, XML, Protobuf)" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="font-bold text-emerald-400">{item.term}</span>
                <span className="text-slate-400"> — {item.desc}</span>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">Why APIs Matter in Production</h3>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            {[
              { title: "Decoupling", desc: "Frontend and backend evolve independently" },
              { title: "Reusability", desc: "One API serves web, mobile, and third-party integrations" },
              { title: "Scalability", desc: "Each API service scales independently" },
              { title: "Security", desc: "Controlled access to internal business logic" },
              { title: "Interoperability", desc: "Systems in different languages can communicate" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-emerald-900/20 to-teal-900/10 border border-emerald-700/30">
                <h4 className="font-bold text-emerald-300 mb-1">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: How the Web Works */}
      <section>
        <SectionHeading id="how-web-works" icon={Layers} gradient="from-purple-500 to-pink-600">
          How the Web Works Under the Hood
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Before writing a single line of API code, you must understand what happens when a request travels across the internet.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">The Journey of an API Request</h3>
          <CodeBlock language="bash" code={`Client (Node.js / Browser)
    │
    ▼
DNS Resolution  →  IP Address lookup for domain
    │
    ▼
TCP Handshake   →  SYN → SYN-ACK → ACK (3-way)
    │
    ▼
TLS Handshake   →  Certificate exchange, session keys (HTTPS)
    │
    ▼
HTTP Request    →  Sent over the encrypted TCP connection
    │
    ▼
Server receives →  Load Balancer → App Server → Handler
    │
    ▼
HTTP Response   →  Travels back through same connection
    │
    ▼
Client receives →  Parses JSON / handles data`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">OSI Model — Relevant Layers</h3>
          <ComparisonTable
            headers={["Layer", "Name", "What You Interact With"]}
            rows={[
              ["7", "Application", "HTTP, WebSocket, gRPC, DNS"],
              ["6", "Presentation", "TLS/SSL, JSON/XML encoding"],
              ["4", "Transport", "TCP, UDP (ports, reliability)"],
              ["3", "Network", "IP addresses, routing"],
              ["1-2", "Physical/Data Link", "Hardware (not your concern)"],
            ]}
          />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">DNS in Practice (Node.js)</h3>
          <CodeBlock language="js" code={`const dns = require('dns').promises;

// Lookup IP for a hostname
const result = await dns.lookup('api.example.com');
console.log(result); // { address: '93.184.216.34', family: 4 }`} />
        </div>
      </section>

      {/* Section 3: HTTP Deep Dive */}
      <section>
        <SectionHeading id="http-deep-dive" icon={Zap} gradient="from-blue-500 to-indigo-600">
          HTTP Deep Dive
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            HTTP is the backbone of virtually every API. Mastering it is non-negotiable.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">HTTP/1.1 vs HTTP/2 vs HTTP/3</h3>
          <ComparisonTable
            headers={["Feature", "HTTP/1.1", "HTTP/2", "HTTP/3"]}
            rows={[
              ["Transport", "TCP", "TCP", "QUIC (UDP-based)"],
              ["Multiplexing", "❌ (one req/connection)", "✅ (multiple streams)", "✅"],
              ["Header Compression", "❌", "✅ HPACK", "✅ QPACK"],
              ["Server Push", "❌", "✅", "✅"],
              ["Head-of-line blocking", "Yes", "Solved at HTTP layer", "Fully solved"],
              ["TLS Required", "Optional", "Practically required", "Built-in"],
            ]}
          />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Node.js HTTP/2 Example</h3>
          <CodeBlock language="js" code={`const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
});

server.on('stream', (stream, headers) => {
  stream.respond({ ':status': 200, 'content-type': 'application/json' });
  stream.end(JSON.stringify({ message: 'HTTP/2 response' }));
});

server.listen(8443);`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">HTTP Methods</h3>
          <ComparisonTable
            headers={["Method", "Purpose", "Idempotent", "Safe", "Has Body"]}
            rows={[
              ["GET", "Retrieve resource", "✅", "✅", "❌"],
              ["POST", "Create resource", "❌", "❌", "✅"],
              ["PUT", "Replace entire resource", "✅", "❌", "✅"],
              ["PATCH", "Partial update", "❌", "❌", "✅"],
              ["DELETE", "Remove resource", "✅", "❌", "Optional"],
              ["HEAD", "GET without body", "✅", "✅", "❌"],
              ["OPTIONS", "Describe capabilities", "✅", "✅", "❌"],
            ]}
          />

          <InfoBox type="info" title="Idempotent vs Safe" icon={Zap}>
            <p><strong>Idempotent</strong> = calling it N times has the same effect as calling it once.</p>
            <p><strong>Safe</strong> = does not modify server state.</p>
          </InfoBox>

          <h3 className="text-2xl font-bold text-white mt-10 mb-6">HTTP Status Codes — Complete Reference</h3>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              { cat: "2xx — Success", color: "green", codes: [
                "200 OK", "201 Created (POST success)", "202 Accepted (async job)", "204 No Content (DELETE)", "206 Partial Content (streaming)"
              ]},
              { cat: "3xx — Redirection", color: "blue", codes: [
                "301 Moved Permanently", "302 Found (temporary)", "304 Not Modified (cache hit)", "307 Temporary Redirect", "308 Permanent Redirect"
              ]},
              { cat: "4xx — Client Errors", color: "yellow", codes: [
                "400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found", "409 Conflict", "422 Unprocessable Entity", "429 Too Many Requests"
              ]},
              { cat: "5xx — Server Errors", color: "red", codes: [
                "500 Internal Server Error", "502 Bad Gateway", "503 Service Unavailable", "504 Gateway Timeout"
              ]},
            ].map((group, i) => (
              <div key={i} className={`p-4 rounded-lg bg-${group.color}-900/10 border border-${group.color}-700/30`}>
                <h4 className={`font-bold text-${group.color}-300 mb-3`}>{group.cat}</h4>
                <ul className="space-y-1">
                  {group.codes.map((c, j) => (
                    <li key={j} className="text-slate-300 text-sm flex items-start gap-2">
                      <ArrowRight size={14} className={`text-${group.color}-400 mt-1 flex-shrink-0`} />
                      <code className="font-mono">{c}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Essential HTTP Headers</h3>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div>
              <h4 className="font-bold text-blue-300 mb-3">Request Headers</h4>
              <CodeBlock language="bash" code={`Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json
Accept-Encoding: gzip, deflate, br
If-None-Match: "abc123"          (conditional GET)
Idempotency-Key: <uuid>          (safe retries)
X-Request-ID: <uuid>             (tracing)`} />
            </div>
            <div>
              <h4 className="font-bold text-blue-300 mb-3">Response Headers</h4>
              <CodeBlock language="bash" code={`Content-Type: application/json; charset=utf-8
Cache-Control: max-age=3600, public
ETag: "abc123"
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1693000000
Retry-After: 60`} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">CORS — Complete Explanation</h3>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            CORS (Cross-Origin Resource Sharing) is enforced by <strong className="text-white">browsers</strong> to prevent malicious sites from reading your API responses.
          </p>
          <CodeBlock language="js" code={`const cors = require('cors');

// Permissive (dev only — never in production)
app.use(cors());

// Production CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['https://app.example.com', 'https://admin.example.com'];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,       // allows cookies/auth headers cross-origin
  maxAge: 86400,
}));`} />
        </div>
      </section>
    </div>
  );
}
