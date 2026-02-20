import express from "express";
import { addProduct, listProduct, removeProduct } from "../controller/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";
 let productRoutes = express.Router();

//  productRoutes.post('/addProduct',upload.fields([
//     {name: "image1", maxCount:1}, {name: "image2", maxCount:1}, 
//     {name: "image3", maxCount:1}, {name: "image4", maxCount:1},
//  ]), addProduct);
 productRoutes.post('/addProduct',upload.fields([
    {name: "image1", maxCount:1}, {name: "image2", maxCount:1}, 
    {name: "image3", maxCount:1}, {name: "image4", maxCount:1},
 ]), addProduct);
 

 productRoutes.get("/list", listProduct);
productRoutes.delete('/remove/:id', adminAuth, removeProduct);



 productRoutes.get("/list", listProduct);

 export default productRoutes