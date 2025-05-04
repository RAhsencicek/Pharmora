import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    sortBy: 'date',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload.products;
      state.pagination.total = action.payload.total;
      state.loading = false;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset page when filters change
    },
    updatePagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  updateFilters,
  updatePagination,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
