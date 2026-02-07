import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/tasks.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Protected routes (all require JWT)
router.get("/", auth, getTasks);           // Get all tasks
router.get("/:id", auth, getTaskById);    // Get single task
router.post("/", auth, createTask);       // Create task
router.put("/:id", auth, updateTask);     // Update task
router.delete("/:id", auth, deleteTask);  // Delete task

export default router;
