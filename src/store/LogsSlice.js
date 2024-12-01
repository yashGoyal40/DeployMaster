import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logs: [
    {
      id: 1,
      timestamp: "2024-12-01 12:00",
      app: "App1",
      message: "Deployment successful",
      level: "info",
    },
    {
      id: 2,
      timestamp: "2024-12-01 12:05",
      app: "App2",
      message: "Error occurred in service",
      level: "error",
    },
    {
      id: 3,
      timestamp: "2024-12-01 12:10",
      app: "App1",
      message: "New deployment triggered",
      level: "info",
    },
    {
      id: 4,
      timestamp: "2024-12-01 12:15",
      app: "App3",
      message: "Service restarted",
      level: "info",
    },
  ], 
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
  },
});

export const { setLogs, addLog } = logSlice.actions;

export default logSlice.reducer;

