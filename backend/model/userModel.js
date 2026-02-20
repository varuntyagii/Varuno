// userModel.js - KEEP ONLY THIS FILE
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true  // Fixed spelling
  },
  // password: { type: String },  // Add this
  password: { type: String, select: false },
  otp: { type: String, select: false },
  otpExpires: { type: Date },
  otpAttempts: { type: Number, default: 0 },
  phone: { type: String },
  avatar: { type: String },
  cartData: { type: Object, default: {} },
  isVerified: {
    type: Boolean,
    default: false
  },
  // otp: String
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
