import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk to fetch user location
export const fetchUserLocation = createAsyncThunk(
  'region/fetchUserLocation',
  async (_, { rejectWithValue }) => {
    try {
      // Using ip-api.com - free, no API key, reliable
      const response = await fetch('http://ip-api.com/json/?fields=countryCode,country,currency');
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      const data = await response.json();
      // ip-api doesn't return currency, map common countries
      const currencyMap = {
        'US': 'USD', 'GB': 'GBP', 'EU': 'EUR', 'IN': 'INR',
        'AU': 'AUD', 'CA': 'CAD', 'JP': 'JPY', 'CN': 'CNY'
      };
      return {
        countryCode: data.countryCode || 'IN',
        currency: currencyMap[data.countryCode] || 'INR',
        countryName: data.country || 'India'
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
