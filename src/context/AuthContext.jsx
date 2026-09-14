/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState("supabase"); // 'supabase' or 'local'

  // Initialize auth state from Supabase session or persistent storage
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // 1. Check Supabase active session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          setIsAuthenticated(true);
          setUser({
            id: session.user.id,
            email: session.user.email,
            name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              "Dharmendra Ram",
            role: "Supabase Administrator",
            source: "supabase",
            lastLogin: new Date().toISOString(),
          });
          setAuthMode("supabase");
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Supabase session check error:", err);
      }

      // 2. Check local session fallback
      try {
        const storedAuth =
          localStorage.getItem("admin_session") ||
          sessionStorage.getItem("admin_session");

        if (storedAuth && mounted) {
          const parsed = JSON.parse(storedAuth);
          if (parsed?.token && parsed?.user) {
            setIsAuthenticated(true);
            setUser(parsed.user);
            setAuthMode(parsed.user?.source === "supabase" ? "supabase" : "local");
          }
        }
      } catch (e) {
        console.error("Error restoring local auth state:", e);
        localStorage.removeItem("admin_session");
        sessionStorage.removeItem("admin_session");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for Supabase auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUser({
          id: session.user.id,
          email: session.user.email,
          name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            "Dharmendra Ram",
          role: "Supabase Administrator",
          source: "supabase",
          lastLogin: new Date().toISOString(),
        });
        setAuthMode("supabase");
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("admin_session");
        sessionStorage.removeItem("admin_session");
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = async ({ identifier, password, rememberMe = true }) => {
    const cleanEmail = (identifier || "").trim().toLowerCase();

    // 1. Attempt login directly via Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (!error && data?.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name:
            data.user.user_metadata?.full_name ||
            data.user.user_metadata?.name ||
            "Dharmendra Ram",
          role: "Supabase Administrator",
          source: "supabase",
          lastLogin: new Date().toISOString(),
        };

        const sessionData = {
          token: data.session?.access_token || "supabase-token",
          user: userData,
        };

        if (rememberMe) {
          localStorage.setItem("admin_session", JSON.stringify(sessionData));
        } else {
          sessionStorage.setItem("admin_session", JSON.stringify(sessionData));
        }

        setIsAuthenticated(true);
        setUser(userData);
        setAuthMode("supabase");
        return { success: true, mode: "supabase" };
      }
    } catch (err) {
      console.warn("Supabase auth error:", err);
    }

    return {
      success: false,
      error: "Invalid email or password.",
    };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase signOut error:", err);
    }
    localStorage.removeItem("admin_session");
    sessionStorage.removeItem("admin_session");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        authMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
