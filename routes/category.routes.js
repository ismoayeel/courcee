import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/category.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const categoryRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Operations related to categories
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 */
categoryRoute.get("/category", findAll);

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     summary: Search categories based on query parameters
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Category name to search
 *         schema:
 *           type: string
 *       - in: query
 *         name: desc
 *         description: Category description to search
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of filtered categories
 */
categoryRoute.get("/category", findBySearch);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to fetch
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category object
 *       404:
 *         description: Category not found
 */
categoryRoute.get("/category/:id", findOne);

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Technology"
 *               desc:
 *                 type: string
 *                 example: "Courses related to technology"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category created successfully
 */
categoryRoute.post("/category", verifytoken, checkRole(["admin", "teacher"]), create);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     tags:
 *       - Category
 *     summary: Update category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
categoryRoute.patch("/category/:id", verifytoken, checkRole(["admin", "teacher"]), update);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
categoryRoute.delete("/category/:id", verifytoken, checkRole(["admin", "teacher"]), remove);

export default categoryRoute;
