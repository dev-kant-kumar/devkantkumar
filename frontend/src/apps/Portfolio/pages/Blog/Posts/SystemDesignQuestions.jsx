import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const questions = [
  {
    question: "What is the difference between specific Horizontal and Vertical Scaling?",
    answer: "Vertical Scaling (scaling up) means adding more power (CPU, RAM) to an existing server. Horizontal Scaling (scaling out) means adding more servers to the pool. Horizontal is preferred for distributed systems as it offers better fault tolerance and potentially infinite scale."
  },
  {
    question: "Explain the CAP Theorem in simple terms.",
    answer: "The CAP Theorem states that a distributed system can only guarantee two of three properties simultaneously: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition Tolerance (system continues to operate despite network failures). In reality, Partition Tolerance is non-negotiable, so you must choose between Consistency (CP) and Availability (AP)."
  },
  {
    question: "When should I use SQL vs. NoSQL?",
    answer: "Use SQL (Relational) for structured data, complex queries (joins), and when ACID compliance (transactions) is critical (e.g., banking). Use NoSQL for unstructured data, high write throughput, massive scalability needs, and flexible schemas (e.g., social media feeds, logs)."
  },
  {
    question: "What is Load Balancing and which algorithms are common?",
    answer: "Load balancing distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed. Common algorithms include Round Robin (distributed sequentially), Least Connections (sent to server with fewest active connections), and IP Hash (client IP determines the server)."
  },
  {
    question: "What is the difference between Latency and Throughput?",
    answer: "Latency is the time it takes to process a single request (speed). Throughput is the number of requests a system can handle per second (capacity). A system can have high throughput but high latency (slow but handles many at once) or low latency but low throughput."
  },
  {
    question: "How does Sharding differ from Partitioning?",
    answer: "Sharding is a specific type of partitioning where data is distributed across multiple physical database servers (nodes) to spread load. Partitioning is a broader term that can also refer to splitting tables within a single database instance (e.g., by date)."
  },
  {
    question: "What is a CDN and why is it important?",
    answer: "A Content Delivery Network (CDN) is a geographically distributed group of servers that caches static content (images, CSS, JS, videos) closer to the user. It reduces latency, decreases server load, and improves user experience globally."
  },
  {
    question: "Explain ACID properties in databases.",
    answer: "ACID stands for Atomicity (all or nothing transactions), Consistency (database remains in a valid state), Isolation (transactions don't interfere with each other), and Durability (saved data survives power loss). Key for financial and critical systems."
  },
  {
    question: "What is Consistent Hashing?",
    answer: "Consistent Hashing is a technique used in distributed systems (like caches or load balancers) to minimize reorganization results when nodes are added or removed. Unlike simple modulo hashing, only K/n keys need to be remapped, where K is keys and n is node count."
  },
  {
    question: "REST vs. GraphQL: Which one should I choose?",
    answer: "REST is the standard for public APIs, caching, and simple resource access. GraphQL prevents over-fetching/under-fetching data, allows clients to request exactly what they need, and is great for complex front-ends with diverse data requirements."
  },
  {
    question: "What is the difference between Long Polling and WebSockets?",
    answer: "Long Polling involves the client making a request and the server holding it open until data is available, then closing it (unidirectional). WebSockets provide a full-duplex, persistent communication channel over a single TCP connection, ideal for real-time chat or gaming."
  },
  {
    question: "What are the common Caching Strategies?",
    answer: "Common strategies include: Cache-Aside (app checks cache first, then DB), Write-Through (write to cache and DB simultaneously), Write-Back (write to cache first, async to DB), and Write-Around (write directly to DB, bypass cache)."
  },
  {
    question: "What is a Reverse Proxy?",
    answer: "A Reverse Proxy sits in front of web servers and forwards client requests to them. It provides security, load balancing, SSL termination, and caching. Nginx is a popular example."
  },
  {
    question: "What is a Single Point of Failure (SPOF)?",
    answer: "A SPOF is a part of a system that, if it fails, will stop the entire system from working. System design aims to eliminate SPOFs through redundancy (e.g., failover database replicas, multiple load balancers)."
  },
  {
    question: "What is Rate Limiting and what algorithms are used?",
    answer: "Rate limiting controls the number of requests a user/client can make in a given timeframe to prevent abuse (DDoS). Algorithms include Token Bucket, Leaky Bucket, Fixed Window Counter, and Sliding Window Log."
  },
  {
    question: "Microservices vs. Monolithic Architecture?",
    answer: "Monoliths are built as a single unified unit; easier to develop/deploy initially but hard to scale. Microservices break the app into small, independent services communicating via APIs; harder to manage but easier to scale and deploy independently."
  },
  {
    question: "What is Database Replication?",
    answer: "Replication involves copying data from one database server to another. Master-Slave replication allows writes to Master and reads from Slaves (scaling reads). Master-Master allows writes to any node (higher availability but complex conflict resolution)."
  },
  {
    question: "What is the specialized use of a Bloom Filter?",
    answer: "A Bloom Filter is a probabilistic data structure used to test whether an element is a member of a set. It is memory efficient and fast. It can tell you 'definitely not in set' or 'maybe in set', but never false negatives."
  },
  {
    question: "What is Eventual Consistency?",
    answer: "A consistency model used in distributed systems where, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. It prioritizes high availability over immediate consistency (e.g., DNS, social feeds)."
  },
  {
    question: "What is an API Gateway?",
    answer: "An API Gateway is a server that acts as a single entry point for a system. It handles request routing, composition, and protocol translation. It often provides cross-cutting concerns like authentication, monitoring, and rate limiting."
  }
];

const SystemDesignQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-16 bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-8 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="text-cyan-400 w-6 h-6" />
            <h2 className="text-2xl font-bold text-white m-0">Top 20 System Design Interview Questions</h2>
        </div>
        <p className="text-slate-400">
            Highly searched questions for 2026 interviews. Master these to improve your interview performance.
        </p>
      </div>

      <div className="divide-y divide-slate-800">
        {questions.map((item, index) => (
          <div key={index} className="group">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/40 transition-colors focus:outline-none"
            >
              <h3 className={`font-medium text-lg pr-4 ${openIndex === index ? 'text-cyan-400' : 'text-slate-200 group-hover:text-cyan-300'}`}>
                {item.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0 group-hover:text-cyan-400" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-slate-400 leading-relaxed border-l-2 border-cyan-500/20 ml-6 mb-4">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemDesignQuestions;
