
// // import React, { useContext, useState } from "react";
// // import { Navigate, redirect, useNavigate } from "react-router-dom";
// // import google from "../assets/googleAuth.svg"
// // import {
// //   FaGithub, FaLinkedinIn, FaFacebookF, FaApple,
// //   FaRegEye,
// //   FaDiscord,
// // } from "react-icons/fa";
// // import Footer from "./Footer";
// // import { FaWindows, FaXTwitter } from "react-icons/fa6";
// // import { FaEyeSlash } from "react-icons/fa";
// // import { MdOutlineRemoveRedEye } from "react-icons/md";
// // import Lottie from "lottie-react";
// // import signupAnimation from "../assets/online-shopping-delivery.json";
// // import { authDataContext } from "../context/AuthContext";
// // import axios from "axios";
// // import { signInWithPopup } from "firebase/auth";
// // import { auth, provider, facebookProvider, githubProvider, mircosoftProvider } from "../../utils/Firebase";
// // import { userDataContext } from "../context/UserContext";
// // import mircosoft from '../assets/microsoft-logo.svg'
// // import { supabase } from "../../utils/supabaseClient";

// // // import { FaWindows } from '@fortawesome/free-brands-svg-icons';

// // import { toast } from "sonner"
// // const Login = () => {
// //   const navigate = useNavigate();
// //   const [show, setShow] = useState(false);
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const { serverUrl } = useContext(authDataContext);
// //   const { getCurrentUser } = useContext(userDataContext);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     let loadingToast;

// //     try {
// //       loadingToast = toast.loading("Logging in...");

// //       await axios.post(
// //         `${serverUrl}/api/auth/login`,
// //         { email, password },
// //         { withCredentials: true }
// //       );

// //       await getCurrentUser();

// //       toast.success("Login successful 🎉", {
// //         id: loadingToast,
// //         description: "Welcome back!",
// //       });

// //       navigate("/");

// //     } catch (error) {
// //       toast.dismiss(loadingToast);
// //       toast.error(error.response?.data?.message || "Invalid credentials");
// //       console.log("Invalid credential dikhata hai ")

// //     }
// //   };

// //   const googleLogin = async () => {
// //     let loadingToast;
// //     try {
// //       const response = await signInWithPopup(auth, provider);
// //       const user = response.user;
// //       loadingToast = toast.loading("Signing in...");


// //       const name = user.displayName;
// //       const email = user.email;
// //       const idToken = await user.getIdToken();

// //       await axios.post(
// //         `${serverUrl}/api/auth/googleLogin`,
// //         { name, email, idToken },
// //         { withCredentials: true }
// //       );

// //       await getCurrentUser();

// //       toast.success("Logged in with Google ", {
// //         id: loadingToast,
// //       });

// //       navigate("/");

// //     } catch (error) {
// //       toast.dismiss(loadingToast);

// //       // 🔥 USER CLOSED POPUP — NOT AN ERROR
// //       if (error.code === "auth/popup-closed-by-user") {
// //         toast("Google login cancelled", {
// //           icon: "⚠️",
// //         });
// //         return;
// //       }

// //       if (error.code === "auth/account-exists-with-different-credential") {
// //         toast.error("Account exists", {
// //           description: "You already have an account with this email using a different provider.",
// //         });
// //         return;
// //       }

// //       // 🔥 REAL ERROR
// //       toast.error("Google login failed", {
// //         description:
// //           error.response?.data?.message || error.message,
// //       });
// //     }
// //   };
// //   const facebookLogin = async () => {
// //     let loadingToast;
// //     try {
// //       const response = await signInWithPopup(auth, facebookProvider);
// //       const user = response.user;
// //       loadingToast = toast.loading("Signing in...");


// //       const name = user.displayName;
// //       const email = user.email;
// //       const idToken = await user.getIdToken();

// //       await axios.post(
// //         `${serverUrl}/api/auth/facebookLogin`,
// //         { name, email, idToken },
// //         { withCredentials: true }
// //       );

// //       await getCurrentUser();

// //       toast.success("Logged in with Facebook ", {
// //         id: loadingToast,
// //       });

