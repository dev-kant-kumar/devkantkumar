import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1, // 1: Information, 2: Payment, 3: Confirmation
  billingInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  paymentInfo: {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  errors: {},
  isSubmitting: false,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    updateBillingInfo: (state, action) => {
      state.billingInfo = { ...state.billingInfo, ...action.payload };
    },
    updatePaymentInfo: (state, action) => {
      state.paymentInfo = { ...state.paymentInfo, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    resetCheckout: (state) => {
      return initialState;
    }
  },
});

export const {
  setStep,
  updateBillingInfo,
  updatePaymentInfo,
  setErrors,
  clearErrors,
  setIsSubmitting,
  resetCheckout
} = checkoutSlice.actions;

export const selectCheckoutState = (state) => state.checkout;

export default checkoutSlice.reducer;
