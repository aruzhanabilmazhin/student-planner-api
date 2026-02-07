import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// Swagger setup
const __dirname = path.resolve();
const swaggerFile = path.join(__dirname, "swagger", "swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, "utf-8"));

import swaggerUi from "swagger-ui-express";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root
app.get("/", (req, res) => {
  res.send("Student Planner API is running!");
});

// Connect MongoDB & start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: "Internal Server Error",
    error: err.message,
  });
});
