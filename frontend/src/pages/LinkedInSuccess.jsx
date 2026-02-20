import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext"; // backend URL
import { userDataContext } from "../context/UserContext";

const LinkedInSuccess = () => {
  const { setUserData } = useContext(userDataContext); // assume context has setUserData
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // LinkedInSuccess.jsx
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use the standard user endpoint which is protected by isAuth
        const response = await axios.get(`${serverUrl}/api/user/getCurrentuser`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserData(response.data.user);
          console.log("LinkedIn login success, redirecting to home...");
          navigate("/");
        } else {
          console.log("LinkedIn login failed, status not 200");
          navigate("/login");
        }
      } catch (err) {
        console.error("LinkedIn user fetch error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);


  if (loading) return <div>Loading...</div>;

  return null;
};

export default LinkedInSuccess;
