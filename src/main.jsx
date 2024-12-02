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
import DashboardLayout from "./pages/dashboardLayout";
import { Provider } from "react-redux";
import myStore from "./store";
import ForgotPasswordPage from "./pages/forgotPass";
import { GoogleOAuthProvider } from "@react-oauth/google";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/signup", element: <SignupPage /> },
      { path: "/auth/passwordreset", element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard/", element: <Dashboard /> },
      { path: "/dashboard/repositories", element: <Repositories /> },
      { path: "/dashboard/logs", element: <Logs /> },
      { path: "/dashboard/settings", element: <Settings /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider>
      <Provider store={myStore}>
        <RouterProvider router={routes} />
      </Provider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
