import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// This hook is used to provide access to the authentication context

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
