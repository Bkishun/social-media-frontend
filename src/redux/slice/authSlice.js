import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch the current user
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/users/current-user', {
        withCredentials: true,
      });

      if (response.status === 200) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || 'No session found or something went wrong on the server side');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to log in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || 'Failed to login user');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to log out a user
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/users/logout', {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Failed to logout');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginStatus: false,
    userData: null,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginStatus = true;
        state.userData = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginStatus = false;
        state.userData = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginStatus = true;
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginStatus = false;
        state.userData = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.loginStatus = false;
        state.userData = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
