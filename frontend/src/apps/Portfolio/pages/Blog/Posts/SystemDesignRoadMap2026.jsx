import { CheckCircle, ChevronDown, ChevronRight, Circle } from 'lucide-react';
import { useState } from 'react';

const SystemDesignRoadmap = () => {
  const [expandedPhases, setExpandedPhases] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const roadmap = [
    {
      id: 'phase1',
      phase: 'Phase 1: Foundation',
      duration: '2-3 months',
      color: 'bg-blue-900/20 border-blue-500/30',
      activeColor: 'bg-blue-500',
      topics: [
        {
          name: 'Computer Science Fundamentals',
          subtopics: [
            'Data Structures: Arrays, LinkedLists, Trees, Graphs, Hash Tables',
            'Algorithms: Sorting, Searching, Graph algorithms (BFS, DFS)',
            'Time & Space Complexity (Big O notation)',
            'Recursion and Dynamic Programming basics'
          ],
          tasks: [
            { id: 't1', task: 'Solve 50 LeetCode Easy/Medium problems', type: 'Practice' },
            { id: 't2', task: 'Implement common data structures from scratch', type: 'Build' },
            { id: 't3', task: 'Analyze complexity of existing codebases', type: 'Study' }
          ]
        },
        {
          name: 'Operating Systems Basics',
          subtopics: [
            'Processes vs Threads',
            'Memory management (Stack, Heap, Virtual Memory)',
            'CPU Scheduling',
            'File Systems'
          ],
          tasks: [
            { id: 't4', task: 'Write a multi-threaded program (Producer-Consumer)', type: 'Build' },
            { id: 't5', task: 'Read "Operating System Concepts" chapters 1-6', type: 'Study' }
          ]
        },
        {
          name: 'Networking Fundamentals',
          subtopics: [
            'OSI Model & TCP/IP',
            'HTTP/HTTPS protocols',
            'DNS, CDN basics',
            'WebSockets, REST, GraphQL',
            'Load balancing concepts'
          ],
          tasks: [
            { id: 't6', task: 'Build a simple HTTP server from scratch', type: 'Build' },
            { id: 't7', task: 'Trace network requests using Wireshark', type: 'Practice' },
            { id: 't8', task: 'Create a REST API with proper HTTP methods', type: 'Build' }
          ]
        }
      ]
    },
    {
      id: 'phase2',
      phase: 'Phase 2: Core System Design Concepts',
      duration: '3-4 months',
      color: 'bg-green-900/20 border-green-500/30',
      activeColor: 'bg-green-500',
      topics: [
        {
          name: 'Scalability Patterns',
          subtopics: [
            'Vertical vs Horizontal Scaling',
            'Load Balancing (Round Robin, Least Connections, Consistent Hashing)',
            'Caching strategies (Cache-aside, Write-through, Write-back)',
            'Database Sharding and Partitioning',
            'Replication (Master-Slave, Master-Master)'
          ],
          tasks: [
            { id: 't9', task: 'Design a caching layer using Redis', type: 'Build' },
            { id: 't10', task: 'Implement consistent hashing algorithm', type: 'Build' },
            { id: 't11', task: 'Set up database replication (PostgreSQL)', type: 'Practice' }
          ]
        },
        {
          name: 'Database Design',
          subtopics: [
            'SQL vs NoSQL (when to use what)',
            'Database normalization',
            'Indexing strategies',
            'ACID properties',
            'CAP theorem',
            'Database types: PostgreSQL, MongoDB, Cassandra, Redis'
          ],
          tasks: [
            { id: 't12', task: 'Design schema for e-commerce system', type: 'Build' },
            { id: 't13', task: 'Compare query performance with/without indexes', type: 'Practice' },
            { id: 't14', task: 'Build app using both SQL and NoSQL, compare', type: 'Build' }
          ]
        },
        {
          name: 'System Design Building Blocks',
          subtopics: [
            'API Gateway',
            'Message Queues (RabbitMQ, Kafka)',
            'Rate Limiting',
            'Circuit Breakers',
            'Service Discovery',
            'Microservices vs Monolith'
          ],
          tasks: [
            { id: 't15', task: 'Implement rate limiter using Token Bucket algorithm', type: 'Build' },
            { id: 't16', task: 'Build pub-sub system using Kafka/RabbitMQ', type: 'Build' },
            { id: 't17', task: 'Create API Gateway with routing and auth', type: 'Build' }
          ]
        }
      ]
    },
    {
      id: 'phase3',
      phase: 'Phase 3: Advanced Concepts',
      duration: '3-4 months',
      color: 'bg-purple-900/20 border-purple-500/30',
      activeColor: 'bg-purple-500',
      topics: [
        {
          name: 'Distributed Systems',
          subtopics: [
            'Consensus algorithms (Paxos, Raft)',
            'Distributed transactions (2PC, Saga pattern)',
            'Event Sourcing & CQRS',
            'Eventual consistency',
            'Vector clocks & conflict resolution'
          ],
          tasks: [
            { id: 't18', task: 'Read "Designing Data-Intensive Applications" by Martin Kleppmann', type: 'Study' },
            { id: 't19', task: 'Implement Raft consensus algorithm (simplified)', type: 'Build' },
            { id: 't20', task: 'Build event-sourced system for banking transactions', type: 'Build' }
          ]
        },
        {
          name: 'Cloud Architecture',
          subtopics: [
            'AWS/Azure/GCP services overview',
            'Serverless architecture (Lambda, Cloud Functions)',
            'Container orchestration (Kubernetes, Docker)',
            'Infrastructure as Code (Terraform, CloudFormation)',
            'Auto-scaling strategies'
          ],
          tasks: [
            { id: 't21', task: 'Deploy microservices app on Kubernetes', type: 'Build' },
            { id: 't22', task: 'Create auto-scaling web app on AWS/GCP', type: 'Build' },
            { id: 't23', task: 'Write Terraform scripts for complete infrastructure', type: 'Build' }
          ]
        },
        {
          name: 'Performance & Reliability',
          subtopics: [
            'Monitoring & Observability (Prometheus, Grafana)',
            'Logging strategies (ELK stack)',
            'Chaos Engineering',
            'SLA, SLO, SLI',
            'Disaster Recovery & Backup strategies'
          ],
          tasks: [
            { id: 't24', task: 'Set up complete monitoring for a service', type: 'Build' },
            { id: 't25', task: 'Conduct chaos engineering experiment', type: 'Practice' },
            { id: 't26', task: 'Design DR plan for critical system', type: 'Practice' }
          ]
        }
      ]
    },
    {
      id: 'phase4',
      phase: 'Phase 4: Real-World System Design',
      duration: '3-4 months',
      color: 'bg-orange-900/20 border-orange-500/30',
      activeColor: 'bg-orange-500',
      topics: [
        {
          name: 'Classic System Design Problems',
          subtopics: [
            'URL Shortener (like bit.ly)',
            'Social Media Feed (like Twitter/Instagram)',
            'Video Streaming (like YouTube)',
            'Messaging System (like WhatsApp)',
            'Ride-sharing (like Uber)',
            'Search Engine basics',
            'E-commerce platform',
            'Notification System'
          ],
          tasks: [
            { id: 't27', task: 'Design and implement URL shortener end-to-end', type: 'Build' },
            { id: 't28', task: 'Design scalable social media feed system', type: 'Practice' },
            { id: 't29', task: 'Build real-time chat application with 10K+ users', type: 'Build' },
            { id: 't30', task: 'Design video streaming platform (CDN, encoding)', type: 'Practice' }
          ]
        },
        {
          name: 'Security & Compliance',
          subtopics: [
            'Authentication & Authorization (OAuth, JWT)',
            'Encryption (at rest, in transit)',
            'DDoS protection',
            'SQL Injection, XSS prevention',
            'GDPR, HIPAA compliance basics'
          ],
          tasks: [
            { id: 't31', task: 'Implement OAuth 2.0 from scratch', type: 'Build' },
            { id: 't32', task: 'Security audit of existing system', type: 'Practice' },
            { id: 't33', task: 'Design GDPR-compliant data architecture', type: 'Practice' }
          ]
        },
        {
          name: 'Cost Optimization',
          subtopics: [
            'Cloud cost analysis',
            'Right-sizing resources',
            'Spot instances & reserved capacity',
            'Data transfer costs',
            'Storage tiering'
          ],
          tasks: [
            { id: 't34', task: 'Analyze and reduce cloud costs by 30%', type: 'Practice' },
            { id: 't35', task: 'Design cost-efficient data pipeline', type: 'Build' }
          ]
        }
      ]
    },
    {
      id: 'phase5',
      phase: 'Phase 5: Architect Mindset',
      duration: 'Ongoing',
      color: 'bg-red-900/20 border-red-500/30',
      activeColor: 'bg-red-500',
      topics: [
        {
          name: 'Communication & Documentation',
          subtopics: [
            'Architecture Decision Records (ADRs)',
            'Creating architecture diagrams (C4 model)',
            'Technical writing',
            'Stakeholder communication',
            'Trade-off analysis'
          ],
          tasks: [
            { id: 't36', task: 'Write 10 ADRs for past projects', type: 'Practice' },
            { id: 't37', task: 'Create C4 diagrams for complex system', type: 'Practice' },
            { id: 't38', task: 'Present technical design to non-technical audience', type: 'Practice' }
          ]
        },
        {
          name: 'Industry Knowledge',
          subtopics: [
            'Read architecture blogs (Netflix, Uber, Airbnb)',
            'Follow system design thought leaders',
            'Attend conferences/webinars',
            'Contribute to open source architecture'
          ],
          tasks: [
            { id: 't39', task: 'Read 20 engineering blogs from top companies', type: 'Study' },
            { id: 't40', task: 'Attend 3 architecture conferences/meetups', type: 'Practice' },
            { id: 't41', task: 'Write blog posts about your designs', type: 'Practice' }
          ]
        },
        {
          name: 'Capstone Projects',
          subtopics: [
            'Build complete production-ready system',
            'Handle 100K+ requests per second',
            'Multi-region deployment',
            'Complete CI/CD pipeline'
          ],
          tasks: [
            { id: 't42', task: 'Build and deploy Twitter clone (millions of users)', type: 'Build' },
            { id: 't43', task: 'Create distributed file storage system', type: 'Build' },
            { id: 't44', task: 'Design multi-tenant SaaS platform', type: 'Build' }
          ]
        }
      ]
    }
  ];

  const getPhaseProgress = (phase) => {
    const allTasks = phase.topics.flatMap(t => t.tasks.map(task => task.id));
    const completed = allTasks.filter(id => completedTasks[id]).length;
    return Math.round((completed / allTasks.length) * 100);
  };

  return (
    <div className="w-full bg-[#0B1120] rounded-2xl border border-slate-800 overflow-hidden my-10">
      <div className="p-8 border-b border-slate-800 bg-slate-900/50">
        <h1 className="text-3xl font-bold text-white mb-2">System Design Mastery Roadmap</h1>
        <p className="text-slate-400">Your interactive checklist to becoming a System Architect</p>
        <div className="mt-4 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
            <div className="flex justify-between items-center">
                <p className="text-sm text-cyan-200"><strong>Total Duration:</strong> 12-18 months of focused learning</p>
                <div className="text-xs text-slate-500">Click phases to expand</div>
            </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {roadmap.map((phase) => {
          const progress = getPhaseProgress(phase);
          const isExpanded = expandedPhases[phase.id];

          return (
            <div key={phase.id}>
              <div
                className={`${phase.color} border rounded-xl overflow-hidden cursor-pointer transition-all hover:bg-opacity-30`}
                onClick={() => togglePhase(phase.id)}
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-slate-950/50 ${isExpanded ? 'text-white' : 'text-slate-400'}`}>
                         {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${isExpanded ? 'text-white' : 'text-slate-200'}`}>{phase.phase}</h2>
                        <p className="text-sm text-slate-500">{phase.duration}</p>
                      </div>
                    </div>
                    <div className="text-right hidden md:block">
                      <div className="text-2xl font-bold text-white">{progress}%</div>
                      <div className="text-xs text-slate-500">Complete</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`${phase.activeColor || 'bg-blue-500'} h-full rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-slate-900/50 p-6 border-t border-slate-700/50">
                    {phase.topics.map((topic, idx) => (
                      <div key={idx} className="mb-8 last:mb-0">
                        <h3 className="text-lg font-bold text-slate-200 mb-4 pl-3 border-l-2 border-slate-700">{topic.name}</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="mb-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Concepts</h4>
                            <ul className="space-y-2">
                                {topic.subtopics.map((sub, subIdx) => (
                                <li key={subIdx} className="text-sm text-slate-400 flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 flex-shrink-0"></span>
                                    {sub}
                                </li>
                                ))}
                            </ul>
                            </div>

                            <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Action Items</h4>
                            <div className="space-y-2">
                                {topic.tasks.map((taskItem) => (
                                <div
                                    key={taskItem.id}
                                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer border ${completedTasks[taskItem.id] ? 'bg-green-900/10 border-green-500/20' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTask(taskItem.id);
                                    }}
                                >
                                    {completedTasks[taskItem.id] ? (
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    ) : (
                                    <Circle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5 group-hover:text-slate-400" />
                                    )}
                                    <div className="flex-1">
                                    <span className={`text-sm ${completedTasks[taskItem.id] ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                                        {taskItem.task}
                                    </span>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                        taskItem.type === 'Build' ? 'bg-cyan-900/20 text-cyan-400 border-cyan-500/20' :
                                        taskItem.type === 'Study' ? 'bg-purple-900/20 text-purple-400 border-purple-500/20' :
                                        'bg-blue-900/20 text-blue-400 border-blue-500/20'
                                    }`}>
                                        {taskItem.type}
                                    </span>
                                </div>
                                ))}
                            </div>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">📖 Recommended Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-cyan-400 mb-3 text-sm uppercase tracking-wider">Books</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>Designing Data-Intensive Applications</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>System Design Interview Vol 1 & 2</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>Building Microservices</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>Clean Architecture</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-3 text-sm uppercase tracking-wider">Websites & Blogs</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>ByteByteGo (Alex Xu)</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>High Scalability</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>Netflix Tech Blog</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div>System Design Primer (GitHub)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesignRoadmap;
