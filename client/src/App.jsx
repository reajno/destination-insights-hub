import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import homeLoader from "./utils/homeLoader";
import authLoader from "./utils/authLoader";
import adminLoader from "./utils/adminLoader";
import analystLoader from "./utils/analystLoader";
import loginLoader from "./utils/loginLoader";
import Admin from "./pages/Admin";
import useAuth from "../hooks/useAuth";
import useMicrotaskEffect from "../hooks/useMicrotaskEffect";
import { toaster } from "@/components/chakra-ui/toaster";
import { AdminProvider } from "../contexts/AdminContext";
import DashboardAnalyst from "./pages/DashboardAnalyst";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home />, loader: homeLoader },
      { path: "/dashboard", element: <Dashboard />, loader: authLoader },
      {
        path: "/dashboard/compare",
        element: <DashboardAnalyst />,
        loader: analystLoader,
      },
      {
        path: "/dashboard/admin",
        element: (
          <AdminProvider>
            <Admin />
          </AdminProvider>
        ),
        loader: adminLoader,
      },
    ],
  },
]);

const App = () => {
  const { authError } = useAuth();

  // Show auth related error toasts globally
  useMicrotaskEffect(() => {
    if (authError) {
      toaster.create({
        description: authError.message,
        type: "error",
      });
    }
  }, [authError]);

  return <RouterProvider router={router} />;
};

export default App;
