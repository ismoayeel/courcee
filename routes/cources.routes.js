import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/cources.controller.js";
import upload from "../config/multer.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const courcesRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Cources
 *     description: Operations related to courses
 */

/**
 * @swagger
 * /cources:
 *   get:
 *     tags:
 *       - Cources
 *     summary: Get all courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses
 */
courcesRoute.get("/cources", findAll);

/**
 * @swagger
 * /cources:
 *   get:
 *     tags:
 *       - Cources
 *     summary: Search courses based on query parameters
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         description: Category ID to filter courses by
 *         schema:
 *           type: integer
 *       - in: query
 *         name: teacherId
 *         description: Teacher ID to filter courses by
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of filtered courses
 */
courcesRoute.get("/cources", findBySearch);

/**
 * @swagger
 * /cources/{id}:
 *   get:
 *     tags:
 *       - Cources
 *     summary: Get course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to fetch
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course object
 *       404:
 *         description: Course not found
 */
courcesRoute.get("/cources/:id", findOne);

/**
 * @swagger
 * /cources:
 *   post:
 *     tags:
 *       - Cources
 *     summary: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "JavaScript 101"
 *               desc:
 *                 type: string
 *                 example: "An introductory course on JavaScript"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               teacherId:
 *                 type: integer
 *                 example: 2
 *               image:
 *                 type: string
 *                 example: "/uploads/course1.jpg"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course created successfully
 */
courcesRoute.post("/cources", verifytoken, checkRole(["admin", "teacher"]), upload.single("image"), create);

/**
 * @swagger
 * /cources/{id}:
 *   patch:
 *     tags:
 *       - Cources
 *     summary: Update course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to update
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
 *               desc:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               teacherId:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
courcesRoute.patch("/cources/:id", verifytoken, checkRole(["admin", "teacher"]), update);

/**
 * @swagger
 * /cources/{id}:
 *   delete:
 *     tags:
 *       - Cources
 *     summary: Delete course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
courcesRoute.delete("/cources/:id", verifytoken, checkRole(["admin", "teacher"]), remove);

export default courcesRoute;
