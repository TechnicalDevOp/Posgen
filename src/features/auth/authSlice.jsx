import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, accountType }, { rejectWithValue }) => {
    try {
      // Replace with your real API endpoint
      const response = await axios.post('https://your-api.com/login', {
        email,
        password,
        type: accountType,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Replace with your real API endpoint
      const response = await axios.post('https://your-api.com/register', userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      // Replace this with your real API endpoint
      const response = await axios.post('https://your-api.com/auth/forgot-password', { email })
      return response.data.message || 'Reset link sent to your email'
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reset link')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://your-api.com/auth/reset-password/${token}`, { password })
      return response.data.message || 'Password reset successfully'
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password')
    }
  }
)

extraReducers: (builder) => {
  builder
    // other cases...
    .addCase(resetPassword.pending, (state) => {
      state.loading = true
      state.error = null
      state.successMessage = null
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false
      state.successMessage = action.payload
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
}


export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (otp, { rejectWithValue }) => {
    try {
      // Replace with backend API endpoint
      const response = await axios.post("http://localhost:5000/api/auth/verify-email", { otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Invalid OTP");
    }
  }
);

extraReducers: (builder) => {
  builder
    // other reducers...
    .addCase(verifyEmail.pending, (state) => {
      state.loading = true
      state.error = null
      state.successMessage = null
    })
    .addCase(verifyEmail.fulfilled, (state, action) => {
      state.loading = false
      state.successMessage = action.payload
    })
    .addCase(verifyEmail.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
}


// async action to send reset email
export const sendResetEmail = createAsyncThunk(
  "auth/sendResetEmail",
  async (email, { rejectWithValue }) => {
    try {
      // Replace with your backend endpoint
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer



