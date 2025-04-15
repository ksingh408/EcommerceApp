
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

// Thunks for async API calls
export const registerUser = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/register`, formData, { withCredentials: true });
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

export const loginUser = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/login`, formData, { withCredentials: true });
    // ✅ Save user to localStorage on login
localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data.user;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    // ✅ Clear user from localStorage on logout
localStorage.removeItem("user");

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue("Not logged in");
  }
});


// Initial state
const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.currentUser = null;
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;

// import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
// import userData from "../../JsonData/Users.json";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/";

// const initialState = {
//   users: userData.users ||[],
//   currentUser: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//     logoutUser: (state) => {
//       state.currentUser = null; 
//     },
//   },
// });

// export const { loginUser, logoutUser } = authSlice.actions;

// export default authSlice.reducer;

