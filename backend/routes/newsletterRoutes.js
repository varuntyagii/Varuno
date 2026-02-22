import express from "express";
import { subscribeNewsletter, unsubscribeNewsletter } from "../controller/subscribeNewsletter.js";

const newsletterRoutes = express.Router();

newsletterRoutes.post("/subscribe", subscribeNewsletter);
newsletterRoutes.get("/unsubscribe", unsubscribeNewsletter);

export default newsletterRoutes;
