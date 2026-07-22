const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth.middleware");

const handleError = (res, status, message, details) => {
    console.error(`[task-api] ${message}`, details || "");
    return res.status(status).json({ message, details });
};

// Get all tasks for the authenticated user
router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        handleError(res, 500, "Unable to fetch tasks", error.message);
    }
});

// Get a single task
router.get("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return handleError(res, 404, "Task not found");
        }
        res.json(task);
    } catch (error) {
        handleError(res, 500, "Unable to fetch task", error.message);
    }
});

// Create a task
router.post("/", auth, async (req, res) => {
    try {
        const task = await Task.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            time: req.body.time,
            priority: req.body.priority
        });
        console.log(`[task-api] Created task ${task._id}`);
        res.status(201).json(task);
    } catch (error) {
        if (error.name === "ValidationError") {
            return handleError(res, 400, "Validation failed", error.message);
        }
        handleError(res, 500, "Unable to create task", error.message);
    }
});

// Update a task with PUT or PATCH
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return handleError(res, 404, "Task not found");
        }

        const allowedFields = ["title", "description", "time", "priority", "completed"];
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                task[field] = req.body[field];
            }
        });

        await task.save();
        console.log(`[task-api] Updated task ${task._id}`);
        res.json(task);
    } catch (error) {
        if (error.name === "ValidationError") {
            return handleError(res, 400, "Validation failed", error.message);
        }
        handleError(res, 500, "Unable to update task", error.message);
    }
};

router.put("/:id", auth, updateTask);
router.patch("/:id", auth, updateTask);

// Delete a task
router.delete("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return handleError(res, 404, "Task not found");
        }
        await task.deleteOne();
        console.log(`[task-api] Deleted task ${req.params.id}`);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        handleError(res, 500, "Unable to delete task", error.message);
    }
});

module.exports = router;