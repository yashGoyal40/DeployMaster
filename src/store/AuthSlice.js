
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status:false,
  username:null
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers : {
    logout: (state) => {
      state.status = false;
      state.username = null
    },
    login: (state,action) =>{
      state.status =true;
      state.username = action.payload
    }
  }
})

export const {login,logout} = authSlice.actions;
export const isLoggedIn = (state) => state.authSlice.status;
export const sliceUsername = (state) => state.authSlice.username;


export default authSlice.reducer;
