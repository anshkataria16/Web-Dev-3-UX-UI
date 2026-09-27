const express = require("express");

const router = express.Router();

const students = require("../data/students");

// GET all students
router.get("/", (req, res) => {
    res.status(200).json(students);
});


// GET student by ID
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// ADD student
router.post("/", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        email: req.body.email,
        course: req.body.course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});


// UPDATE student
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.email = req.body.email;
    student.course = req.body.course;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// DELETE student
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});


module.exports = router;