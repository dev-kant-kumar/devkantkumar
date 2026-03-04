import { BookOpen, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { APICardImage, APIFeaturedImage, APIThumbnailImage } from "./APIContent/SharedComponents";

// Import Parts
import Part10_Production from "./APIContent/Part10_Production";
import Part1_Fundamentals from "./APIContent/Part1_Fundamentals";
import Part2_REST from "./APIContent/Part2_REST";
import Part3_GraphQL from "./APIContent/Part3_GraphQL";
import Part4_gRPC_SOAP from "./APIContent/Part4_gRPC_SOAP";
import Part5_RealTime from "./APIContent/Part5_RealTime";
import Part6_EventDriven from "./APIContent/Part6_EventDriven";
import Part7_Security from "./APIContent/Part7_Security";
import Part8_Architecture from "./APIContent/Part8_Architecture";
import Part9_Testing from "./APIContent/Part9_Testing";

const APIMastery2026 = () => {
  const [progress, setProgress] = useState(0);

  // Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const percentage = (scrollPosition / totalHeight) * 100;
      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-blue-500/30">

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 z-50 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 max-w-7xl">

        {/* Header */}
        <header className="mb-16 animate-fade-in">
          <div className="-mx-4 md:-mx-6 lg:-mx-8 -mt-8">
            <APIFeaturedImage className="shadow-2xl mb-12 min-h-[400px] w-full" />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                DK
              </div>
              <span className="text-slate-200">Dev Kant Kumar</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>55 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Updated March 2026</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-none space-y-20">

          <section id="fundamentals" className="scroll-mt-24">
            <Part1_Fundamentals />
          </section>

          <section id="rest" className="scroll-mt-24">
            <Part2_REST />
          </section>

          <section id="graphql" className="scroll-mt-24">
            <Part3_GraphQL />
          </section>

          <section id="grpc-soap" className="scroll-mt-24">
            <Part4_gRPC_SOAP />
          </section>

          <section id="real-time" className="scroll-mt-24">
            <Part5_RealTime />
          </section>

          <section id="event-driven" className="scroll-mt-24">
            <Part6_EventDriven />
          </section>

          <section id="security" className="scroll-mt-24">
            <Part7_Security />
          </section>

          <section id="architecture" className="scroll-mt-24">
            <Part8_Architecture />
          </section>

          <section id="testing" className="scroll-mt-24">
            <Part9_Testing />
          </section>

          <section id="production" className="scroll-mt-24">
            <Part10_Production />
          </section>

        </div>
      </div>
    </div>
  );
};

// Blog metadata for listing page (SEO-optimized)
export const info = {
  id: "nodejs-api-guide-2026",
  slug: "nodejs-api-guide-2026",
  title: "Node.js API Guide 2026: REST, GraphQL, gRPC, WebSockets & 25 Topics Mastered",
  excerpt: "The complete Node.js API reference — from HTTP to microservices. Build REST, GraphQL, gRPC, WebSocket, Webhook, SSE & tRPC APIs. Production code, security, testing, deployment. 100+ code examples.",
  keywords: "node.js api tutorial 2026, rest api node.js, graphql node.js, grpc node.js, websocket node.js, api security best practices, api design patterns, express api, fastify api, node.js backend guide, api caching redis, webhook node.js, sse server sent events, trpc tutorial, api rate limiting, jwt authentication node.js, api testing supertest, api gateway nginx, microservices node.js, api versioning, owasp api security, bullmq kafka, socket.io, api documentation openapi, docker node.js, graceful shutdown",
  category: "Tutorials",
  author: "Dev Kant Kumar",
  readTime: "55 min read",
  image: "/images/blog/api-guide.png",
  featured: true,
  publishDate: "2026-03-04",
  modifiedDate: "2026-03-04",
  tags: [
    "Node.js",
    "REST API",
    "GraphQL",
    "gRPC",
    "WebSockets",
    "Webhooks",
    "SSE",
    "tRPC",
    "API Security",
    "JWT",
    "API Design Patterns",
    "Microservices",
    "Express.js",
    "Docker",
    "API Testing",
    "OpenAPI",
  ],
  faqs: [
    {
      question: "What is the best API paradigm for Node.js in 2026?",
      answer: "It depends on your use case. REST is best for public APIs due to simplicity and caching. GraphQL excels for flexible client queries. gRPC is ideal for high-performance microservices. Most production systems use a hybrid approach."
    },
    {
      question: "REST vs GraphQL vs gRPC — which should I use?",
      answer: "Use REST for public APIs, GraphQL for BFF (Backend for Frontend) patterns with complex data needs, and gRPC for internal microservice communication. Many teams use all three strategically."
    },
    {
      question: "How do I secure a Node.js API for production?",
      answer: "Implement JWT with short-lived access tokens and refresh tokens, rate limiting with Redis, input validation, CORS, HTTPS/TLS, and follow the OWASP API Security Top 10 guidelines."
    },
    {
      question: "What is the best way to handle authentication in Node.js APIs?",
      answer: "Use JWT (JSON Web Tokens) with short-lived access tokens (15 min) and long-lived refresh tokens stored in the database. For OAuth flows, use Passport.js or implement OpenID Connect."
    },
    {
      question: "How do I implement WebSockets in Node.js?",
      answer: "Use the 'ws' library for raw WebSocket support or Socket.IO for production features like rooms, namespaces, auto-reconnection, and scaling with Redis adapter."
    },
    {
      question: "What is tRPC and when should I use it?",
      answer: "tRPC provides end-to-end type-safe APIs without code generation. Use it when you have a full-stack TypeScript monorepo. For public APIs, use REST with OpenAPI instead."
    },
    {
      question: "How do I test Node.js APIs?",
      answer: "Use Supertest for integration tests, k6 or Artillery for load testing, Pact for contract testing, and nock/msw for mocking external APIs."
    },
    {
      question: "What is an API Gateway and do I need one?",
      answer: "An API Gateway (Nginx, Kong, AWS API Gateway) handles cross-cutting concerns like rate limiting, auth, routing, and SSL. You need one for production microservices architectures."
    },
    {
      question: "How do I deploy a Node.js API to production?",
      answer: "Use Docker with multi-stage builds, implement graceful shutdown, set up health check endpoints, use environment variables for config, and deploy with CI/CD pipelines (GitHub Actions)."
    },
    {
      question: "What are the OWASP API Security Top 10?",
      answer: "The top 10 are: Broken Object Level Auth, Broken Auth, Broken Property Level Auth, Unrestricted Resource Consumption, Broken Function Level Auth, Unrestricted Business Flows, SSRF, Security Misc, Improper Inventory, Unsafe API Consumption."
    },
  ],
};

APIMastery2026.info = info;
APIMastery2026.FeaturedImage = APIFeaturedImage;
APIMastery2026.CardImage = APICardImage;
APIMastery2026.ThumbnailImage = APIThumbnailImage;
APIMastery2026.Image = APICardImage;

export default APIMastery2026;
