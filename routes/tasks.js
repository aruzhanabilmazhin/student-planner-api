import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/tasks.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - status
 *         - priority
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *           description: Авто-сгенерированный ID задачи
 *         title:
 *           type: string
 *           description: Название задачи
 *         description:
 *           type: string
 *           description: Описание задачи
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Дата выполнения задачи
 *         status:
 *           type: string
 *           description: Статус задачи (pending, in-progress, completed)
 *         priority:
 *           type: integer
 *           description: Приоритет задачи (1-5)
 *         userId:
 *           type: string
 *           description: ID пользователя, которому назначена задача
 *       example:
 *         title: Finish homework
 *         description: Math exercises
 *         dueDate: 2026-02-01
 *         status: pending
 *         priority: 2
 *         userId: 6976eeb39842ddd5e9774d5a
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API для управления задачами
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Получить все задачи
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Список всех задач
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Создать новую задачу
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Задача создана
 */
router.post("/", createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Обновить задачу по ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Задача обновлена
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Удалить задачу по ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача удалена
 */
router.delete("/:id", deleteTask);

export default router;
