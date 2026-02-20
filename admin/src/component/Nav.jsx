import React, { useContext } from 'react'
import logo from "../assets/logo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { toast } from 'sonner';
import LogOut from './LogOut';
import  SlideTabsExample  from './SlideTabsExample';

const Nav = () => {
   let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext);
    let {getAdmin} = useContext(adminDataContext);
  //Logout func
//   const logOut = async()=>{
   
//     try {
//       const result = await axios.delete(serverUrl + '/api/auth/logOut', {withCredentials:true});
//       console.log(result.data);
//       navigate('/login');
//       getAdmin();
//       toast("Session Ended", {
//   description: "You’ve been logged out securely",
//   duration: 3000,
//   icon: "👋",
//   style: {
//     background: "rgba(2, 6, 23, 0.95)",
//     border: "1px solid #334155",
//     color: "#e5e7eb",
//   },
// });

//     } catch (error) {
//         console.log(error)
      
//     }
//   }


  return (
  
<nav className="fixed top-0 left-0 right-0 h-15 bg-white z-50 shadow-md">
  <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-12 flex justify-between items-center h-full">
    
    {/* Logo */}
    <div className="flex-shrink-0">
      <img
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")}
        className="cursor-pointer h-15 sm:h-20 md:h-30 lg:h-30 w-full -ml-1"
        />
    </div>
        <SlideTabsExample/>

    {/* LogOut Button */}
    {/* <button
      className="md: hidden text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-black text-white hover:border-2 hover:border-sky-300 transition"
      onClick={logOut}
      >
      Log Out
      </button> */}
    <LogOut/>

  </div>
       {/* <Example/> */}


</nav>

  )
}

export default Nav
