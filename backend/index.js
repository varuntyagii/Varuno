// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./config/db.js";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import cors from "cors"
// import productRoutes from "./routes/productRoutes.js";
// import { listProduct } from "./controller/productController.js";
// import cartRoutes from "./routes/cartRoutes.js"; // plural
// import orderRoutes from "./routes/orderRoutes.js";

// dotenv.config();
// let port = process.env.PORT || 6000;

// let app = express();

// app.get("/", (req, res) => {
//   res.send("server is running");
// }); // server

// //middleWare
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//       origin:["http://localhost:5173","http://localhost:5174"],
//       credentials:true
// }))

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/product", productRoutes);
//     app.use("/api/product", listProduct);

// app.use("/api/cart", cartRoutes);
// app.use("/api/order", orderRoutes);

//     connectDb();
//   app.listen(port, () => {
//     console.log(`✅ Server running on port ${port}`);
//   });


import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { listProduct } from "./controller/productController.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import emailRoute from "./routes/emailRoute.js";

const port = process.env.PORT || 6000;

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: ["https://varuno-1.onrender.com", "https://admin-y1lw.onrender.com", "https://varuno.vercel.app"],
    // origin:true,
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/newsletter", newsletterRoutes);


app.use("/api/product", productRoutes);

// If you want a direct route for listProduct
app.get("/api/product/list", listProduct);


app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api", emailRoute);



// connect to DB
connectDb();

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
