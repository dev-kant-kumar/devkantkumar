import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../config/api';

// Async thunk to fetch user location from own backend geo endpoint.
// The backend reads the Cloudflare CF-IPCountry header (set when behind Cloudflare)
// and returns countryCode, currency, and countryName without any external HTTP calls.
export const fetchUserLocation = createAsyncThunk(
  'region/fetchUserLocation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/geo`);
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      const data = await response.json();
      return {
        countryCode: data.countryCode || 'IN',
        currency: data.currency || 'INR',
        countryName: data.countryName || 'India',
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  countryCode: 'IN', // Default to India
  currency: 'INR',
  countryName: 'India',
  isLoading: false,
  error: null,
  isInitialized: false
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.countryCode = action.payload.countryCode;
      state.currency = action.payload.currency;
      state.countryName = action.payload.countryName;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countryCode = action.payload.countryCode;
        state.currency = action.payload.currency;
        state.countryName = action.payload.countryName;
        state.isInitialized = true;
      })
      .addCase(fetchUserLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Keep defaults (IN/INR) on error
        state.isInitialized = true;
      });
  }
});

export const { setRegion, setCurrency } = regionSlice.actions;

export const selectRegion = (state) => state.region;
export const selectCurrency = (state) => state.region.currency;
export const selectCountryCode = (state) => state.region.countryCode;

export default regionSlice.reducer;
