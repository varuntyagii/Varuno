import uploadOnCloudinary from "../config/cloudinary.js"
import productModel from "../model/productModel.js";
import { unlinkSync } from "fs"; // For cleanup

import path from 'path';

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    
          const imageUrls = [];

    if (req.files?.image1) {
      imageUrls.push(await uploadOnCloudinary(req.files.image1[0].path));
    }
    if (req.files?.image2) {
      imageUrls.push(await uploadOnCloudinary(req.files.image2[0].path));
    }
    if (req.files?.image3) {
      imageUrls.push(await uploadOnCloudinary(req.files.image3[0].path));
    }
    if (req.files?.image4) {
      imageUrls.push(await uploadOnCloudinary(req.files.image4[0].path));
    }

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
              image: imageUrls,   // 🔥 THIS LINE FIXES EVERYTHING

        };

        const product = await productModel.create(productData);
        return res.status(201).json(product);
    } catch (error) {
        console.error("Add product error:", error);
        return res.status(500).json({ message: `Add product error: ${error.message}` });
    }
};
export const listProduct = async(req, res)=>{
    try {
        const product = await productModel.find({})
        return res.status(200).json(product);

    } catch (error) {
        console.error("List product error:", error);
        return res.status(500).json({ message: `List product error: ${error.message}` });
    }
} 

export const removeProduct = async(req, res)=>{
    try {
        let {id} = req.params;
        const product = await productModel.findByIdAndDelete(id);
        return res.status(200).json(product);

    } catch (error) {
        console.error("Remove product error:", error);
        return res.status(500).json({ message: `Remove product error: ${error.message}` });
    }
}