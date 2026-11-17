import express from "express";
import dotenv from "dotenv";

import connectDB from "./database/db.js";
import productRoutes from "./router/productRoutes.js";
import errorHandler from "./middleware/middleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Inventory Management System is Running");
});

// Product Routes
app.use("/api/products", productRoutes);

// Error Handler
app.use(errorHandler);

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log("Server running on port " + PORT);
        });
    }
    catch (error) {
        console.log("Server could not start");
    }
};

startServer();