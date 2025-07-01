import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminProvider } from "../contexts/AdminContext";
import { toaster } from "@/components/chakra-ui/toaster";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";
import homeLoader from "./utils/homeLoader";
import authLoader from "./utils/authLoader";
import adminLoader from "./utils/adminLoader";
import analystLoader from "./utils/analystLoader";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import DashboardCompare from "./pages/DashboardCompare";
import DashboardHome from "./pages/DashboardHome";

import useAuth from "../hooks/useAuth";
import useMicrotaskEffect from "../hooks/useMicrotaskEffect";

const App = () => {
  const { authError } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home />, loader: homeLoader },
        {
          path: "/dashboard",
          element: <DashboardLayout />,
          loader: authLoader,
          children: [
            { path: "", element: <DashboardHome /> },
            {
              path: "compare",
              element: <DashboardCompare />,
              loader: analystLoader,
            },
            {
              path: "admin",
              element: (
                <AdminProvider>
                  <Admin />
                </AdminProvider>
              ),
              loader: adminLoader,
            },
          ],
        },
      ],
    },
  ]);

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
