import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  username: null,
  emailVerified: false, 
  email: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = false;
      state.username = null;
      state.emailVerified = false;
      state.email = null;
    },
    login: (state, action) => {
      state.status = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
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

export const { login, logout, setSignupSuccess, setEmailVerified, } = authSlice.actions;
export const isLoggedIn = (state) => state.authSlice.status;
export const sliceUsername = (state) => state.authSlice.username;
export const sliceEmailVerified = (state) => state.authSlice.emailVerified;
export const sliceEmail = (state) => state.authSlice.email;

export default authSlice.reducer;
