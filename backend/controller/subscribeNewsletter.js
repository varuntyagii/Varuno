// controller/subscribeNewsletter.js
import Newsletter from "../model/newsletterSchema.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

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
        message: "Already subscribed",  // ✅ Match frontend
      });
    }

    await Newsletter.create({ 
      email: email.toLowerCase().trim() 
    });

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
