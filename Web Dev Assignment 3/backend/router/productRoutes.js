import express from "express";

import {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    lowStockReport,
    categorySummary,
} from "../controller/productController.js";

const router = express.Router();

// Add Product
router.post("/", createProduct);

// Get All Products
router.get("/", getProducts);

// Low Stock Report
router.get("/low-stock", lowStockReport);

// Category Summary
router.get("/category-summary", categorySummary);

// Get Single Product
router.get("/:id", getSingleProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;