// //       navigate("/");

// //     }
// //     catch (error) {
// //       toast.dismiss(loadingToast);
// //       toast.error("Facebook login failed");
// //     }
// //   };


// //   const githubLogin = async () => {
// //     let loadingToast;
// //     try {
// //       const result = await signInWithPopup(auth, githubProvider);
// //       const user = result.user;
// //       loadingToast = toast.loading("Signing in with GitHub...");

// //       // GitHub sometimes does not provide email
// //       let email = user.email;
// //       if (!email && user.providerData.length > 0) {
// //         email = user.providerData[0].email;
// //       }

// //       if (!email) {
// //         toast.dismiss(loadingToast);
// //         toast.error("GitHub did not provide an email", {
// //           description: "Enable email sharing in GitHub or use another login method.",
// //         });
// //         return;
// //       }

// //       const name = user.displayName || email.split("@")[0];

// //       // Backend login
// //       await axios.post(
// //         `${serverUrl}/api/auth/githubLogin`,
// //         { name, email },
// //         { withCredentials: true }
// //       );

// //       // Update user context
// //       await getCurrentUser();

// //       toast.success("Logged in with GitHub!", { id: loadingToast });

// //       // SPA-friendly redirect
// //       navigate("/");

// //     } catch (error) {
// //       toast.dismiss(loadingToast);
// //       toast.error("GitHub login failed");
// //     }

// //   };


// //   const handleLoginLinkedin = () => {
// //     let loadingToast;

// //     loadingToast = toast.loading("Signing in with linkedin...")
// //     const params = new URLSearchParams({

// //       response_type: 'code',
// //       client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
// //       redirect_uri: 'http://localhost:8000/api/auth/linkedin/callback',

// //       scope: 'openid profile email', // OpenID Connect scopes
// //       state: Math.random().toString(36).substring(2, 15), // CSRF protection

// //     });
// //     toast.success("Logged in with Linkedin!", { id: loadingToast });

// //     window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
// //   };
// //   // login with mircosoft


// //   const handleLoginMircosoft = async () => {
// //     try {
// //       // 1. Microsoft popup login
// //       const loginResponse = await signInWithPopup(auth, mircosoftProvider); // ✅ Fixed typo: mircosoft → microsoft
// //       const user = loginResponse.user;

// //       // 2. Prepare user data
// //       const userData = {
// //         name: user.displayName || user.email?.split('@')[0],
// //         email: user.email,
// //         phoneNumber: user.phoneNumber || user.email, // ✅ Fixed: use user.email not undefined vars
// //         avatar: user.photoURL
// //       };

// //       // 3. Send to YOUR backend (fix endpoint & data)
// //       const response = await axios.post(
// //         `${serverUrl}/api/auth/microsoftLogin`, // ✅ Changed from githubLogin
// //         userData, // ✅ Pass full userData object
// //         { withCredentials: true }
// //       );

// //       // 4. Update context (Firebase user already signed in)
// //       await getCurrentUser();

// //       toast.success("Microsoft login successful!");

// //     } catch (error) {
// //       console.error("Microsoft login failed:", error);
// //       toast.error("Login failed. Please try again.");
// //     }
// //   };


// //   const handleDiscordLogin = async () => {
// //     const loadingToast = toast.loading("Redirecting to Discord...");
// //     try {
// //       const { error } = await supabase.auth.signInWithOAuth({
// //         provider: "discord",
// //         options: {
// //           redirectTo: "http://localhost:5173/discord/success",
// //         },
// //       });

// //       if (error) {
// //         toast.dismiss(loadingToast);
// //         toast.error("Discord login failed", { description: error.message });
// //         console.error("Discord OAuth error:", error.message);
// //       }


// //       // NOTE: If no error, the browser will redirect to Discord.
// //       // Code after this point does NOT run — the page navigates away.
// //     } catch (error) {
// //       toast.dismiss(loadingToast);
// //       toast.error("Discord login failed");
// //       console.error("Discord login error:", error);
// //     }
// //   };





