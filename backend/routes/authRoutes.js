import express from "express";
import {
    adminLogin,
    adminLogOut,


    facebookLogin,
    githubLogin,
    googleLogin,
    linkedinLogin,
    login,
    logOut,
    microsoftLogin,
    registration,
    requestPasswordReset,
    resendOtp,
    resetPassword,
    verifyEmail,
} from "../controller/authController.js";
import isAuth from "../middleware/isAuth.js";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);
authRoutes.post("/verifemail", isAuth, verifyEmail);
authRoutes.post("/resendotp", isAuth, resendOtp);
authRoutes.post("/login", login);
authRoutes.delete("/logOut", logOut);
authRoutes.post("/googleLogin", googleLogin);
authRoutes.post("/facebookLogin", facebookLogin);
authRoutes.post("/githubLogin", githubLogin);
authRoutes.get("/linkedin/callback", linkedinLogin);
authRoutes.post("/microsoftLogin", microsoftLogin);

// authRoutes.get("/discord/callback", discordCallback);  // legacy direct OAuth2
// authRoutes.post("/discordLogin", discordLogin);         // Supabase Discord login

authRoutes.post("/adminLogin", adminLogin);
authRoutes.delete("/adminLogout", adminLogOut);

authRoutes.post("/request-password-reset", requestPasswordReset);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
