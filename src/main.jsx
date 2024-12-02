import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./pages/index.jsx";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import Dashboard from "./pages/dashboard";
import Repositories from "./pages/repositories";
import Logs from "./pages/logs";
import Settings from "./pages/settings";
import  DashboardLayout  from "./pages/dashboardLayout";
import { Provider } from "react-redux";
import myStore from "./store";



import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_0fL31FN0N",
  client_id: "33pjjv15jkprt09hm4u7nb7o4l",
  redirect_uri: "https://deploy-master-frontend.vercel.app/dashboard/",
  response_type: "code",
  scope: "email openid phone",
};





const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/signup", element: <SignupPage /> },
    ],
  },
  {
    path: "/dashboard", element: <DashboardLayout /> , children :[
      { path: "/dashboard/", element: <Dashboard /> },
      { path: "/dashboard/repositories", element: < Repositories/> },
      { path: "/dashboard/logs", element: <Logs /> },
      { path: "/dashboard/settings", element: <Settings /> },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
    <AuthProvider  {...cognitoAuthConfig}>
      <Provider store = {myStore}>
      <RouterProvider router={routes} />
      </Provider>
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
