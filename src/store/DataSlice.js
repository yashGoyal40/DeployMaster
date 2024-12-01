import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deployments: 24,
  repositories: 7,
  environments: 32,
  errors: 2,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDeployments: (state, action) => {
      state.deployments = action.payload;
    },
    setRepositories: (state, action) => {
      state.repositories = action.payload;
    },
    setEnvironments: (state, action) => {
      state.environments = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setAll: (state, action) => {
      const { deployments, repositories, environments, errors } = action.payload;
      if (deployments !== undefined) state.deployments = deployments;
      if (repositories !== undefined) state.repositories = repositories;
      if (environments !== undefined) state.environments = environments;
      if (errors !== undefined) state.errors = errors;
    },
  },
});

export const { setDeployments, setRepositories, setEnvironments, setErrors, setAll } = dataSlice.actions;

export default dataSlice.reducer;
