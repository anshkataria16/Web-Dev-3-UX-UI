
import mongoose from "mongoose";

// Creating product schema
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    sku: {
    type: String,
    required: true,
    unique: true
    },
    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    quantity: {
        type: Number,
        required: true,
        min: 0
    },

    reorderLevel: {
        type: Number,
        required: true,
        min: 0
    },

    supplier: {
        type: String,
        required: true
    }

});

// Creating Product model
const Product = mongoose.model("Product", productSchema);

// Exporting model
export default Product;
