
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
      setUserData(result.data.user);
      console.log(result.data);


    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData, setUserData, getCurrentUser, loading
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
