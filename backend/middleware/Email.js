import { transporter } from "./Email.config.js";
import { verificationEmail, welcomeEmail } from "../config/EmailTemplate.js";

export const otpSender = async (email, otp) => {
  return transporter.sendMail({
    from: '"Varuno" <support@varuno.qzz.io>',
    to: email,
    subject: "Your Varuno Verification Code",
    text: `Your OTP is ${otp}`,
    html: verificationEmail(otp),
  });
};

export const SendEmail = async (email, name) => {
  return transporter.sendMail({
    from: '"Varuno" <support@varuno.qzz.io>',
    to: email,
    subject: "Welcome to Varuno!",
    text: "Your account has been created successfully.",
    html: welcomeEmail(name),
  });
};