// //   return (
// //     <div className="w-full min-h-screen bg-gradient-to-br from-[#3C2B4B] to-[#2a1f38] text-white relative overflow-y-hidden overflow-x-hidden  ">

// //       {/* Logo */}
// //       <img
// //         src="/logo.png"
// //         alt="Logo"
// //         onClick={() => navigate("/")}
// //         className="
// //             cursor-pointer absolute
// //             top-3 left-4
// //             w-[120px]
// //             sm:w-[150px]
// //             md:w-[180px]
// //             lg:w-[200px]
// //           "
// //       />


// //       {/* Center section */}

// //       <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4">


// //         {/* LOTTIE (Above on mobile, Left on desktop) */}
// //         <div className="relative z-0 flex items-center justify-center w-full md:w-1/2 order-first md:order-none mb-8 md:mb-0 mt-20 md:mt-0">
// //           <Lottie
// //             animationData={signupAnimation}
// //             loop
// //             className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px]"
// //           />
// //         </div>



// //         <div
// //           className="
// //       w-full max-w-[500px]
// //       min-h-[520px] md:min-h-[520px]
// //       px-3 py-15
// //       bg-transparent
// //       rounded-3xl
// //       relative z-10
// //     "
// //         >
// //           <h1 className="text-3xl sm:text-4xl font-bold text-gray-200 mt-2 mb-2 px-4 sm:px-0 text-center sm:text-center">
// //             Welcome Back to Varuno!
// //           </h1>
// //           <p className="text-gray-400 mb-8 px-4 sm:px-0 text-center sm:text-center">
// //             Good to see you again
// //           </p>

// //           {/* form yahan aayega */}
// //           <form action="" onSubmit={handleLogin} className="  w-full h-[90%] flex flex-col items-center justify-start gap-[20px]">
// //             <div className=" w-[93%] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[10px] cursor-pointer mt-0 transition-all duration-200 hover:bg-[rgb(0,95,145)]" onClick={googleLogin}>

// //               <img src={google} alt="" className="w-[20px]" />Continue with Google
// //             </div>

// //             <div className="flex items-center justify-center gap-4 mt-1">
// //               {/* GitHub */}
// //               <button
// //                 className="
// //                       w-10 h-10 flex items-center justify-center
// //                       rounded-full bg-[rgb(36,41,47)]
// //                       hover:bg-[rgb(64,71,78)]
// //                       transition-all duration-200
// //                       cursor-pointer
// //                       border border-[#2a2a2a]
// //                     "
// //                 onClick={githubLogin}
// //               >
// //                 <FaGithub className="text-white text-lg" />
// //               </button>

// //               {/* LinkedIn */}
// //               <button
// //                 type="button" // <-- important

// //                 className="
// //                       w-10 h-10 flex items-center justify-center
// //                       rounded-full bg-[rgb(0,119,181)]
// //                       hover:bg-[rgb(0,95,145)]
// //                       transition-all duration-200
// //                       cursor-pointer
// //                       border border-[#2a2a2a]
// //                     "
// //                 onClick={handleLoginLinkedin}
// //               >
// //                 <FaLinkedinIn className="text-white text-lg" />
// //               </button>

// //               {/* Facebook */}
// //               <button
// //                 className="
// //                       w-10 h-10 flex items-center justify-center
// //                       rounded-full bg-[rgb(24,119,242)]
// //                       hover:bg-[rgb(20,100,200)]
// //                       transition-all duration-200 
// //                       border border-[#2a2a2a]
// //                       cursor-pointer
// //                     "
// //                 onClick={facebookLogin}
// //               >
// //                 <FaFacebookF className="text-white text-lg" />



// //               </button>
// //               {/* Apple */}


// //               <button className="
// //                 w-10 h-10 flex items-center justify-center
// //                 rounded-full
// //                 bg-[#0078D4]    /* Microsoft blue */
// //                 border border-[#2a2a2a]
// //                 hover:bg-[#005A9E]
// //                 hover:border-[#444]
// //                 transition-all duration-200
// //                 cursor-pointer" onClick={handleLoginMircosoft}>
// //                 <img src={mircosoft} alt="microsoft" className="w-7 h-7" />
// //               </button>
// //               {/* Apple */}
// //               <button
// //                 className="
// //                       w-10 h-10 flex items-center justify-center
// //                       rounded-full
// //                      border border-[#5865F2]
// //                     bg-[#5865F2]
// //                     hover:bg-[#4752C4]
// //                     text-white
// //                       transition-all duration-200
// //                       shadow-md
// //                       cursor-pointer
// //                     "
// //                 onClick={handleDiscordLogin}
// //               >
// //                 <FaDiscord className="text-white text-lg" />

