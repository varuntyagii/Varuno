// Source - https://stackoverflow.com/a/66772419
// Posted by Alex
// Retrieved 2026-02-21, License - CC BY-SA 4.0

import dotenv from "dotenv";

dotenv.config();

import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});




// import nodemailer from 'nodemailer'


// const transporter = nodemailer.createTransport({
//   host: "smtp.zoho.com",
//   port: 587,
//   secure: false, // TLS
//   auth: {
//     user: "support@varuno.qzz.io",
//     pass: "f3ZsKBbF83XXJAb@", // exactly the Zoho app password
//   },
//   tls: {
//     rejectUnauthorized: false, // temporary bypass for certificate issues
//   },
// });

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("SMTP Connection Error:", error);
//   } else {
//     console.log("SMTP Connection Successful!");
//   }
// });
