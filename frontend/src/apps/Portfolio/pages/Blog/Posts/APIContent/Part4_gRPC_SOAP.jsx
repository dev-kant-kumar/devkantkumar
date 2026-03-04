import { Cpu, FileCode, Lightbulb } from "lucide-react";
import { CodeBlock, ComparisonTable, InfoBox, SectionHeading } from "./SharedComponents";

export default function Part4_gRPC_SOAP() {
  return (
    <div className="space-y-16">
      {/* gRPC */}
      <section>
        <SectionHeading id="grpc-apis" icon={Cpu} gradient="from-cyan-500 to-blue-600">
          gRPC APIs
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            gRPC is a high-performance RPC framework by Google using Protocol Buffers. Ideal for <strong className="text-white">microservice-to-microservice communication</strong> where low latency is critical.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Protocol Buffers (Protobuf)</h3>
          <CodeBlock language="protobuf" filename="user.proto" code={`syntax = "proto3";
package user;

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);      // server streaming
  rpc CreateUsers (stream CreateUserRequest) returns (Summary); // client streaming
  rpc Chat (stream Message) returns (stream Message);          // bidirectional
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  int64 created_at = 4;
}

message GetUserRequest {
  string id = 1;
}

message ListUsersRequest {
  int32 page = 1;
  int32 limit = 2;
}`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">gRPC Server in Node.js</h3>
          <CodeBlock language="js" code={`const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('user.proto', {
  keepCase: true, longs: String, enums: String,
  defaults: true, oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDef).user;

const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  // Unary RPC
  getUser: async (call, callback) => {
    try {
      const user = await UserService.findById(call.request.id);
      if (!user) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'User not found',
        });
      }
      callback(null, user);
    } catch (err) {
      callback({ code: grpc.status.INTERNAL, message: err.message });
    }
  },

  // Server streaming RPC
  listUsers: async (call) => {
    const users = await UserService.list(call.request);
    for (const user of users) {
      call.write(user);
    }
    call.end();
  },
});

server.bindAsync('0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    console.log(\`gRPC server running on port \${port}\`);
  }
);`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">gRPC Client in Node.js</h3>
          <CodeBlock language="js" code={`const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Unary call
client.getUser({ id: 'abc123' }, (err, user) => {
  if (err) console.error(err);
  else console.log(user);
});

// Server streaming
const stream = client.listUsers({ page: 1, limit: 100 });
stream.on('data', (user) => console.log(user));
stream.on('end', () => console.log('Stream finished'));
stream.on('error', (err) => console.error(err));`} />

          <ComparisonTable
            headers={["Feature", "REST", "GraphQL", "gRPC"]}
            rows={[
              ["Transport", "HTTP/1.1", "HTTP", "HTTP/2"],
              ["Format", "JSON", "JSON", "Protobuf (binary)"],
              ["Streaming", "Limited", "Subscriptions", "Full (4 types)"],
              ["Best For", "Public APIs", "Flexible queries", "Microservices"],
              ["Code Generation", "Optional (OpenAPI)", "Optional", "Built-in"],
              ["Browser Support", "✅ Native", "✅ Native", "⚠️ gRPC-Web"],
            ]}
          />
        </div>
      </section>

      {/* SOAP */}
      <section>
        <SectionHeading id="soap-apis" icon={FileCode} gradient="from-gray-500 to-slate-600">
          SOAP APIs
        </SectionHeading>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            SOAP (Simple Object Access Protocol) is an XML-based protocol common in enterprise/legacy systems — banking, ERP, and government.
          </p>

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">SOAP Envelope Structure</h3>
          <CodeBlock language="xml" code={`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <wsse:Security><!-- auth token --></wsse:Security>
  </soap:Header>
  <soap:Body>
    <GetUserRequest>
      <UserId>12345</UserId>
    </GetUserRequest>
  </soap:Body>
</soap:Envelope>`} />

          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Consuming SOAP in Node.js</h3>
          <CodeBlock language="js" code={`const soap = require('soap');

const WSDL_URL = 'http://www.dneonline.com/calculator.asmx?WSDL';

// Create SOAP client from WSDL
const client = await soap.createClientAsync(WSDL_URL);

// Call a SOAP method
const [result] = await client.AddAsync({ intA: 10, intB: 5 });
console.log(result.AddResult); // 15

// With authentication
client.addHttpHeader('Authorization', \`Basic \${btoa('user:pass')}\`);`} />

          <InfoBox type="info" title="SOAP vs REST — Legacy Integration" icon={Lightbulb}>
            SOAP is still heavily used in banking, healthcare, and government APIs. You'll rarely build new SOAP services, but you'll often need to <strong>consume</strong> them from Node.js backends.
          </InfoBox>
        </div>
      </section>
    </div>
  );
}
