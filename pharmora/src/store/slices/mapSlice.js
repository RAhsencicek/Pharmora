import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pharmacies: [],
  selectedPharmacy: null,
  center: {
    lat: 41.0082, // İstanbul'un koordinatları
    lng: 28.9784,
  },
  zoom: 13,
  loading: false,
  error: null,
  filters: {
    radius: 5000, // metre cinsinden
    medicineType: '',
    availability: true,
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    fetchPharmaciesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPharmaciesSuccess: (state, action) => {
      state.pharmacies = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPharmaciesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedPharmacy: (state, action) => {
      state.selectedPharmacy = action.payload;
    },
    updateMapCenter: (state, action) => {
      state.center = action.payload;
    },
    updateMapZoom: (state, action) => {
      state.zoom = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedPharmacy: (state) => {
      state.selectedPharmacy = null;
    },
  },
});

export const {
  fetchPharmaciesStart,
  fetchPharmaciesSuccess,
  fetchPharmaciesFailure,
  setSelectedPharmacy,
  updateMapCenter,
  updateMapZoom,
  updateFilters,
  clearSelectedPharmacy,
} = mapSlice.actions;

export default mapSlice.reducer;
