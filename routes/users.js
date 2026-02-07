// routes/users.js
import express from "express";
import {
  register,
  login,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (require token)
router.get("/", auth, getUsers);             // Get all users
router.get("/:id", auth, getUserById);      // Get single user by ID
router.post("/", auth, createUser);         // Create new user
router.put("/:id", auth, updateUser);       // Update user by ID
router.delete("/:id", auth, deleteUser);    // Delete user by ID

export default router;
