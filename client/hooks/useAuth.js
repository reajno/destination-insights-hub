import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// This hook is used to provide access to the authentication context
//
// EXAMPLE USAGE:
// const { user, isLoading, error, login, signUp, logout, getAccessToken} = useAuth()
//
// User object structure:
// {
// id: "user-id",
// first_name: "John",
// last_name: "Doe",
// lga_name: "Gold Coast",
// role: "admin"
// }

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
