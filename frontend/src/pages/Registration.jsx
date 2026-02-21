

// import React, { useContext, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import google from "../assets/googleAuth.svg"
// import {
//   FaGithub, FaLinkedinIn, FaFacebookF, FaApple,
//   FaRegEye,
// } from "react-icons/fa";
// import Footer from "./Footer";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import Lottie from "lottie-react";
// import signupAnimation from "../assets/online-shopping-delivery.json";
// import { authDataContext } from "../context/AuthContext";
// import axios from "axios";
// import { signInWithPopup } from "firebase/auth";
// import { auth, facebookProvider, githubProvider, mircosoftProvider, provider } from "../../utils/Firebase";
// import { userDataContext } from "../context/UserContext";
// import microsoft from '../assets/microsoft-logo.svg'
// import { toast } from "sonner";

// const Registration = () => {
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const { serverUrl } = useContext(authDataContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { getCurrentUser } = useContext(userDataContext);

//   const [loading, setLoading] = useState(false);

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/; // simple regex for email format
//     return re.test(email);
//   }

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true); // start loader

//     if (!validateEmail(email)) {
//       toast.error("Invalid email format ❌");
//       setLoading(false); // email invalid pe bhi stop loader
//       return;
//     }

//     try {
//       await axios.post(
//         `${serverUrl}/api/auth/registration`,
//         { name, email, password },
//         { withCredentials: true }
//       );

//       await getCurrentUser();

//       toast.success("Account created successfully 🎉");

//       navigate("/verifemail");

//     } catch (error) {
//       if (error.response?.status === 409) {
//         toast.error("User already exists ❌");
//       } else {
//         toast.error("Signup failed ❌");
//       }
//     } finally {
//       setLoading(false); // loader hamesha stop ho jayega
//     }
//   };


//   // const googleSignup = async()=>{
//   //   try {
//   //     const response = await signInWithPopup(auth, provider);
//   //     let user = response.user 
//   //     let name = user.displayName;
//   //     let email= user.email
//   //     const idToken = await user.getIdToken(); // IMPORTANT

//   //     const result = await axios.post(serverUrl + "/api/auth/googleLogin", {name, email , idToken},  {withCredentials: true})

//   //     console.log(result.data);
//   //      await getCurrentUser();
//   //     navigate("/");


//   //   } catch (error) {
//   //    console.error(
//   //       error.response?.data?.message || error.message
//   //     );

//   //   }
//   // }

//   const googleSignup = async () => {

//     try {
//       const response = await signInWithPopup(auth, provider);
//       const user = response.user;

//       const name = user.displayName;
//       const email = user.email;
//       const idToken = await user.getIdToken();

//       await axios.post(
//         `${serverUrl}/api/auth/googleLogin`,
//         { name, email, idToken },
//         { withCredentials: true }
//       );

//       await getCurrentUser();

//       toast.success("Signed up with Google ", {
//         id: loadingToast,
//       });

//       navigate("/");

//     } catch (error) {
//       toast.dismiss(loadingToast);

//       // user ne popup band kar diya
//       if (error.code === "auth/popup-closed-by-user") {
//         toast("Google signup cancelled", { icon: "⚠️" });
//         return;
//       }

//       toast.error("Google signup failed ❌", {
//         description:
//           error.response?.data?.message || error.message,
//       });
//     }
//   };

//   const handleLoginLinkedin = () => {
//     const params = new URLSearchParams({
//       response_type: 'code',
//       client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
//       redirect_uri: 'http://localhost:8000/api/auth/linkedin/callback',

//       scope: 'openid profile email', // OpenID Connect scopes
//       state: Math.random().toString(36).substring(2, 15), // CSRF protection

//     });

//     window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
//   };
//   const githubLogin = async () => {
//     let loadingToast;
//     try {
//       const result = await signInWithPopup(auth, githubProvider);
//       const user = result.user;
//       loadingToast = toast.loading("Signing in with GitHub...");

//       // GitHub sometimes does not provide email
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

//       // Backend login
//       await axios.post(
//         `${serverUrl}/api/auth/githubLogin`,
//         { name, email },
//         { withCredentials: true }
//       );

//       // Update user context
//       await getCurrentUser();

//       toast.success("Logged in with GitHub!", { id: loadingToast });

//       // SPA-friendly redirect
//       navigate("/");

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error("GitHub login failed");
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

//       toast.success("Logged in with Facebook ", {
//         id: loadingToast,
//       });

//       navigate("/");

//     } catch (error) {
//       toast.dismiss(loadingToast);

