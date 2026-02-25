// // Source - https://stackoverflow.com/a/66772419
// // Posted by Alex
// // Retrieved 2026-02-21, License - CC BY-SA 4.0

// import dotenv from "dotenv";

// dotenv.config();

// import nodemailer from 'nodemailer'

// const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
// const smtpPass = (process.env.SMTP_PASS || "").replace(/"/g, "").trim();

// export const transporter = nodemailer.createTransport({
//   host: "smtp.zoho.in",
//   port: process.env.SMTP_PORT,
//   secure: true,
//   auth: {
//     user: smtpUser,
//     pass: smtpPass,
//   },
// });
// console.log("📧 Email Config:", { 
//   host: smtpHost, 
//   port: smtpPort, 
//   user: smtpUser,
//   secure: smtpSecure 
// }); // Debug ke liye

// Source - https://stackoverflow.com/a/66772419
// Posted by Alex
// Retrieved 2026-02-21, License - CC BY-SA 4.0

import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';

// Environment variables with fallbacks
const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
const smtpPass = (process.env.SMTP_PASS || "").replace(/"/g, "").trim();
const smtpHost = process.env.SMTP_HOST || "smtp.zoho.in";
const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
const smtpSecure = smtpPort === 465; // true for 465, false for 587

// Log configuration for debugging
console.log("📧 Email Config:", { 
  host: smtpHost, 
  port: smtpPort, 
  user: smtpUser,
  secure: smtpSecure 
});

// Create transporter
export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure, // true for 465, false for 587
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false, // Temporary bypass for self-signed cert issues
  },
  connectionTimeout: 30000, // 30 seconds
  socketTimeout: 30000,
  debug: true, // Enable debug logs (remove in production if not needed)
  logger: true, // Log to console
});

// Verify connection (optional but helpful)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Connection Successful!");
  }
});




// // import nodemailer from 'nodemailer'


// // const transporter = nodemailer.createTransport({
// //   host: "smtp.zoho.com",
// //   port: 587,
// //   secure: false, // TLS
// //   auth: {
// //     user: "support@varuno.qzz.io",
// //     pass: "f3ZsKBbF83XXJAb@", // exactly the Zoho app password
// //   },
// //   tls: {
// //     rejectUnauthorized: false, // temporary bypass for certificate issues
// //   },
// // });

// // transporter.verify(function (error, success) {
// //   if (error) {
// //     console.log("SMTP Connection Error:", error);
// //   } else {
// //     console.log("SMTP Connection Successful!");
// //   }
// // });
