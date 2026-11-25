import express from "express";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import connectDB from "./database/db.js";
import User from "./models/user.js";

import authRoutes from "./routes/authroutes.js";
import noteRoutes from "./routes/noteRoutes.js";

import eventEmitter from "./utils/events.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server);

// Middleware
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Secure Connect Server is running");
});

// Socket.IO authentication
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication required"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id)
            .select("_id username email role");

        if (!user) {
            return next(new Error("User not found"));
        }

        socket.user = user;

        next();

    } catch (error) {
        next(new Error("Invalid or expired token"));
    }
});

// Socket.IO connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.username}`);

    // Join general chat room
    socket.join("general");

    console.log(`${socket.user.username} joined room general`);

    // Receive chat message
    socket.on("chatMessage", (data) => {
        const message = data?.message?.trim();

        if (!message || message.length > 1000) {
            return socket.emit("chatError", {
                message: "Message must contain 1-1000 characters"
            });
        }

        const chatData = {
            username: socket.user.username,
            message,
            time: new Date().toISOString()
        };

        // Emit EventEmitter event
        eventEmitter.emit(
            "chatMessage",
            socket.user.username,
            message
        );

        // Send message to everyone in general room
        io.to("general").emit("newMessage", chatData);
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.user.username}`);
    });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
    await connectDB();

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();