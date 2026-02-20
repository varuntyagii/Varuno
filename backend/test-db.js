import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log("Checking environment variables...");
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

console.log(`ℹ️  MONGO_URI starts with: ${process.env.MONGO_URI.substring(0, 15)}...`);

console.log("🔄 Attempting to connect to MongoDB...");
try {
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Custom Script: Connected successfully!");
    await mongoose.disconnect();
} catch (error) {
    console.error("❌ Custom Script Error:", error.message);
    console.error("Full error:", error);
}