//       // 🔥 USER CLOSED POPUP — NOT AN ERROR
//       if (error.code === "auth/popup-closed-by-user") {
//         toast("Facebook login cancelled", {
//           icon: "⚠️",
//         });
//         return;
//       }

//       if (error.code === "auth/account-exists-with-different-credential") {
//         toast.error("Account exists", {
//           description: "You already have an account with this email using a different provider.",
//         });
//         return;
//       }

//       // 🔥 REAL ERROR
//       toast.error("Facebook login failed", {
//         description:
//           error.response?.data?.message || error.message,
//       });
//     }
//   };
//   const handleLoginMircosoft = async () => {
//     const loginResponse = await signInWithPopup(auth, mircosoftProvider);
//     // const user = loginResponse.user
//     // console.log(loginResponse)
//     //   // Force refresh to get email
//     // await user.reload();
//     //     console.log("Email:", user.email || loginResponse._tokenResponse.email); // fallback
//     //user ka data lena hai
//     const user = loginResponse.user
//     const userData = {
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.email,
//       avatar: user.photoURL
//     }
//     const response = await axios.post(
//       `${serverUrl}/api/auth/githubLogin`,
//       { name, email },
//       { withCredentials: true }
//     );

//     // Update user context
//     await getCurrentUser();
//   }


//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-[#3C2B4B] to-[#2a1f38] text-white relative overflow-y-hidden overflow-x-hidden  ">

//       {/* Logo */}
//       <img
//         src="/logo.png"
//         alt="Logo"
//         onClick={() => navigate("/")}
//         className="
//             cursor-pointer absolute
//             top-3 left-4
//             w-[120px]
//             sm:w-[150px]
//             md:w-[180px]
//             lg:w-[200px]
//           "
//       />


//       {/* Center section */}

//       <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4">


//         {/* LOTTIE (Above on mobile, Left on desktop) */}
//         <div className="relative z-0 flex items-center justify-center w-full md:w-1/2 order-first md:order-none mb-8 md:mb-0  mt-20 md:mt-0">
//           <Lottie
//             animationData={signupAnimation}
//             loop
//             className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px]"
//           />
//         </div>



//         <div
//           className="
//       w-full max-w-[500px]
//       min-h-[520px] md:min-h-[520px]
//       px-3 py-15
//       bg-transparent
//       rounded-3xl
//       relative z-10
//     "
//         >
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-200 mt-2 mb-2 px-4 sm:px-0 text-center sm:text-center">
//             Create Your Account
//           </h1>
//           <p className="text-gray-400 mb-8 px-4 sm:px-0 text-center sm:text-center">
//             Join us and start your journey today!
//           </p>

//           {/* form yahan aayega */}
//           <form action="" onSubmit={handleSignup} className="  w-full h-[90%] flex flex-col items-center justify-start gap-[20px]">
//             <div className=" w-[93%] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[10px] cursor-pointer mt-0 transition-all duration-200 hover:bg-[rgb(0,95,145)]" onClick={googleSignup}>

//               <img src={google} alt="" className="w-[20px]" />Continue with Google
//             </div>

//             <div className="flex items-center justify-center gap-4 mt-1">
//               {/* GitHub */}
//               <button
//                 className="
//                       w-10 h-10 flex items-center justify-center
//                       rounded-full bg-[rgb(36,41,47)]
//                       hover:bg-[rgb(64,71,78)]
//                       transition-all duration-200
//                       cursor-pointer
//                       border border-[#2a2a2a]
//                     "
//                 onClick={githubLogin}
//               >
//                 <FaGithub className="text-white text-lg" />
//               </button>

//               {/* LinkedIn */}
//               <button
//                 type="button" // <-- important

//                 className="
//                       w-10 h-10 flex items-center justify-center
//                       rounded-full bg-[rgb(0,119,181)]
//                       hover:bg-[rgb(0,95,145)]
//                       transition-all duration-200
//                       cursor-pointer
//                       border border-[#2a2a2a]
//                     "
//                 onClick={handleLoginLinkedin}
//               >
//                 <FaLinkedinIn className="text-white text-lg" />
//               </button>

//               {/* Facebook */}
//               <button
//                 className="
//                       w-10 h-10 flex items-center justify-center
//                       rounded-full bg-[rgb(24,119,242)]
//                       hover:bg-[rgb(20,100,200)]
//                       transition-all duration-200 
//                       border border-[#2a2a2a]
//                       cursor-pointer
//                     "
//                 onClick={facebookLogin}
//               >
//                 <FaFacebookF className="text-white text-lg" />
//               </button>
//               {/* Apple */}


