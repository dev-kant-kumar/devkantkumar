import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products';

const initialState = {
  items: products,
  filteredItems: products,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const { searchTerm, category, priceRange } = action.payload;

      state.filteredItems = state.items.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || product.category === category;

        let matchesPrice = true;
        if (priceRange === 'low') matchesPrice = product.price < 50;
        else if (priceRange === 'medium') matchesPrice = product.price >= 50 && product.price < 100;
        else if (priceRange === 'high') matchesPrice = product.price >= 100;

        return matchesSearch && matchesCategory && matchesPrice;
      });
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.filteredItems = state.items; // Re-apply filters ideally, but simple push for now
    },
  },
});

export const { filterProducts, addProduct } = productsSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => state.products.filteredItems;
export const selectProductById = (state, productId) =>
  state.products.items.find(product => product.id === productId);

export default productsSlice.reducer;
