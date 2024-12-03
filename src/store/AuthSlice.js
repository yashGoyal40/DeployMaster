import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  username: null,
  emailVerified: false,
  email: null,
  googleId: null,  
  isGoogleLogin: false, 
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = false;
      state.username = null;
      state.emailVerified = false;
      state.email = null;
      state.googleId = null;
      state.isGoogleLogin = false;
    },
    login: (state, action) => {
      state.status = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isGoogleLogin = false; 
    },
    googleLogin: (state, action) => {
      state.status = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.googleId = action.payload.googleId;
      state.isGoogleLogin = true; 
    },
    setSignupSuccess: (state, action) => {
      state.email = action.payload.email;
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = true;
      state.email = action.payload.email;
    },
  },
});

export const { login, logout, googleLogin, setSignupSuccess, setEmailVerified } = authSlice.actions;

// Selectors
export const isLoggedIn = (state) => state.authSlice.status;
export const sliceUsername = (state) => state.authSlice.username;
export const sliceEmailVerified = (state) => state.authSlice.emailVerified;
export const sliceEmail = (state) => state.authSlice.email;
export const sliceGoogleId = (state) => state.authSlice.googleId;
export const sliceIsGoogleLogin = (state) => state.authSlice.isGoogleLogin;

export default authSlice.reducer;