//               <button className="
//                 w-10 h-10 flex items-center justify-center
//                 rounded-full
//                 bg-[#0078D4]    /* Microsoft blue */
//                 border border-[#2a2a2a]
//                 hover:bg-[#005A9E]
//                 hover:border-[#444]
//                 transition-all duration-200
//                 cursor-pointer" onClick={handleLoginMircosoft}>
//                 <img src={microsoft} alt="microsoft" className="w-7 h-7" />
//               </button>


//             </div>
//             <div className="w-[93%] h-[20px] flex items-center justify-center gap-[10px] ">


//               <div className="w-[93%] h-[1px] bg-[#96969635] "></div> Or <div className="w-[93%] h-[1px] bg-[#96969635] "></div>
//             </div>
//             <div className="w-[90%] h-[200px] flex flex-col items-center justify-center gap-[15px]" >
//               <input
//                 type="text"
//                 placeholder="UserName"
//                 className="
//                       w-full
//                       px-4 py-2
//                       rounded-lg 
//                       bg-[#255059ae]
//                       text-white
//                       outline-none
//                       placeholder:text-gray-300
//                       shadow-lg
//                       transition-all duration-200
//                       hover:border-slate-400
//                       hover:ring-2 hover:ring-slate-400
//                       focus:ring-2 focus:ring-slate-500 
//                       required "
//                 onChange={(e) => { setName(e.target.value) }} value={name}

//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="
//                       w-full
//                       px-4 py-2
//                       rounded-lg 
//                       bg-[#255059ae]
//                       text-white
//                       outline-none
//                       placeholder:text-gray-300
//                       shadow-lg
//                       transition-all duration-200
//                       hover:border-slate-400
//                       hover:ring-2 hover:ring-slate-400
//                       focus:ring-2 focus:ring-slate-500 required"
//                 onChange={(e) => { setEmail(e.target.value) }} value={email}

//               />
//               <input
//                 type={show ? "text" : "password"}
//                 placeholder="Password"
//                 className="
//                       w-full
//                       px-4 py-2 pr-10
//                       rounded-lg 
//                       bg-[#255059ae]
//                       text-white
//                       outline-none
//                       placeholder:text-gray-300
//                       shadow-lg
//                       transition-all duration-200
//                       focus:ring-2 focus:ring-slate-500 required"
//                 onChange={(e) => { setPassword(e.target.value) }} value={password}

//               />
//               <div className="
//       absolute right-15 bottom-43
//       cursor-pointer text-gray-300 hover:text-gray-400
//     " onClick={() => {
//                   setShow(
//                     show ? false : true

//                   )
//                 }}>
//                 {show ? <FaEyeSlash /> : <MdOutlineRemoveRedEye />}
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading} // prevent multiple clicks
//                 className={`
//     group
//     flex items-center justify-center gap-2
//     w-full
//     px-4 py-2
//     rounded-lg
//     shadow-lg
//     transition-all duration-300
//     ${loading
//                     ? "bg-gray-500 cursor-not-allowed hover:bg-gray-500" // disabled color + no hover
//                     : "bg-slate-700 text-white hover:bg-slate-600"} // normal
//   `}
//               >
//                 {/* Icon */}
//                 {loading ? (
//                   <span className="text-white text-lg"></span> // stop icon
//                 ) : (
//                   <span className="opacity-0 translate-x-[-5px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
//                     →
//                   </span>
//                 )}

//                 {/* Text */}
//                 <span className="text-white">{loading ? "Creating..." : "Create Account"}</span>
//               </button>


//             </div>
//             <p className="flex gap-[10px]  ">You have any account? <span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer " onClick={() => { navigate("/login") }}> Login</span></p>

//           </form>

//         </div>

//       </div>
//       <Footer />
//     </div>

//   );
// };

