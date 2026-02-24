import React, { createContext, useContext, useState, useEffect } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/user/getCurrentuser",
        { withCredentials: true }
      );
      
      // ✅ FIX: Check response structure
      if (result.data.success && result.data.user) {
        setUserData(result.data.user);
        console.log("User logged in:", result.data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.log("No user logged in");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Logout function
  const logout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logOut`, {}, {
        withCredentials: true
      });
      setUserData(null);  // Immediately clear user data
      console.log("Logged out successfully");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData, 
    setUserData, 
    getCurrentUser, 
    loading,
    logout  // ✅ Export logout function
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
