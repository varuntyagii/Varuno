import { transporter } from "./Email.config.js";
import { verificationEmail, welcomeEmail, } from "../config/EmailTemplate.js";

export const otpSender = async (email, otp) => {
  const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
  return transporter.sendMail({
    from: `"Varuno" <${smtpUser}>`,
    to: email,
    subject: "Your Varuno Verification Code",
    text: `Your OTP is ${otp}`,
    html: verificationEmail(otp),
  });
};

export const SendEmail = async (email, name) => {
  const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
  return transporter.sendMail({
    from: `"Varuno" <${smtpUser}>`,
    to: email,
    subject: "Welcome to Varuno!",
    text: "Your account has been created successfully.",
    html: welcomeEmail(name),
  });
};

