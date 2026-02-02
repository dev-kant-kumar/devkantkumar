import { Layers, Zap } from 'lucide-react';
import { CodeBlock, InfoBox } from './Shared';

const Section6 = () => {
  return (
    <section className="mb-20 scroll-mt-20">
       {/* 4.2 Zustand */}
       <div className="mb-16">
         <div className="flex items-center gap-4 mb-6">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
             <Layers size={24} className="text-white" />
           </div>
           <h3 className="text-2xl font-bold text-white m-0">4.2 Zustand</h3>
         </div>
         <p className="text-indigo-400 font-medium mb-4">The Lightweight Winner (3.2KB)</p>
         <p className="text-slate-300">
           <strong>When to use:</strong> Global CLIENT state (cart, UI) without Redux complexity.
         </p>

         <CodeBlock
           language="javascript"
           filename="store/useCartStore.js"
           code={`import { create } from 'zustand';

// 1. Create the store - ONE file, all logic
const useCartStore = create((set) => ({
  items: [],
  totalPrice: 0,

  addItem: (product) => set((state) => ({
    items: [...state.items, product],
    totalPrice: state.totalPrice + product.price
  })),

  clearCart: () => set({ items: [], totalPrice: 0 })
}));

// 2. Use anywhere - No Provider needed!
function CartButton() {
  // Select only what you need (performance!)
  const itemCount = useCartStore((state) => state.items.length);
  return <button>Cart ({itemCount})</button>;
}`}
         />

         <InfoBox type="tip" title="Performance Tip" icon={Zap}>
            Zustand allows <strong>selective subscriptions</strong>. Unlike Context, which re-renders all consumers, Zustand only re-renders the component if the specific <i>slice</i> of state you selected changes.
         </InfoBox>
       </div>
    </section>
  );
};

export default Section6;
