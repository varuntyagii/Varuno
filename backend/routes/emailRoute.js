import express from "express";
import { sendContactEmail } from "../controller/emailController.js";

const emailRoute = express.Router();

// POST route for contact form
emailRoute.post("/email-mail", sendContactEmail);

export default emailRoute;