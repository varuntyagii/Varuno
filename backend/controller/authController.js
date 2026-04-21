
import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { otpSender, SendEmail } from "../middleware/Email.js";

import { rmSync } from "fs";
import admin from "../firebaseAdmin.js";
// import { SendEmail } from "../middleware/Email.config.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser && existUser.isVerified) {
      return res.status(409).json({ message: "User already exists with this email" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter the valid Email" });

    }

    if (!password) {
      return res.status(400).json({ message: "Your password is empty" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Strong Password" });

    }

    let hashPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 1000000).toString();

    let user;
    if (existUser) { // user exist krta hai lekin verify ni hai
      // Update existing unverified user 
      existUser.name = name;
      existUser.password = hashPassword;
      existUser.otp = otp;
      existUser.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      existUser.otpAttempts = 0;
      user = await existUser.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        password: hashPassword,
        otp: otp,
        otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
        otpAttempts: 0
      });
    }


    try {
      await otpSender(user.email, otp);
    } catch (emailError) {
      console.error("Failed to send initial OTP email:", emailError);
      return res.status(500).json({
        message: "Failed to send verification email. Please check your email configuration or try again later.",
        error: emailError.message
      });
    }

    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    return res.status(201).json({
      message: "User registered successfully. Please verify OTP."
    });

  } catch (error) {
    console.log("registraction error");

    res.status(500).json({ message: `registraction error ${error}` });
  }
}
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;


    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "No account found with this email"
        // message: "Wait Boss"
      });
    }
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in"
      });
    }


    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" }); // agr password galat hua tab ki bat hore hai
    }
    let token = await genToken(user._id)

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });


  } catch (error) {
    console.log("Login error");

    res.status(500).json({ message: `Login error ${error}` });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.userId;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Verification code is required"
      });
    }

    const user = await User.findById(userId)
      .select("+otp +otpExpires +otpAttempts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 🚫 Block if too many attempts
    if (user.otpAttempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new OTP."
      });
    }

    // ⏳ Expiry check
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "Code has expired. Please resend."
      });
    }

    // ❌ Wrong OTP
    if (user.otp !== code) {
      user.otpAttempts += 1;

      if (user.otpAttempts >= 5) {
        user.otp = undefined;
        user.otpExpires = undefined;
      }

      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid verification code"
      });
    }

    // ✅ SUCCESS
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;

    await user.save();

    try {
      await SendEmail(user.email, user.name);
    } catch (err) {
      console.error("Welcome email failed:", err);
    }
    return res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {
    console.log("VERIFY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const resendOtp = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.otpAttempts = 0;

    await user.save();
    await otpSender(user.email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const logOut = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });
    return res.status(200).json({
      message: "logOut successful"
    })
  } catch (error) {
    return res.status(500).json({ message: `logOut error ${error}` })
  }
}

export const googleLogin = async (req, res) => {
  try {
    let { name, email, idToken  } = req.body
    if (!email) {
      const decoded = await admin.auth().verifyIdToken(idToken);
      email = decoded.email;
      name = name || decoded.name;
    }
     if (!email) {
      return res.status(400).json({ message: "Email not found from Google" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, isVerified: true });
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }


    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(202).json({ message: "Google Login successfully", user, token });

} catch (error) {
  console.log("Google Error", error.message, error.stack); // ye change kar
  return res.status(500).json({ message: "Google login failed", error: error.message });
}
}
//login with facebok
export const facebookLogin = async (req, res) => {
  try {
    let { name, email } = req.body
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, isVerified: true });
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }


    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    return res.status(202).json({ message: "Facebook Login successfully", user, token });

  } catch (error) {
    console.log("Facebook Error");

    return res.status(500).json({ message: "Facebook login failed", error: error.message });

  }
}

//login with GitHub


//login controller for linkedin 
export const githubLogin = async (req, res) => {
  try {
    let { name, email } = req.body;


    if (!name) name = "GitHub User";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, isVerified: true });
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "GitHub Login successfully",
      user,
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "GitHub login failed",
      error: error.message
    });
  }

};


const getAccesToken = async (code) => {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    // redirect_uri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:8000/api/auth/linkedin/callback',
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI, // ✅ Environment variable use karo

  });

  // ✅ FIX 1: response (not resposne)
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });

  // ✅ FIX 2: response (not resposne)
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // ✅ FIX 3: response (not resposne)
  const accessToken = await response.json();
  return accessToken;
}

const getUserData = async (accessToken) => {
  const response = await fetch('https://api.linkedin.com/v2/userinfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  // ✅ FIX 4: response (not resposne)
  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const userData = await response.json();
  return userData;
}

export const linkedinLogin = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("LinkedIn code received:", code ? "Yes" : "No");

    const accessToken = await getAccesToken(code);
    console.log("Access token received:", accessToken ? "Yes" : "No");

    const userData = await getUserData(accessToken.access_token);
    console.log("User data received:", userData ? "Yes" : "No");

    if (!userData || !userData.email) {
      return res.status(500).json({
        message: "Failed to fetch LinkedIn user data",
        error: "No email received from LinkedIn"
      });
    }

    let user = await User.findOne({ email: userData.email });
    if (!user) {
      user = await User.create({
        name: userData.name || userData.given_name || 'LinkedIn User',
        email: userData.email,
        isVerified: true,
        avatar: userData.picture || null
      });
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // ✅ Success redirect - use environment variable if present
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/linkedin/success`);

  } catch (error) {
    console.error("LinkedIn login error:", error);
    res.status(500).json({
      message: "LinkedIn login failed",
      error: error.message
    });
  }
};
export const microsoftLogin = async (req, res) => {
  try {
    const { name, email, phoneNumber, avatar, idToken } = req.body;



    let finalEmail = email;

    // ID token se email try karo
    if (!finalEmail && idToken) {
      try {
        const decoded = jwt.verify(idToken, 'no-key');
        finalEmail = decoded.email;
      } catch (e) { }
    }

    // 🔥 GUEST EMAIL - NO ERROR!
    if (!finalEmail) {
      finalEmail = `${name.toLowerCase().replace(/\s+/g, '')}@microsoft-guest.com`;

    }

    let user = await User.findOne({ email: finalEmail });
    if (!user) {
      user = await User.create({
        name: name || 'Microsoft User',
        email: finalEmail,
        phoneNumber: phoneNumber || null,
        avatar: avatar || null,
        isVerified: true
      });
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: 'Microsoft login successful',
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Microsoft login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      let token = await genToken1(email)
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(201).json({ message: "Admin login successful", token });
    }
    else if (email != process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "Invalid Email" })

    }
    return res.status(400).json({ message: "Invalid credentials" })
  }
  catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Admin login failed" });
  }
}


export const adminLogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/"
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logOut error ${error}` })
  }
}

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email"
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.otpAttempts = 0;
    await user.save();

    try {
      await otpSender(user.email, otp);
    } catch (emailError) {
      console.error("Forgot password OTP email failed:", emailError);
      return res.status(500).json({
        success: false,
        message: "Failed to send reset code. Please try again."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recovery code sent to your email"
    });

  } catch (error) {
    console.log("REQUEST RESET ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email }).select("+otp +otpExpires +otpAttempts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.otp !== otp) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(400).json({
        success: false,
        message: "Invalid recovery code"
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Recovery code has expired"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// MongoDB Update <Profile></Profile>
