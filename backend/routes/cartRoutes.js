import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addToCart, getUserCart, updateCart } from "../controller/cartController.js";

const cartRoutes = express.Router();

cartRoutes.post("/add", isAuth, addToCart);
cartRoutes.post("/get", isAuth, getUserCart);
cartRoutes.post("/update", isAuth, updateCart);

export default cartRoutes;
