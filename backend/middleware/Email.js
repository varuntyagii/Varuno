import SibApiV3Sdk from "sib-api-v3-sdk"; // ✅ MANDATORY
import { emailClient } from "./Email.config.js";
import { verificationEmail, welcomeEmail } from "../config/EmailTemplate.js";

// OTP Email
export const otpSender = async (email, otp) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = { name: "Varuno", email: "support@varuno.qzz.io" };
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.subject = "Your Varuno Verification Code";
  sendSmtpEmail.htmlContent = verificationEmail(otp);
  sendSmtpEmail.textContent = `Your OTP is ${otp}`;

  try {
    console.log(`Attempting to send OTP email to ${email}...`);
    const response = await emailClient.sendTransacEmail(sendSmtpEmail);
    console.log("OTP Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending OTP via Brevo API:", error.response ? error.response.body : error);
    throw error;
  }
};

// Welcome Email
export const SendEmail = async (email, name) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = { name: "Varuno", email: "support@varuno.qzz.io" };
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.subject = "Welcome to Varuno!";
  sendSmtpEmail.htmlContent = welcomeEmail(name);
  sendSmtpEmail.textContent = `Welcome ${name} to Varuno!`;

  try {
    console.log(`Attempting to send Welcome email to ${email}...`);
    const response = await emailClient.sendTransacEmail(sendSmtpEmail);
    console.log("Welcome Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending Welcome email via Brevo API:", error.response ? error.response.body : error);
    throw error;
  }
};



// import { transporter } from "./Email.config.js";
// import { verificationEmail, welcomeEmail, } from "../config/EmailTemplate.js";

// export const otpSender = async (email, otp) => {
//   const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
//   return transporter.sendMail({
//     from: `"Varuno" <${smtpUser}>`,
//     to: email,
//     subject: "Your Varuno Verification Code",
//     text: `Your OTP is ${otp}`,
//     html: verificationEmail(otp),
//   });
// };

// export const SendEmail = async (email, name) => {
//   const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
//   return transporter.sendMail({
//     from: `"Varuno" <${smtpUser}>`,
//     to: email,
//     subject: "Welcome to Varuno!",
//     text: "Your account has been created successfully.",
//     html: welcomeEmail(name),
//   });
// };

