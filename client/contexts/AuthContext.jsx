import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Function to load user profile from database
  const loadUserProfile = async (sessionUser) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sessionUser.id)
        .single();
      if (error) throw error;
      setUser(profile);
    } catch (error) {
      setAuthError(error);
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Load user profile and token on mount + subscribe to auth state changes
  useEffect(() => {
    const fetchUserAndToken = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setAccessToken(session.access_token);
        await loadUserProfile(session.user);
      }
    };

    fetchUserAndToken();

    // Sync auth state changes with user profile and token
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setAccessToken(session.access_token);
          await loadUserProfile(session.user);
        } else {
          setUser(null);
          setAccessToken(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setUser(null);
    setAuthError(null);
    setIsAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      await loadUserProfile(data.user);

      return true;
    } catch (error) {
      setAuthError(error);
      return false;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthLoading,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
