import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";

const LinkedInSuccess = () => {
  const { setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Step 1: URL se token uthao
        const token = new URLSearchParams(window.location.search).get("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Step 2: Token save karo
        localStorage.setItem("token", token);

        // Step 3: User data fetch karo
        const response = await axios.get(`${serverUrl}/api/user/getCurrentuser`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        // Step 4: Data save karke home pe bhejo
        setUserData(response.data.user);
        navigate("/");

      } catch (err) {
        console.error("Error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return <div>Please wait, logging you in...</div>;
};

export default LinkedInSuccess;
