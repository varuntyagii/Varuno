import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in", // Zoho SMTP host
  port: 587,             // TLS port
  secure: false,         // true for 465, false for 587
  auth: {
    user: "support@varuno.qzz.io", // your Zoho email
    pass: "xSPN9Hc0cdtB"
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