// //               </button>


// //             </div>
// //             <div className="w-[93%] h-[20px] flex items-center justify-center gap-[10px] ">


// //               <div className="w-[93%] h-[1px] bg-[#96969635] "></div> Or <div className="w-[93%] h-[1px] bg-[#96969635] "></div>
// //             </div>
// //             <div className="w-[90%] h-[200px] flex flex-col items-center justify-center gap-[15px]" >

// //               <input
// //                 type="email"
// //                 placeholder="Email"
// //                 className="
// //                       w-full
// //                       px-4 py-2
// //                       rounded-lg 
// //                       bg-[#255059ae]
// //                       text-white
// //                       outline-none
// //                       placeholder:text-gray-300
// //                       shadow-lg
// //                       transition-all duration-200
// //                       hover:border-slate-400
// //                       hover:ring-2 hover:ring-slate-400
// //                       focus:ring-2 focus:ring-slate-500 required"
// //                 onChange={(e) => { setEmail(e.target.value) }} value={email}

// //               />
// //               <input
// //                 type={show ? "text" : "password"}
// //                 placeholder="Password"
// //                 className="
// //                       w-full
// //                       px-4 py-2 pr-10
// //                       rounded-lg 
// //                       bg-[#255059ae]
// //                       text-white
// //                       outline-none
// //                       placeholder:text-gray-300
// //                       shadow-lg
// //                       transition-all duration-200
// //                       focus:ring-2 focus:ring-slate-500 required"
// //                 onChange={(e) => { setPassword(e.target.value) }} value={password}

// //               />
// //               <div className="
// //       absolute right-15 bottom-53
// //       cursor-pointer text-gray-300 hover:text-gray-400
// //     " onClick={() => {
// //                   setShow(
// //                     show ? false : true

// //                   )
// //                 }}>
// //                 {show ? <FaEyeSlash /> : <MdOutlineRemoveRedEye />}
// //               </div>
// //               <div className="w-full flex justify-end px-1 -mt-1">
// //                 <span
// //                   className="text-sm text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200"
// //                   onClick={() => navigate("/forgot-password")}
// //                 >
// //                   Forgot Password?
// //                 </span>
// //               </div>
// //               <button
// //                 className="
// //                     group
// //                     flex items-center justify-center gap-2
// //                     w-full
// //                     px-4 py-2
// //                     rounded-lg
// //                     bg-slate-700
// //                     text-white
// //                     shadow-lg
// //                     transition-all duration-300
// //                     hover:bg-slate-600
// //                   "
// //               >
// //                 {/* Right Arrow */}
// //                 <span
// //                   className="
// //                       opacity-0
// //                       translate-x-[-5px]
// //                       transition-all duration-300
// //                       group-hover:opacity-100
// //                       group-hover:translate-x-0
// //                     "
// //                 >
// //                   →
// //                 </span>
// //                 <span> Login  </span>
// //               </button>

// //             </div>
// //             <p className="flex gap-[10px]  ">New user?<span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer " onClick={() => { navigate("/signup") }}> Register Now</span></p>

// //           </form>

// //         </div>

// //       </div>
// //       <Footer />
// //     </div>

// //   );
// // };
// // export default Login


