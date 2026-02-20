import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { authDataContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import forgotAnimation from "../assets/online-shopping-delivery.json";
import Footer from "./Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Sending code...");

    try {
      await axios.post(`${serverUrl}/api/auth/request-password-reset`, { email });
      toast.success("Code sent to your email 📧", { id: toastId });
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send code", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Resetting password...");

    try {
      await axios.post(`${serverUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful! 🎉", { id: toastId });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C2B4B] to-[#2a1f38] text-white relative">
      <img
        src="/logo.png"
        alt="Logo"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 w-28 sm:w-36 md:w-44 cursor-pointer"
      />

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-10">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Lottie
            animationData={forgotAnimation}
            loop
            className="w-64 sm:w-80 md:w-96 lg:w-[460px]"
          />
        </div>

        <div className="w-full max-w-md bg-black/25 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h1>
          <p className="text-gray-400 text-center mb-6 text-sm md:text-base">
            {step === 1
              ? "Enter your email to receive a recovery code"
              : "Enter the code and your new password"}
          </p>

          {step === 1 ? (
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 outline-none placeholder-gray-400 text-sm md:text-base"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-xl font-medium transition ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {loading ? "Sending..." : "Send Recovery Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Recovery Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 outline-none placeholder-gray-400 text-sm md:text-base"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 outline-none placeholder-gray-400 text-sm md:text-base"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-xl font-medium transition ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <p className="text-center mt-6 text-sm text-gray-400">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;