import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/chakra-ui/provider";
import { Toaster } from "@/components/chakra-ui/toaster";
import { AuthProvider } from "../contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
