import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import security from '../assets/security'
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import logo from "../assets/logo.png";
import Footer from "./Footer";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { FaShield } from "react-icons/fa6";
import { toast } from "sonner"
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { adminData, getAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminLogin",
        { email, password },
        { withCredentials: true }
      );

      getAdmin();
      navigate("/");
      
      toast.success("Admin Access Granted", {
        description: "Welcome back, boss 😎",
        duration: 2700,
        style: {
          background: "#020617",
          border: "1px solid #334155",
          color: "#e5e7eb",
        },
      });
    } catch (error) {
      toast.error("Login failed", {
        description: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0f1f] via-[#0b122b] to-[#020617] flex flex-col ">
      {/* Logo - Responsive positioning */}
      <div className="px-4 md:px-6 pt-4 md:pt-6 pb-0">
        <img src={logo} alt="logo" className="w-28 sm:w-32 md:w-[130px] opacity-90" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-4  md:py-4">
        <div className="w-full max-w-4xl lg:max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Animation - Responsive */}
          <div className="hidden lg:flex justify-center order-2 lg:order-1">
            <div className="w-[350px] lg:w-[420px] h-[350px] lg:h-[420px] flex items-center justify-center">
              <Lottie animationData={security} loop className="w-full h-full max-w-[450px]" />
            </div>
          </div>

          {/* Mobile Animation */}
          <div className="lg:hidden flex justify-center mb-8 order-1">
            <div className="w-48 h-48 flex items-center justify-center">
              <Lottie animationData={security} loop className="w-32 h-32" />
            </div>
          </div>

          {/* Login Section */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto order-2 lg:order-2">
            
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-100 tracking-wide mb-2">
                Admin Access
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                Authorized personnel only
              </p>
            </div>

            {/* Login Card - Fully Responsive */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl sm:rounded-lg border border-slate-700/50 shadow-2xl p-6 sm:p-8 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 hover:border-slate-600 rounded-xl sm:rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                    placeholder="admin@company.com"
                    disabled={loading}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 hover:border-slate-600 rounded-xl sm:rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 pr-12 disabled:opacity-60"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-50"
                    >
                      {show ? (
                        <FaEyeSlash className="w-5 h-5" />
                      ) : (
                        <MdOutlineRemoveRedEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 disabled:from-slate-800 disabled:to-slate-800 text-slate-100 font-medium rounded-xl sm:rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-slate-600"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-slate-700/50 flex items-center justify-center gap-2 text-xs text-slate-500">
                <FaShield className="w-3.5 h-3.5" />
                <span>Secure Connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Responsive */}
      <div className="px-4 pb-6 sm:pb-8 md:pb-12 text-center text-slate-500 text-xs border-t border-slate-800/50 pt-6 sm:pt-8">
        <p>© 2026 Varuno. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
