import express from "express";
import isAuth from "../middleware/isAuth.js";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorpay } from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
const orderRoutes = express.Router();
//for user
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay);
orderRoutes.post("/userorders", isAuth, userOrders);
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay);
orderRoutes.post("/create-checkout-session", isAuth, placeOrderStripe);


//for admin 
orderRoutes.post("/list",adminAuth, allOrders);
orderRoutes.post("/status",adminAuth, updateStatus);


export default orderRoutes;