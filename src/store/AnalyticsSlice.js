
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { name: "Jan", deployments: 4 },
  { name: "Feb", deployments: 3 },
  { name: "Mar", deployments: 2 },
  { name: "Apr", deployments: 6 },
  { name: "May", deployments: 8 },
  { name: "Jun", deployments: 1 },
];

const AnalitiscSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setChartsData: (state, action) => {
      state.repos = action.payload;
    },
  }
})

export const { setChartsData } = AnalitiscSlice.actions;



export default AnalitiscSlice.reducer;
