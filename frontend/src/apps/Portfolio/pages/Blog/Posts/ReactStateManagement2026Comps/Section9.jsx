import { CodeBlock } from './Shared';

const Section9 = () => {
  return (
    <section id="common-patterns" className="mb-20 scroll-mt-20">
         <h2 className="text-3xl font-bold text-white mb-8">Common Patterns & Anti-Patterns</h2>

         <div className="prose prose-xl prose-invert max-w-none">

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Pattern 1: The Hybrid Stack</h3>
            <p className="text-slate-300">
              You DON'T pick one tool. You use the right tool for each job.
            </p>

            <CodeBlock
              language="javascript"
              filename="App.jsx"
              code={`// Typical Modern React App Stack

// 1. Server data → React Query
const { data: products } = useQuery(['products'], fetchProducts);

// 2. Shared client state → Zustand
const addToCart = useCartStore(state => state.addItem);

// 3. Theme → Context
const theme = useContext(ThemeContext);

// 4. Local UI → useState
const [isOpen, setIsOpen] = useState(false);`}
            />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Pattern 2: Derived State</h3>
            <p className="text-slate-300 mb-4">
              <strong>Problem:</strong> Calculating values from state and storing them creates synchronization bugs.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 font-bold mb-2">❌ Anti-Pattern</p>
                <CodeBlock
                  language="javascript"
                  code={`const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);

// Now you must keep them in sync
// Bug prone!`}
                />
              </div>
              <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
                <p className="text-emerald-400 font-bold mb-2">✅ Good Pattern</p>
                <CodeBlock
                  language="javascript"
                  code={`const [items, setItems] = useState([]);

// Calculate on render
const total = items.reduce((a, b) => a + b.price, 0);

// Or useMemo if expensive`}
                />
              </div>
            </div>

            <div className="my-12 p-8 rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-2 border-indigo-500/50">
              <h3 className="text-2xl font-bold text-white mb-4">Final Thoughts</h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                In 2026, state management is no longer about finding "The One Library to Rule Them All." It's about data categorization.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Treat server data as a cache (React Query). Treat local UI as ephemeral (useState). Treat shared app state as a store (Zustand). Do this, and your app will be faster, cleaner, and easier to maintain.
              </p>
            </div>

         </div>
    </section>
  );
};

export default Section9;
