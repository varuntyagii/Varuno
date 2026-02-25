// controller/subscribeNewsletter.js
import Newsletter from "../model/newsletterSchema.js";
import { emailClient } from "../middleware/Email.config.js";
import { newsletterWelcomeTemplate } from "../config/newsletterTemplate.js";
import SibApiV3Sdk from "sib-api-v3-sdk";
import validator from "validator";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Check existing (case-insensitive)
    const existing = await Newsletter.findOne({
      email: email.toLowerCase().trim()
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You are already subscribed to our newsletter! 💌",
      });
    }

    // Save to database
    await Newsletter.create({
      email: email.toLowerCase().trim(),
      name: name ? name.trim() : ""
    });

    // Send Welcome Email
    const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
    const currentDate = new Date().toLocaleString();
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

    let welcomeEmail = new SibApiV3Sdk.SendSmtpEmail();
    welcomeEmail.sender = { name: "Varuno", email: "support@varuno.qzz.io" };
    welcomeEmail.to = [{ email: email.toLowerCase().trim(), name: name || "Subscriber" }];
    welcomeEmail.subject = "Welcome to the Varuno Circle";
    welcomeEmail.htmlContent = newsletterWelcomeTemplate({ name, email, currentDate, backendUrl });
    try {
      await emailClient.sendTransacEmail(welcomeEmail);
    } catch (brevoError) {
      console.error("Brevo Welcome Email Error:", brevoError.response ? brevoError.response.body : brevoError);
    }

    // Send Alert Notification Email (Requested to go to the logged-in user)
    let alertEmail = new SibApiV3Sdk.SendSmtpEmail();
    alertEmail.sender = { name: "Varuno Alert", email: "support@varuno.qzz.io" };
    // User requested alert to go to them, not the admin
    alertEmail.to = [{ email: email.toLowerCase().trim(), name: name || "New Member" }];
    alertEmail.subject = `Joiner Alert: ${name || email} has joined the circle!`;
    alertEmail.htmlContent = newsletterAlertTemplate({ name, email, currentDate, backendUrl });

    try {
      await emailClient.sendTransacEmail(alertEmail);
    } catch (brevoError) {
      console.error("Brevo Alert Email Error:", brevoError.response ? brevoError.response.body : brevoError);
    }

    res.status(200).json({
      success: true,
      message: "Subscribed successfully! Check your inbox.",
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({
      success: false,
      message: "Server error during subscription.",
      error: error.message
    });
  }
};

export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send("Email is required");
    }

    await Newsletter.findOneAndDelete({ email: email.toLowerCase().trim() });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}?unsubscribed=true`);
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).send("Error unsubscribing");
  }
};
