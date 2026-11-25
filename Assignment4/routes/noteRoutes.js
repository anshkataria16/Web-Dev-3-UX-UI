import express from "express";

import Note from "../models/note.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All notes routes require a valid JWT
router.use(verifyToken);

// CREATE NOTE
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const note = await Note.create({
            title,
            content,
            owner: req.user._id
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create note"
        });
    }
});

// GET ALL USER NOTES
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find({
            owner: req.user._id
        });

        res.status(200).json(notes);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notes"
        });
    }
});

// GET SINGLE NOTE
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);

    } catch (error) {
        res.status(400).json({
            message: "Invalid note ID"
        });
    }
});

// UPDATE NOTE
router.put("/:id", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user._id
            },
            {
                title,
                content
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid note data"
        });
    }
});

// DELETE NOTE
router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid note ID"
        });
    }
});

export default router;