// import React, { useContext, useState } from "react";
// import { Navigate, redirect, useNavigate } from "react-router-dom";
// import google from "../assets/googleAuth.svg"
// import {
//   FaGithub, FaLinkedinIn, FaFacebookF, FaApple,
//   FaRegEye,
//   FaDiscord,
// } from "react-icons/fa";
// import Footer from "./Footer";
// import { FaWindows, FaXTwitter } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import Lottie from "lottie-react";
// import signupAnimation from "../assets/online-shopping-delivery.json";
// import { authDataContext } from "../context/AuthContext";
// import axios from "axios";
// import { signInWithPopup } from "firebase/auth";
// // ✅ FIX: Use consistent spelling - mircosoftProvider (matching your Firebase.js export)
// import { auth, provider, facebookProvider, githubProvider, microsoftProvider } from "../../utils/Firebase";
// import { userDataContext } from "../context/UserContext";
// import mircosoft from '../assets/microsoft-logo.svg'

// import { toast } from "sonner"

// const Login = () => {
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { serverUrl } = useContext(authDataContext);
//   const { getCurrentUser } = useContext(userDataContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     let loadingToast;

//     try {
//       loadingToast = toast.loading("Logging in...");

//       await axios.post(
//         `${serverUrl}/api/auth/login`,
//         { email, password },
//         { withCredentials: true }
//       );

//       await getCurrentUser();

//       toast.success("Login successful 🎉", {
//         id: loadingToast,
//         description: "Welcome back!",
//       });

//       navigate("/");

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error(error.response?.data?.message || "Invalid credentials");
//     }
//   };

//   const googleLogin = async () => {
//     let loadingToast;
//     try {
//       const response = await signInWithPopup(auth, provider);
//       const user = response.user;
//       loadingToast = toast.loading("Signing in...");

//       const name = user.displayName;
//       const email = user.email;
//       const idToken = await user.getIdToken();

//       await axios.post(
//         `${serverUrl}/api/auth/googleLogin`,
//         { name, email, idToken },
//         { withCredentials: true }
//       );

//       await getCurrentUser();

//       toast.success("Logged in with Google ", { id: loadingToast });
//       navigate("/");

//     } catch (error) {
//       toast.dismiss(loadingToast);

//       if (error.code === "auth/popup-closed-by-user") {
//         toast("Google login cancelled", { icon: "⚠️" });
//         return;
//       }

//       if (error.code === "auth/account-exists-with-different-credential") {
//         toast.error("Account exists", {
//           description: "You already have an account with this email using a different provider.",
//         });
//         return;
//       }

//       toast.error("Google login failed", {
//         description: error.response?.data?.message || error.message,
//       });
//     }
//   };

//   const facebookLogin = async () => {
//     let loadingToast;
//     try {
//       const response = await signInWithPopup(auth, facebookProvider);
//       const user = response.user;
//       loadingToast = toast.loading("Signing in...");

//       const name = user.displayName;
//       const email = user.email;
//       const idToken = await user.getIdToken();

//       await axios.post(
//         `${serverUrl}/api/auth/facebookLogin`,
//         { name, email, idToken },
//         { withCredentials: true }
//       );

//       await getCurrentUser();

//       toast.success("Logged in with Facebook ", { id: loadingToast });
//       navigate("/");

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error("Facebook login failed");
//     }
//   };

//   const githubLogin = async () => {
//     let loadingToast;
//     try {
//       const result = await signInWithPopup(auth, githubProvider);
//       const user = result.user;
//       loadingToast = toast.loading("Signing in with GitHub...");

//       let email = user.email;
//       if (!email && user.providerData.length > 0) {
//         email = user.providerData[0].email;
//       }

//       if (!email) {
//         toast.dismiss(loadingToast);
//         toast.error("GitHub did not provide an email", {
//           description: "Enable email sharing in GitHub or use another login method.",
//         });
//         return;
//       }

//       const name = user.displayName || email.split("@")[0];

//       await axios.post(
//         `${serverUrl}/api/auth/githubLogin`,
//         { name, email },
//         { withCredentials: true }
//       );

//       await getCurrentUser();

//       toast.success("Logged in with GitHub!", { id: loadingToast });
//       navigate("/");

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error("GitHub login failed");
//     }
//   };

//   const handleLoginLinkedin = () => {
//     const loadingToast = toast.loading("Signing in with LinkedIn...");

//     const params = new URLSearchParams({
//       response_type: 'code',
//       client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
//       redirect_uri: 'http://localhost:8000/api/auth/linkedin/callback',
//       scope: 'openid profile email',
//       state: Math.random().toString(36).substring(2, 15),
//     });

