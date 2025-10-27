import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Create Auth Context
const AuthContext = createContext();

// ✅ Custom Hook for easy use
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 🔹 Function to verify token using API
  const verifyUser = async () => {
    console.clear();
    console.log("🟦 [AUTH VERIFY] Checking user authorization...");

    const token = localStorage.getItem("userToken");
    if (!token) {
      console.warn("⚠️ No token found in localStorage");
      setUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      const config = {
        method: "get",
        url: "https://backend-tasks-xagf.onrender.com/users/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
      console.log("🟩 [AUTH SUCCESS]", response.data);

      if (response.data?.message === "User is Authorised") {
        const userInfo = {
          name: response.data.name,
          email: response.data.email,
          userid: response.data.userid,
        };

        setUser(userInfo);
        localStorage.setItem("userName", userInfo.name);
        console.log("💾 [LOCAL STORAGE UPDATED]", userInfo);
      } else {
        console.warn("⚠️ User unauthorized or invalid response");
        setUser(null);
      }
    } catch (error) {
      console.error("🟥 [AUTH ERROR]", error.response?.data || error.message);
      setUser(null);
    } finally {
      setAuthLoading(false);
      console.log("🟨 [AUTH VERIFY END]");
    }
  };

  // Run verification once when app loads
  useEffect(() => {
    verifyUser();
  }, []);

  // 🔹 Logout Function
  const logout = () => {
    console.log("🚪 [LOGOUT] Clearing session...");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        verifyUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
