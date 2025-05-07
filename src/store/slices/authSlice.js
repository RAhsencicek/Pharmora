import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Giriş başarısız');
      }
      return rejectWithValue('Sunucu bağlantı hatası');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          // Return validation errors
          return rejectWithValue(error.response.data.errors.map(err => err.msg).join(', '));
        }
        return rejectWithValue(error.response.data.message || 'Kayıt başarısız');
      }
      return rejectWithValue('Sunucu bağlantı hatası');
    }
  }
);

// Check for saved token on app load
const loadSavedAuthState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    return {
      isAuthenticated: true,
      token,
      user: JSON.parse(user),
      loading: false,
      error: null,
    };
  }

  return {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};
};

const initialState = loadSavedAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      // Clean up localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    }
    },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
