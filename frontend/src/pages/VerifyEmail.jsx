// import { useContext, useState } from "react"; 
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { authDataContext } from "../context/AuthContext";
// import { userDataContext } from "../context/UserContext";
// import { toast } from "sonner";

// const VerifyEmail = () => {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);

//   const { serverUrl } = useContext(authDataContext);
//   const { getCurrentUser } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const handleResendOtp = async () => {
//     try {
//       setResending(true);
//       const res = await axios.post(`${serverUrl}/api/auth/resendotp`, {}, { withCredentials: true });
//       if (res.data.success) toast.success("New OTP sent to your email! 📩");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to resend OTP");
//     } finally {
//       setResending(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (otp.length !== 6) return setError("Enter 6 digit OTP");

//     try {
//       setLoading(true);
//       setError("");
//       const res = await axios.post(`${serverUrl}/api/auth/verifemail`, { code: otp }, { withCredentials: true });

//       if (res.data.success) {
//         toast.success("Email verified successfully! 🎉");
//         await getCurrentUser();
//         navigate("/");
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white w-full max-w-sm p-8 rounded-xl shadow-lg border border-gray-200">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Verify Your Email
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="text"
//             maxLength={6}
//             value={otp}
//             onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//             placeholder="Enter OTP"
//             className="border border-gray-300 rounded-lg px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
//           >
//             {loading ? "Verifying..." : "Verify"}
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
//           <button
//             onClick={handleResendOtp}
//             disabled={resending}
//             className="text-indigo-600 font-medium hover:underline disabled:opacity-50"
//           >
//             {resending ? "Sending..." : "Resend OTP"}
//           </button>
//         </div>

//         {error && (
//           <p className="text-red-500 text-sm text-center mt-4">
//             {error}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;

import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60); // Reduced to 60 seconds (1 minute)

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const inputsRef = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    try {
      const res = await axios.post(`${serverUrl}/api/auth/resendotp`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success("New OTP sent! 📩");
        setTimer(60); // reset 1 min
      }
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete(`${serverUrl}/api/auth/logOut`, { withCredentials: true });
      setUserData(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
      toast.error("Logout failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return setError("Enter 6 digit OTP");

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${serverUrl}/api/auth/verifemail`, { code }, { withCredentials: true });
      if (res.data.success) {
        toast.success("Email verified successfully! 🎉");
        await getCurrentUser();
        navigate("/");
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Verify Your Email
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 mb-2">
            Resend OTP in: {formatTime(timer)}
          </p>
          <button
            onClick={handleResendOtp}
            disabled={resending || timer > 0}
            className="text-indigo-600 font-medium hover:underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
          <p className="text-xs text-gray-400 mb-3 text-center">
            Want to use a different account?
          </p>
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm font-medium hover:text-red-600 transition duration-200"
          >
            Logout / Change Account
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
