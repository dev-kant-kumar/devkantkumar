import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return {
        items: [],
        taxRate: 0.08,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      items: [],
      taxRate: 0.08,
    };
  }
};

const initialState = loadState();

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch {
    // ignore write errors
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.type === newItem.type);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      saveState(state);
    },
    removeFromCart: (state, action) => {
      const { id, type } = action.payload;
      state.items = state.items.filter(item => !(item.id === id && item.type === type));
      saveState(state);
    },
    updateQuantity: (state, action) => {
      const { id, type, quantity } = action.payload;
      const item = state.items.find(item => item.id === id && item.type === type);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      saveState(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveState(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartTax = (state) => selectCartSubtotal(state) * state.cart.taxRate;
export const selectCartTotal = (state) => selectCartSubtotal(state) + selectCartTax(state);

export default cartSlice.reducer;
