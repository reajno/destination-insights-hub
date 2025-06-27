import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { supabase } from "../supabaseClient";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState(null);
  const { user, accessToken, isAuthLoading } = useAuth();

  const throwIfNotAdmin = () => {
    if (!isAuthLoading && user.role !== "Admin") {
      throw new Error("Only admins can perform this action");
    }
  };

  const fetchUsers = async () => {
    setAdminError(null);
    setIsAdminLoading(true);
    try {
      throwIfNotAdmin();

      const { data: allUsers, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return allUsers;
    } catch (error) {
      setAdminError(error);
      return null;
    } finally {
      setIsAdminLoading(false);
    }
  };

  const signUpUser = async (formData) => {
    setAdminError(null);
    setIsAdminLoading(true);

    try {
      throwIfNotAdmin();

      const res = await fetch("http://localhost:3001/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const { data: profile, error } = await res.json();

      if (error) throw error;

      return profile;
    } catch (error) {
      setAdminError(error);
      return null;
    } finally {
      setIsAdminLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setAdminError(null);
    setIsAdminLoading(true);

    try {
      throwIfNotAdmin();

      const res = await fetch(
        `http://localhost:3001/api/admin/delete-user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { error } = await res.json();
      if (error) throw error;

      return true;
    } catch (error) {
      setAdminError(error);
      return false;
    } finally {
      setIsAdminLoading(false);
    }
  };

  const uploadToServer = async (form, dbName) => {
    setAdminError(null);
    setIsAdminLoading(true);

    try {
      throwIfNotAdmin();

      const res = await fetch(
        `http://localhost:3001/api/admin/upload/${dbName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      const { message, error } = await res.json();
      if (error) throw error;

      return message;
    } catch (error) {
      setAdminError(error);
      console.log(error);
    } finally {
      setIsAdminLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoading,
        adminError,
        fetchUsers,
        signUpUser,
        deleteUser,
        uploadToServer,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
