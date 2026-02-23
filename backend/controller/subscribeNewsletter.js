// controller/subscribeNewsletter.js
import Newsletter from "../model/newsletterSchema.js";
import { transporter } from "../middleware/Email.config.js";
import { newsletterWelcomeTemplate } from "../config/newsletterTemplate.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check existing (case-insensitive)
    const existing = await Newsletter.findOne({
      email: email.toLowerCase().trim()
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already subscribed",
      });
    }

    // Save to database
    await Newsletter.create({
      email: email.toLowerCase().trim()
    });

    // Send Welcome Email
    const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
    const currentDate = new Date().toLocaleString();
    const backendUrl = process.env.BACKEND_URL || "https://varuno-bbjw.onrender.com";

    const mailOptions = {
      from: smtpUser,
      to: email.toLowerCase().trim(),
      subject: "Welcome to the Varuno ",
      html: newsletterWelcomeTemplate({ name, email, currentDate, backendUrl })
    };

    await transporter.sendMail(mailOptions);

    // Send Admin Notification Email
    const emailUser = (process.env.EMAIL_USER || "").replace(/"/g, "").trim();
    const adminMailOptions = {
      from: `"${email}" <${smtpUser}>`, // Shows subscriber email as the sender name
      replyTo: email, // Restoration: Allows direct reply to the subscriber
      to: smtpUser,
      cc: emailUser,
      subject: `New Joiner Joined Varuno . ${name}`,
      html: newsletterWelcomeTemplate({ name, email, currentDate, backendUrl })
    };

    await transporter.sendMail(adminMailOptions);

    res.status(200).json({
      success: true,
      message: "Subscribed successfully! Check your inbox.",
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({
      success: false,
      message: "Server error",
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

    const frontendUrl = process.env.FRONTEND_URL || "https://varuno-1.onrender.com";
    res.redirect(`${frontendUrl}?unsubscribed=true`);
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).send("Error unsubscribing");
  }
};
