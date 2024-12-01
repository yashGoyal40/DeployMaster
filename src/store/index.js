import {configureStore} from  "@reduxjs/toolkit"
import authSlice from "./AuthSlice"
import LogsSlice from "./LogsSlice";
import RepoSlice from "./RepoSlice";
import AnalyticsSlice from "./AnalyticsSlice";
import DataSlice from "./DataSlice";

const myStore = configureStore({
  reducer:{
    authSlice:authSlice,
    logs:LogsSlice,
    repos:RepoSlice,
    charts:AnalyticsSlice,
    data:DataSlice,
  }
})

export default myStore;

