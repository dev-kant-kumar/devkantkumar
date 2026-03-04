import { BookOpen, Check, Lightbulb } from "lucide-react";
import { CodeBlock, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part2_REST() {
  return (
    <div className="space-y-12">
      <SectionHeading id="rest-apis" icon={BookOpen} gradient="from-orange-500 to-red-600">
        REST APIs
      </SectionHeading>

      <div className="prose prose-xl prose-invert max-w-none">
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          REST (Representational State Transfer) is an architectural style, not a protocol. Defined by Roy Fielding in 2000. It remains the most widely used API paradigm for public-facing APIs.
        </p>

        {/* 6 REST Constraints */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-6">The 6 REST Constraints</h3>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          {[
            { title: "Client-Server", desc: "Separation of concerns between UI and data" },
            { title: "Stateless", desc: "Every request contains all info needed; no session on server" },
            { title: "Cacheable", desc: "Responses must define themselves as cacheable or not" },
            { title: "Uniform Interface", desc: "Consistent URLs, methods, representations" },
            { title: "Layered System", desc: "Client can't tell if connected directly or via proxy" },
            { title: "Code on Demand", desc: "Server can send executable code (optional)" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-orange-900/10 border border-orange-700/30 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}</span>
              <div>
                <span className="font-bold text-orange-300">{item.title}</span>
                <span className="text-slate-400"> — {item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* URL Conventions */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-6">Resource Design & URL Conventions</h3>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-bold text-green-400 mb-3">✅ Good URLs</h4>
            <CodeBlock language="bash" code={`GET  /users
POST /users
GET  /users/:id
PUT  /users/:id
DELETE /users/:id
GET  /users/:id/orders
GET  /users/:id/orders/:orderId
POST /users/:id/activate`} />
          </div>
          <div>
            <h4 className="font-bold text-red-400 mb-3">❌ Bad URLs</h4>
            <CodeBlock language="bash" code={`GET  /getUsers
POST /createUser
GET  /user?id=123
POST /updateUser/123
GET  /deleteUser/123
GET  /getUserOrders?userId=123
POST /user/order/get
POST /doActivateUser`} />
          </div>
        </div>

        <InfoBox type="tip" title="URL Design Rules" icon={Lightbulb}>
          <ul className="space-y-1 text-sm">
            <li>• Use <strong>nouns</strong>, not verbs in URLs</li>
            <li>• Use <strong>plural</strong> for collections</li>
            <li>• Use <strong>kebab-case</strong> for multi-word resources</li>
            <li>• <strong>Nest</strong> resources to show relationships (max 2-3 levels deep)</li>
            <li>• Path params → identify a specific resource (<code>/users/42</code>)</li>
            <li>• Query params → filter, sort, paginate (<code>/users?role=admin&sort=name</code>)</li>
          </ul>
        </InfoBox>

        {/* Versioning */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-4">Versioning Strategies</h3>
        <CodeBlock language="js" code={`// 1. URL Path (most common, most visible)
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
// GET /api/v2/users

// 2. Request Header
app.use((req, res, next) => {
  const version = req.headers['api-version'] || '1';
  req.apiVersion = version;
  next();
});

// 3. Accept Header (most RESTful)
// Accept: application/vnd.myapi.v2+json

// 4. Query Parameter (least recommended)
// GET /users?version=2`} />

        {/* Pagination */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-4">Pagination</h3>
        <CodeBlock language="js" filename="Offset-based (simple)" code={`// GET /users?page=3&limit=20
const users = await db.query(
  'SELECT * FROM users LIMIT $1 OFFSET $2',
  [limit, (page - 1) * limit]
);
res.json({
  data: users,
  pagination: {
    page: 3, limit: 20, total: 1500,
    totalPages: 75, hasNext: true, hasPrev: true,
  }
});`} />

        <CodeBlock language="js" filename="Cursor-based (production)" code={`// GET /users?cursor=eyJpZCI6MTAwfQ==&limit=20
const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString());
const users = await db.query(
  'SELECT * FROM users WHERE id > $1 ORDER BY id ASC LIMIT $2',
  [decoded.id, limit]
);
const nextCursor = users.length
  ? Buffer.from(JSON.stringify({ id: users.at(-1).id })).toString('base64')
  : null;
res.json({ data: users, nextCursor });`} />

        {/* Production REST API */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-4">Building a Production REST API</h3>
        <CodeBlock language="js" filename="src/routes/users.js" code={`const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();

// Middleware: validate & extract errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// GET /users — list with pagination & filtering
router.get('/',
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('role').optional().isIn(['admin', 'user', 'moderator']),
  validate,
  async (req, res, next) => {
    try {
      const { page = 1, limit = 20, role } = req.query;
      const users = await UserService.list({ page, limit, role });
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);

// POST /users
router.post('/',
  body('email').isEmail().normalizeEmail(),
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('password').isStrongPassword(),
  validate,
  async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      if (err.code === 'DUPLICATE_EMAIL') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      next(err);
    }
  }
);

module.exports = router;`} />

        <CodeBlock language="js" filename="src/middleware/errorHandler.js" code={`const errorHandler = (err, req, res, next) => {
  logger.error({ err, requestId: req.id, method: req.method, url: req.url });

  // Known operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: { message: err.message, code: err.code }
    });
  }

  // Unknown errors — don't leak details
  res.status(500).json({
    error: { message: 'Internal server error', code: 'INTERNAL_ERROR' }
  });
};`} />

        {/* Best Practices */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-6">REST Best Practices Checklist</h3>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <ul className="space-y-3">
            {[
              "Always return consistent JSON error shapes",
              "Use X-Request-ID header for distributed tracing",
              "Set proper Cache-Control headers on GET responses",
              "Validate all inputs before processing",
              "Avoid returning arrays as root of response (use { data: [] })",
              "Use 201 + Location header when creating resources",
              "Never expose internal IDs (use UUIDs or opaque IDs)",
              "Always support HEAD for your GET endpoints",
              "Document with OpenAPI",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <Check size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
