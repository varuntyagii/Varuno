import { emailContactTemplate } from "../config/emailContactTemplate.js";
import { contactAutoReplyTemplate } from "../config/contactAutoReplyTemplate.js";
import { emailClient } from "../middleware/Email.config.js";
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
import validator from "validator";

dotenv.config();
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
    const emailUser = (process.env.EMAIL_USER || "").replace(/"/g, "").trim();
    const currentDate = new Date().toLocaleString();

    // 1. Send Notification to Admin
    let adminEmail = new SibApiV3Sdk.SendSmtpEmail();
    adminEmail.sender = { name: "Varuno Portal", email: "support@varuno.qzz.io" };
    adminEmail.to = [{ email: smtpUser }];
    if (emailUser && emailUser !== smtpUser) adminEmail.cc = [{ email: emailUser }];

    // Only set replyTo if the user provided a valid email
    if (validator.isEmail(email)) {
      adminEmail.replyTo = { email: email, name: name };
    }

    adminEmail.subject = `🚨 New Contact: ${subject} from ${name}`;
    adminEmail.htmlContent = emailContactTemplate({ name, email, subject, message, currentDate });

    console.log(`Sending admin notification for contact from ${email}...`);
    await emailClient.sendTransacEmail(adminEmail);

    // 2. Send Auto-Reply to Customer (only if email is valid)
    if (validator.isEmail(email)) {
      let userEmail = new SibApiV3Sdk.SendSmtpEmail();
      userEmail.sender = { name: "Varuno Support", email: "support@varuno.qzz.io" };
      userEmail.to = [{ email: email, name: name }];
      userEmail.subject = `We've received your message: ${subject}`;
      userEmail.htmlContent = contactAutoReplyTemplate({ name, currentDate });

      console.log(`Sending auto-reply to ${email}...`);
      await emailClient.sendTransacEmail(userEmail);
    } else {
      console.log(`Skipping auto-reply due to invalid email: ${email}`);
    }

    res.status(200).json({ message: "Messages processed successfully." });
  } catch (error) {
    console.error("Error sending contact emails:", error.response ? error.response.body : error);
    res.status(500).json({ message: "Failed to process request.", error: error.message });
  }
};

