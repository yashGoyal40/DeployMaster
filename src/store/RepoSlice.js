import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: [
    {
      id: 1,
      name: 'my-nextjs-app',
      description: 'A Next.js application with server-side rendering',
      status: 'deployed',
      customDomain: 'mynextjsapp.com',
      lastDeployed: '2 hours ago',
      envVars: [
        { key: 'DATABASE_URL', value: 'postgres://user:pass@host:5432/db' },
        { key: 'API_KEY', value: 'sk_test_1234567890' },
      ],
    },
    {
      id: 2,
      name: 'react-portfolio',
      description: 'Personal portfolio built with React and Tailwind CSS',
      status: 'building',
      customDomain: 'johndoe-portfolio.com',
      lastDeployed: '1 day ago',
      envVars: [
        { key: 'CONTACT_EMAIL', value: 'john@example.com' },
        { key: 'GITHUB_TOKEN', value: 'ghp_1234567890abcdef' },
      ],
    },
    {
      id: 3,
      name: 'express-api',
      description: 'RESTful API built with Express.js and MongoDB',
      status: 'error',
      customDomain: 'api.myservice.com',
      lastDeployed: '3 days ago',
      envVars: [
        { key: 'JWT_SECRET', value: 'your-secret-key' },
        { key: 'MONGODB_URI', value: 'mongodb://localhost:27017/mydb' },
      ],
    },
  ]
};

const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setRepos: (state, action) => {
      state.repos = action.payload;
    },
    addRepo: (state, action) => {
      state.repos.push(action.payload);
    },
  },
});

export const { setRepos, addRepo } = repoSlice.actions;

export default repoSlice.reducer;