//     toast.success("Redirecting to LinkedIn!", { id: loadingToast });
//     window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
//   };

//  const handleLoginMicrosoft = async () => {
//   const loadingToast = toast.loading("Signing in with Microsoft...");

//   try {
//     // Firebase Microsoft provider (tumhara config perfect hai)
//     const result = await signInWithPopup(auth, microsoftProvider);
//     const user = result.user;

//     // ID Token backend ko bhejo (email extract karega)
//     const idToken = await user.getIdToken();

//     const userData = {
//       name: user.displayName || user.email?.split('@')[0] || 'Microsoft User',
//       email: user.email,  // null ho sakta hai
//       phoneNumber: user.phoneNumber || null,
//       avatar: user.photoURL || null,
//       idToken  // Backend yahan se email nikal lega
//     };

//     console.log("📤 Microsoft data to backend:", userData);

//     // Backend ko bhejo (guest email logic chalega)
//     await axios.post(`${serverUrl}/api/auth/microsoftLogin`, userData, {
//       withCredentials: true
//     });

//     // User context update
//     await getCurrentUser();

//     toast.success("Microsoft login successful!", { id: loadingToast });
//     navigate("/");

//   } catch (error) {
//     console.error("Microsoft error:", error);
//     toast.dismiss(loadingToast);

//     if (error.code === 'auth/popup-closed-by-user') {
//       toast("Login cancelled", { icon: "⚠️" });
//       return;
//     }

//     toast.error("Login failed. Try again.");
//   }
// };



//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-[#3C2B4B] to-[#2a1f38] text-white relative overflow-y-hidden overflow-x-hidden">

//       {/* Logo */}
//       <img
//         src="/logo.png"
//         alt="Logo"
//         onClick={() => navigate("/")}
//         className="cursor-pointer absolute top-3 left-4 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]"
//       />

//       <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4">

//         {/* Lottie Animation */}
//         <div className="relative z-0 flex items-center justify-center w-full md:w-1/2 order-first md:order-none mb-8 md:mb-0 mt-20 md:mt-0">
//           <Lottie
//             animationData={signupAnimation}
//             loop
//             className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px]"
//           />
//         </div>

//         <div className="w-full max-w-[500px] min-h-[520px] md:min-h-[520px] px-3 py-15 bg-transparent rounded-3xl relative z-10">
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-200 mt-2 mb-2 px-4 sm:px-0 text-center">
//             Welcome Back to Varuno!
//           </h1>
//           <p className="text-gray-400 mb-8 px-4 sm:px-0 text-center">
//             Good to see you again
//           </p>

//           <form onSubmit={handleLogin} className="w-full h-[90%] flex flex-col items-center justify-start gap-[20px]">

//             {/* Google */}
//             <div
//               className="w-[93%] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[10px] cursor-pointer mt-0 transition-all duration-200 hover:bg-[rgb(0,95,145)]"
//               onClick={googleLogin}
//             >
//               <img src={google} alt="" className="w-[20px]" />Continue with Google
//             </div>

//             {/* Social Icons */}
//             <div className="flex items-center justify-center gap-4 mt-1">

//               {/* GitHub */}
//               <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(36,41,47)] hover:bg-[rgb(64,71,78)] transition-all duration-200 cursor-pointer border border-[#2a2a2a]" onClick={githubLogin}>
//                 <FaGithub className="text-white text-lg" />
//               </button>

//               {/* LinkedIn */}
//               <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(0,119,181)] hover:bg-[rgb(0,95,145)] transition-all duration-200 cursor-pointer border border-[#2a2a2a]" onClick={handleLoginLinkedin}>
//                 <FaLinkedinIn className="text-white text-lg" />
//               </button>

//               {/* Facebook */}
//               <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(24,119,242)] hover:bg-[rgb(20,100,200)] transition-all duration-200 border border-[#2a2a2a] cursor-pointer" onClick={facebookLogin}>
//                 <FaFacebookF className="text-white text-lg" />
//               </button>

