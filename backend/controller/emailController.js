import { emailContactTemplate } from "../config/emailContactTemplate.js";
import { transporter } from "../middleware/Email.config.js";

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Clean environment variables (remove literal quotes if present)
    const smtpUser = (process.env.SMTP_USER || "").replace(/"/g, "").trim();
    const emailUser = (process.env.EMAIL_USER || "").replace(/"/g, "").trim();
    const currentDate = new Date().toLocaleString(); // you can format as you like

    // Email options
    const mailOptions = {
      from: smtpUser, // Naked email for maximum compatibility
      replyTo: email,
      to: smtpUser,
      cc: emailUser, // Use CC instead of comma-separated TO for better compatibility
      subject: `Varuno Contact Form: ${subject} (${name})`,
      html: emailContactTemplate({ name, email, subject, message, currentDate })
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent to both accounts successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
};

