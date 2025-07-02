import { useContext } from "react";
import AdminContext from "../contexts/AdminContext";

// This hook is used to provide access to the admin context

const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export default useAdmin;