//               {/* Microsoft */}
//               <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0078D4] border border-[#2a2a2a] hover:bg-[#005A9E] hover:border-[#444] transition-all duration-200 cursor-pointer" onClick={handleLoginMicrosoft}>
//                 <img src={mircosoft} alt="microsoft" className="w-7 h-7" />
//               </button>



//             </div>

//             <div className="w-[93%] h-[20px] flex items-center justify-center gap-[10px]">
//               <div className="w-[93%] h-[1px] bg-[#96969635]"></div> Or <div className="w-[93%] h-[1px] bg-[#96969635]"></div>
//             </div>

//             <div className="w-[90%] h-[200px] flex flex-col items-center justify-center gap-[15px]">

//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-2 rounded-lg bg-[#255059ae] text-white outline-none placeholder:text-gray-300 shadow-lg transition-all duration-200 hover:ring-2 hover:ring-slate-400 focus:ring-2 focus:ring-slate-500"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />

//               <input
//                 type={show ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full px-4 py-2 pr-10 rounded-lg bg-[#255059ae] text-white outline-none placeholder:text-gray-300 shadow-lg transition-all duration-200 focus:ring-2 focus:ring-slate-500"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />

//               <div className="absolute right-15 bottom-53 cursor-pointer text-gray-300 hover:text-gray-400" onClick={() => setShow(!show)}>
//                 {show ? <FaEyeSlash /> : <MdOutlineRemoveRedEye />}
//               </div>

//               <div className="w-full flex justify-end px-1 -mt-1">
//                 <span className="text-sm text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200" onClick={() => navigate("/forgot-password")}>
//                   Forgot Password?
//                 </span>
//               </div>

//               <button type="submit" className="group flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-slate-700 text-white shadow-lg transition-all duration-300 hover:bg-slate-600">
//                 <span className="opacity-0 translate-x-[-5px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
//                 <span>Login</span>
//               </button>

//             </div>

//             <p className="flex gap-[10px]">
//               New user?
//               <span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer" onClick={() => navigate("/signup")}>
//                 Register Now
//               </span>
//             </p>

