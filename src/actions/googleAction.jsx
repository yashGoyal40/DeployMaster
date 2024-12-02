import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '@/store/AuthSlice';

export const googleLoginAction = createAsyncThunk(
  'auth/googleLogin',
  async (code, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_COGNITO_DOMAIN}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_CLIENT_ID,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          code: code,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate with Google.');
      }

      const tokens = await response.json();

      const idTokenPayload = JSON.parse(atob(tokens.id_token.split('.')[1]));

      dispatch(
        login({
          username: idTokenPayload.name || idTokenPayload.sub,
          email: idTokenPayload.email,
        })
      );

      return tokens; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