// export default Registration;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../assets/googleAuth.svg";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
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
  provider,
  facebookProvider,
  githubProvider,
  microsoftProvider,
} from "../../utils/Firebase";
import microsoftLogo from "../assets/microsoft-logo.svg";
import { toast } from "sonner";
import Footer from "./Footer";

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      await getCurrentUser();
      toast.success("Account created! 🎉", { id: toastId });
      navigate("/verifemail");
    } catch (err) {
      toast.dismiss(toastId);
      const msg =
        err.response?.status === 409
          ? "Email already registered"
          : err.response?.data?.message || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    const toastId = toast.loading("Signing up with Google...");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      await axios.post(
        `${serverUrl}/api/auth/googleLogin`,
        { name: user.displayName, email: user.email, idToken },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Signed up with Google 🎉", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.dismiss(toastId);
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Google signup failed");
      }
    }
  };
  const handleLoginLinkedin = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      redirect_uri: 'http://localhost:8000/api/auth/linkedin/callback',
      scope: 'openid profile email',
      state: Math.random().toString(36).substring(2, 15),
    });

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  };

  const githubLogin = async () => {
    let loadingToast;
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      loadingToast = toast.loading("Signing in with GitHub...");

      let email = user.email;
      if (!email && user.providerData.length > 0) {
        email = user.providerData[0].email;
      }

      if (!email) {
        toast.dismiss(loadingToast);
        toast.error("GitHub did not provide an email", {
          description: "Enable email sharing in GitHub or use another login method.",
        });
        return;
      }

      const name = user.displayName || email.split("@")[0];

      await axios.post(
        `${serverUrl}/api/auth/githubLogin`,
        { name, email },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Logged in with GitHub!", { id: loadingToast });
      navigate("/");

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("GitHub login failed");
    }
  };

  const facebookLogin = async () => {
    let loadingToast;
    try {
      const response = await signInWithPopup(auth, facebookProvider);
      const user = response.user;
      loadingToast = toast.loading("Signing in...");

      const name = user.displayName;
      const email = user.email;
      const idToken = await user.getIdToken();

      await axios.post(
        `${serverUrl}/api/auth/facebookLogin`,
        { name, email, idToken },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Logged in with Facebook ", { id: loadingToast });
      navigate("/");

    } catch (error) {
      toast.dismiss(loadingToast);

      if (error.code === "auth/popup-closed-by-user") {
        toast("Facebook login cancelled", { icon: "⚠️" });
        return;
      }

      toast.error("Facebook login failed", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleLoginMicrosoft = async () => {
    const toastId = toast.loading("Signing in with Microsoft...");
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      const user = result.user;

      let email = user.email;
      if (!email && user.providerData?.length) {
        email = user.providerData[0].email;
      }

      if (!email) throw new Error("No email provided by Microsoft");

      const idToken = await user.getIdToken();

      await axios.post(
        `${serverUrl}/api/auth/microsoftLogin`,
        {
          name: user.displayName || email.split("@")[0],
          email,
          avatar: user.photoURL,
          idToken,
        },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Signed up with Microsoft!", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(
        err.message.includes("email")
          ? "Microsoft didn't share email"
          : "Microsoft signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C2B4B] to-[#2a1f38] text-white relative overflow-hidden">
      <img
        src="/logo.png"
        alt="Logo"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 w-28 sm:w-36 md:w-44 cursor-pointer"
      />

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-10">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Lottie
            animationData={signupAnimation}
            loop
            className="w-64 sm:w-80 md:w-96 lg:w-[460px]"
          />
        </div>

        <div className="w-full max-w-md bg-black/25 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-center mb-6 text-sm md:text-base">
            Join us and start your journey today!
          </p>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div
              onClick={googleSignup}
              className="flex items-center justify-center gap-3 py-2.5 bg-white/10 rounded-xl cursor-pointer hover:bg-white/15 transition text-sm md:text-base"
            >
              <img src={google} alt="Google" className="w-5" />
              Continue with Google
            </div>

            <div className="flex justify-center gap-3 my-2">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition"  onClick={githubLogin}
              >
                <FaGithub className="text-lg" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-[#0A66C2] hover:bg-[#084d99] flex items-center justify-center transition " onClick={handleLoginLinkedin}
              >
                <FaLinkedinIn className="text-lg" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#166fe5] flex items-center justify-center transition" onClick={facebookLogin}
              >
                <FaFacebookF className="text-lg" />
              </button>
              <button
                type="button"
                onClick={handleLoginMicrosoft}
                className="w-10 h-10 rounded-full bg-[#0078D4] hover:bg-[#005ba1] flex items-center justify-center transition"
              >
                <img src={microsoftLogo} alt="Microsoft" className="w-5 h-5" onClick={handleLoginMicrosoft} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-600" />
              <span className="text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-600" />
            </div>

            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 outline-none placeholder-gray-400 text-sm md:text-base"
              required
            />

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
                className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 outline-none placeholder-gray-400 text-sm md:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <MdOutlineRemoveRedEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl font-medium transition text-sm md:text-base ${loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-slate-600"
                }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Registration;