//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../assets/googleAuth.svg";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaDiscord,
} from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Lottie from "lottie-react";
import signupAnimation from "../assets/online-shopping-delivery.json";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  provider,          // Google
  facebookProvider,
  githubProvider,
  microsoftProvider,     // Fixed spelling
} from "../../utils/Firebase";
import microsoftLogo from "../assets/microsoft-logo.svg"; // renamed for clarity
import { toast } from "sonner";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  // ─── Email + Password Login ───────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");

    try {
      await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Login successful 🎉", {
        id: loadingToast,
        description: "Welcome back!",
      });
      navigate("/");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  // ─── Google ────────────────────────────────────────────────────────
  const googleLogin = async () => {
    const loading = toast.loading("Signing in with Google...");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      await axios.post(
        `${serverUrl}/api/auth/googleLogin`,
        {
          name: user.displayName,
          email: user.email,
          idToken,
        },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Logged in with Google", { id: loading });
      navigate("/");
    } catch (error) {
      toast.dismiss(loading);
      if (error.code === "auth/popup-closed-by-user") {
        toast.info("Google login cancelled", { icon: "⚠️" });
        return;
      }
      toast.error("Google login failed", {
        description: error.message || "Something went wrong",
      });
    }
  };

  // ─── Facebook ──────────────────────────────────────────────────────
  const facebookLogin = async () => {
    const loading = toast.loading("Signing in with Facebook...");
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      await axios.post(
        `${serverUrl}/api/auth/facebookLogin`,
        { name: user.displayName, email: user.email, idToken },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Logged in with Facebook", { id: loading });
      navigate("/");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Facebook login failed");
    }
  };

  // ─── GitHub ────────────────────────────────────────────────────────
  const githubLogin = async () => {
    const loading = toast.loading("Signing in with GitHub...");
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      let email = user.email;
      if (!email && user.providerData?.length > 0) {
        email = user.providerData[0].email;
      }

      if (!email) {
        toast.dismiss(loading);
        toast.error("GitHub did not provide an email address");
        return;
      }

      const name = user.displayName || email.split("@")[0];

      await axios.post(
        `${serverUrl}/api/auth/githubLogin`,
        { name, email },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Logged in with GitHub!", { id: loading });
      navigate("/");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("GitHub login failed");
    }
  };

  // ─── LinkedIn (redirect-based) ─────────────────────────────────────
  const handleLoginLinkedin = () => {
    const loading = toast.loading("Redirecting to LinkedIn...");
    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      redirect_uri: "http://localhost:8000/api/auth/linkedin/callback",
      scope: "openid profile email",
      state: Math.random().toString(36).substring(2, 15),
    });

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
    // Note: success toast should be in callback handler, not here
  };

  // ─── Microsoft ─────────────────────────────────────────────────────
  const handleLoginMicrosoft = async () => {
    const loading = toast.loading("Signing in with Microsoft...");
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      const user = result.user;

      let email = user.email;
      if (!email && user.providerData?.length > 0) {
        email = user.providerData[0].email;
      }

      if (!email) {
        throw new Error("Microsoft did not provide an email address");
      }

      const idToken = await user.getIdToken();

      await axios.post(
        `${serverUrl}/api/auth/microsoftLogin`,
        {
          name: user.displayName || email.split("@")[0],
          email,
          avatar: user.photoURL || null,
          idToken,
        },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Logged in with Microsoft!", { id: loading });
      navigate("/");
    } catch (error) {
      toast.dismiss(loading);
      if (error.code === "auth/popup-closed-by-user") {
        toast.info("Login cancelled", { icon: "⚠️" });
        return;
      }
      toast.error(
        error.message.includes("email")
          ? "Microsoft account has no accessible email"
          : "Microsoft login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C2B4B] to-[#2a1f38] text-white relative overflow-hidden">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        onClick={() => navigate("/")}
        className="cursor-pointer absolute top-4 left-4 w-28 sm:w-36 md:w-44"
      />

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-10">
        {/* Lottie - kept same size */}
        <div className="flex items-center justify-center w-full md:w-1/2 mb-8 md:mb-0">
          <Lottie
            animationData={signupAnimation}
            loop
            className="w-60 sm:w-72 md:w-96 lg:w-[460px]"
          />
        </div>

        {/* Smaller Login Box */}
        <div className="w-full max-w-md bg-black/25 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-white/10 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Welcome Back to Varuno!
          </h1>
          <p className="text-gray-400 text-center mb-6 text-sm md:text-base">
            Good to see you again
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Google */}
            <div
              onClick={googleLogin}
              className="flex items-center justify-center gap-3 py-2.5 px-4 bg-white/10 rounded-xl cursor-pointer hover:bg-white/15 transition-colors text-sm md:text-base"
            >
              <img src={google} alt="Google" className="w-5" />
              Continue with Google
            </div>

            {/* Social Buttons - slightly smaller */}
            <div className="flex justify-center gap-3.5 my-2">
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 transition-colors" onClick={githubLogin}
              >
                <FaGithub className="text-lg" />
              </button>

              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] hover:bg-[#084d99] transition-colors" onClick={handleLoginLinkedin}
              >
                <FaLinkedinIn className="text-lg" />
              </button>

              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#166fe5] transition-colors" onClick={facebookLogin}
              >
                <FaFacebookF className="text-lg" />
              </button>

              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0078D4] hover:bg-[#005ba1] transition-colors"
              >
                <img src={microsoftLogo} alt="Microsoft" className="w-5 h-5" onClick={handleLoginMicrosoft} />
              </button>
            </div>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-600" />
              <span className="text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-600" />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 outline-none placeholder-gray-400 text-sm md:text-base"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 outline-none placeholder-gray-400 pr-11 text-sm md:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <MdOutlineRemoveRedEye size={18} />}
              </button>
            </div>

            <div className="text-right -mt-1">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs md:text-sm text-gray-400 hover:text-white transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-3 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition text-sm md:text-base"
            >
              Login
            </button>

            <p className="text-center mt-4 text-sm text-gray-400">
              New user?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Register Now
              </button>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
