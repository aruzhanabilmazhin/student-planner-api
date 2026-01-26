import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import { setupSwagger } from "./swagger/swagger.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// Swagger
setupSwagger(app);

// Root
app.get("/", (req, res) => {
  res.send("Student Planner API is running!");
});

// Connect MongoDB & start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
