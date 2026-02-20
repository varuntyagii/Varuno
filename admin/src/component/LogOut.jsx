import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { toast } from 'sonner';
import { LogOutIcon } from 'lucide-react';
import axios from 'axios';

const LogOut = () => {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext);
    let {getAdmin} = useContext(adminDataContext);
  //Logout func
  const logOut = async()=>{
   
    try {
      const result = await axios.delete(serverUrl + '/api/auth/logOut', {withCredentials:true});
      console.log(result.data);
      navigate('/login');
      getAdmin();
      toast("Session Ended", {
  description: "You’ve been logged out securely",
  duration: 3000,
  icon: "👋",
  style: {
    background: "rgba(2, 6, 23, 0.95)",
    border: "1px solid #334155",
    color: "#e5e7eb",
  },
});

    } catch (error) {
        console.log(error)
      
    }
  }
  return (
    <div className=" text-sm sm:text-base px-2 sm:px-2 py-2 sm:py-1 rounded-2xl text-white hover:text-red-500  transition"
      onClick={logOut}  label="Settings">
          
      LogOut
    
    </div>
  )
}

export default LogOut
