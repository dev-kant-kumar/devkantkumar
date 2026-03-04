import { Database, Lightbulb, Zap } from "lucide-react";
import { CodeBlock, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part3_GraphQL() {
  return (
    <div className="space-y-12">
      <SectionHeading id="graphql-apis" icon={Database} gradient="from-pink-500 to-purple-600">
        GraphQL APIs
      </SectionHeading>

      <div className="prose prose-xl prose-invert max-w-none">
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          GraphQL is a query language for APIs developed by Facebook (2015). Clients request <strong className="text-white">exactly the data they need</strong> — no over-fetching, no under-fetching.
        </p>

        {/* Schema */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-4">Schema Definition Language (SDL)</h3>
        <CodeBlock language="graphql" code={`type User {
  id: ID!
  name: String!
  email: String!
  orders: [Order!]!
  createdAt: DateTime!
}

type Order {
  id: ID!
  total: Float!
  status: OrderStatus!
  items: [OrderItem!]!
}

enum OrderStatus { PENDING PROCESSING SHIPPED DELIVERED CANCELLED }

type Query {
  user(id: ID!): User
  users(page: Int, limit: Int, role: String): UserConnection!
  me: User
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

type Subscription {
  orderStatusChanged(orderId: ID!): Order!
  newNotification: Notification!
}`} />

        {/* Resolvers */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-4">Resolvers in Node.js (Apollo Server)</h3>
        <CodeBlock language="js" code={`const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const resolvers = {
  Query: {
    user: async (_, { id }, context) => {
      context.auth.requireRole('user');
      return context.dataSources.userDB.findById(id);
    },
    users: async (_, args, context) => {
      return context.dataSources.userDB.list(args);
    },
    me: async (_, __, context) => {
      return context.user; // from auth middleware
    },
  },

  Mutation: {
    createUser: async (_, { input }, context) => {
      context.auth.requireRole('admin');
      return context.dataSources.userDB.create(input);
    },
  },

  // Field-level resolver — runs for every User
  User: {
    orders: async (parent, _, context) => {
      // DataLoader batches to prevent N+1 queries
      return context.loaders.ordersByUserId.load(parent.id);
    },
  },

  Subscription: {
    orderStatusChanged: {
      subscribe: (_, { orderId }, context) => {
        return context.pubSub.asyncIterator(\`ORDER_\${orderId}\`);
      },
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });`} />

        {/* N+1 Problem */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-4">The N+1 Problem & DataLoader</h3>
        <InfoBox type="warning" title="The N+1 Problem" icon={Zap}>
          When resolving a list of users with their orders, GraphQL fires 1 query for users + N queries for each user's orders. DataLoader solves this by <strong>batching</strong> all order lookups into a single query.
        </InfoBox>

        <CodeBlock language="js" code={`// ❌ N+1 PROBLEM — fires a DB query for EVERY user
const resolvers = {
  User: {
    orders: (user) => db.orders.findByUserId(user.id),
  }
};

// ✅ SOLUTION — DataLoader batches & caches
const DataLoader = require('dataloader');

// Create once per request (in context factory)
const orderLoader = new DataLoader(async (userIds) => {
  // Single query for ALL user IDs
  const orders = await db.orders.findByUserIds(userIds);
  // Must return results in same order as input keys
  return userIds.map(id => orders.filter(o => o.userId === id));
});

// In resolver:
User: {
  orders: (user, _, context) => context.loaders.orders.load(user.id),
}`} />

        {/* Security */}
        <h3 className="text-2xl font-bold text-white mt-10 mb-4">GraphQL Security</h3>
        <CodeBlock language="js" code={`const { ApolloServer } = require('@apollo/server');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(5),                          // prevent deeply nested queries
    createComplexityLimitRule(1000),        // prevent expensive queries
  ],
  // Disable introspection in production
  introspection: process.env.NODE_ENV !== 'production',
});`} />

        <InfoBox type="tip" title="REST vs GraphQL — When to Use Which" icon={Lightbulb}>
          <ul className="space-y-2 text-sm">
            <li><strong>Use REST</strong> when you have simple CRUD, public APIs, or need easy caching with HTTP semantics.</li>
            <li><strong>Use GraphQL</strong> when clients need flexible queries, you have deeply nested data, or you're building a BFF (Backend for Frontend).</li>
            <li><strong>Hybrid approach</strong> — many teams use REST for public APIs and GraphQL for internal/client-facing applications.</li>
          </ul>
        </InfoBox>
      </div>
    </div>
  );
}
