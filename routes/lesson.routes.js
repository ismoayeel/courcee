import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/lesson.controller.js";
import upload from "../config/multer.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const lessonRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Lessons
 *     description: Operations related to lessons
 */

/**
 * @swagger
 * /lesson:
 *   get:
 *     tags:
 *       - Lessons
 *     summary: Get all lessons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of lessons
 */
lessonRoute.get("/lesson", findAll);

/**
 * @swagger
 * /lesson:
 *   get:
 *     tags:
 *       - Lessons
 *     summary: Search lessons based on query parameters
 *     parameters:
 *       - in: query
 *         name: courceId
 *         description: Course ID to filter lessons by
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         description: Lesson name to filter by
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of filtered lessons
 */
lessonRoute.get("/lesson", findBySearch);

/**
 * @swagger
 * /lesson/{id}:
 *   get:
 *     tags:
 *       - Lessons
 *     summary: Get lesson by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson to fetch
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson object
 *       404:
 *         description: Lesson not found
 */
lessonRoute.get("/lesson/:id", findOne);

/**
 * @swagger
 * /lesson:
 *   post:
 *     tags:
 *       - Lessons
 *     summary: Create a new lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Introduction to JavaScript"
 *               courceId:
 *                 type: integer
 *                 example: 1
 *               link:
 *                 type: string
 *                 example: "https://example.com/lesson1"
 *               desc:
 *                 type: string
 *                 example: "An introduction to JavaScript programming"
 *               image:
 *                 type: string
 *                 example: "/uploads/lesson1.jpg"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Lesson created successfully
 */
lessonRoute.post("/lesson", verifytoken, checkRole(["admin", "teacher"]), upload.single("image"), create);

/**
 * @swagger
 * /lesson/{id}:
 *   patch:
 *     tags:
 *       - Lessons
 *     summary: Update lesson by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *               desc:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       404:
 *         description: Lesson not found
 */
lessonRoute.patch("/lesson/:id", verifytoken, checkRole(["admin", "teacher"]), update);

/**
 * @swagger
 * /lesson/{id}:
 *   delete:
 *     tags:
 *       - Lessons
 *     summary: Delete lesson by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       404:
 *         description: Lesson not found
 */
lessonRoute.delete("/lesson/:id", verifytoken, checkRole(["admin", "teacher"]), remove);

export default lessonRoute;
