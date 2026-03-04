import { Lightbulb, Radio, Video, Wifi } from "lucide-react";
import { CodeBlock, ComparisonTable, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part5_RealTime() {
  return (
    <div className="space-y-16">
      {/* WebSockets */}
      <section>
        <SectionHeading id="websockets" icon={Radio} gradient="from-violet-500 to-purple-600">
          WebSockets
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            WebSockets provide <strong className="text-white">full-duplex</strong>, persistent connections — both client and server can send messages at any time. Perfect for chat, gaming, and live collaboration.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">WebSocket Handshake</h3>
          <CodeBlock language="bash" code={`Client → Server:
  GET /ws HTTP/1.1
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

Server → Client:
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

# After handshake, HTTP is gone — raw WebSocket frames flow over TCP.`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Raw WebSocket Server with ws</h3>
          <CodeBlock language="js" code={`const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

wss.on('connection', (ws, req) => {
  const clientId = uuidv4();
  clients.set(clientId, { ws, metadata: {} });

  ws.send(JSON.stringify({ type: 'CONNECTED', clientId }));

  // Heartbeat to detect dead connections
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      handleMessage(clientId, msg);
    } catch (err) {
      ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid JSON' }));
    }
  });

  ws.on('close', (code) => {
    clients.delete(clientId);
    console.log(\`Client \${clientId} disconnected: \${code}\`);
  });
});

// Heartbeat interval
const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30_000);

function broadcast(data, excludeId = null) {
  const message = JSON.stringify(data);
  clients.forEach(({ ws }, id) => {
    if (id !== excludeId && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
}`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Socket.IO (Production Features)</h3>
          <CodeBlock language="js" code={`const { Server } = require('socket.io');
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'https://app.example.com', credentials: true },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Authentication middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    socket.user = await verifyJWT(token);
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});

io.on('connection', (socket) => {
  socket.join(\`user:\${socket.user.id}\`);

  socket.on('join:room', (roomId) => {
    socket.join(\`room:\${roomId}\`);
    socket.to(\`room:\${roomId}\`).emit('user:joined', { userId: socket.user.id });
  });

  socket.on('message', (data) => {
    socket.to(\`room:\${data.roomId}\`).emit('message', {
      ...data, userId: socket.user.id, timestamp: Date.now(),
    });
  });
});

// Send to specific user from anywhere
function notifyUser(userId, event, data) {
  io.to(\`user:\${userId}\`).emit(event, data);
}`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Scaling WebSockets with Redis Adapter</h3>
          <CodeBlock language="js" code={`const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);
io.adapter(createAdapter(pubClient, subClient));
// Now events propagate across ALL Node.js processes`} />
        </div>
      </section>

      {/* SSE */}
      <section>
        <SectionHeading id="sse" icon={Wifi} gradient="from-green-500 to-emerald-600">
          Server-Sent Events (SSE)
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            SSE provides <strong className="text-white">one-way</strong> server → client streaming over a regular HTTP connection. Great for live dashboards, notifications, and AI text streaming.
          </p>

          <ComparisonTable
            headers={["Feature", "SSE", "WebSocket", "Long Polling"]}
            rows={[
              ["Direction", "Server → Client only", "Bidirectional", "Server → Client"],
              ["Protocol", "HTTP", "WebSocket (WS)", "HTTP"],
              ["Auto-reconnect", "✅ Built-in", "❌ Manual", "❌ Manual"],
              ["Load balancer", "✅ Friendly", "⚠️ Needs config", "✅ Friendly"],
              ["Best for", "Feeds, notifications, AI", "Chat, games, collab", "Legacy fallback"],
            ]}
          />

          <CodeBlock language="js" filename="SSE Implementation" code={`app.get('/events', async (req, res) => {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Disable Nginx buffering
  res.flushHeaders();

  const sendEvent = (event, data, id) => {
    if (id) res.write(\`id: \${id}\\n\`);
    res.write(\`event: \${event}\\n\`);
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  };

  sendEvent('connected', { timestamp: Date.now() });

  const unsubscribe = eventBus.subscribe(req.user.id, (event) => {
    sendEvent(event.type, event.data, event.id);
  });

  // Keepalive every 15s (prevents proxy timeouts)
  const keepalive = setInterval(() => {
    res.write(': keepalive\\n\\n');
  }, 15_000);

  req.on('close', () => {
    clearInterval(keepalive);
    unsubscribe();
  });
});

// Client-side JavaScript
const es = new EventSource('/events');
es.addEventListener('notification', (e) => {
  const data = JSON.parse(e.data);
  showNotification(data);
});`} />
        </div>
      </section>

      {/* WebRTC */}
      <section>
        <SectionHeading id="webrtc" icon={Video} gradient="from-red-500 to-orange-600">
          WebRTC
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            WebRTC enables <strong className="text-white">peer-to-peer</strong> real-time communication (audio, video, data) directly between browsers.
          </p>

          <CodeBlock language="bash" code={`Browser A ←── Signaling Server (your Node.js) ──→ Browser B
    │                                                   │
    └──────────────── Direct P2P Connection ────────────┘
                    (after ICE negotiation)

# The signaling server only helps browsers find each other
# — actual media flows P2P.`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Node.js Signaling Server</h3>
          <CodeBlock language="js" code={`const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('join:room', (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const numClients = room ? room.size : 0;

    if (numClients >= 2) {
      socket.emit('room:full');
      return;
    }

    socket.join(roomId);
    socket.emit('room:joined', roomId);

    if (numClients === 1) {
      socket.emit('ready'); // Second peer triggers offer creation
    }
  });

  // Relay signaling messages between peers
  socket.on('offer', ({ roomId, offer }) => {
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', ({ roomId, answer }) => {
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('ice-candidate', ({ roomId, candidate }) => {
    socket.to(roomId).emit('ice-candidate', candidate);
  });
});`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Browser WebRTC Client</h3>
          <CodeBlock language="js" code={`const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'turn:your-turn-server.com', username: 'user', credential: 'pass' },
  ],
});

// Add local media tracks
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

// Handle incoming remote stream
peerConnection.ontrack = (event) => {
  remoteVideo.srcObject = event.streams[0];
};

// Send ICE candidates through signaling
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit('ice-candidate', { roomId, candidate: event.candidate });
  }
};

// Create and send offer (Peer A)
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);
socket.emit('offer', { roomId, offer });`} />

          <InfoBox type="tip" title="When to Use What" icon={Lightbulb}>
            <ul className="space-y-1 text-sm">
              <li>• <strong>WebSockets</strong> — bidirectional real-time (chat, games, live collaboration)</li>
              <li>• <strong>SSE</strong> — server push only (notifications, AI streaming, live feeds)</li>
              <li>• <strong>WebRTC</strong> — peer-to-peer (video calls, screen sharing, P2P data)</li>
            </ul>
          </InfoBox>
        </div>
      </section>
    </div>
  );
}
