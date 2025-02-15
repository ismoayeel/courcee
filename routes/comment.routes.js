import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/comment.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const commentRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Comment
 *     description: Operations related to comments
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get all comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of comments
 */
commentRoute.get("/comment", findAll);

/**
 * @swagger
 * /comment:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Search comments based on query parameters
 *     parameters:
 *       - in: query
 *         name: user_id
 *         description: User ID to filter comments by
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courceId
 *         description: Cource ID to filter comments by
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of filtered comments
 */
commentRoute.get("/comment", findBySearch);

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to fetch
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comment object
 *       404:
 *         description: Comment not found
 */
commentRoute.get("/comment/:id", findOne);

/**
 * @swagger
 * /comment:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Create a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               msg:
 *                 type: string
 *                 example: "Great course!"
 *               star:
 *                 type: integer
 *                 example: 5
 *               courceId:
 *                 type: integer
 *                 example: 101
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
commentRoute.post("/comment", verifytoken, checkRole(["admin", "teacher", "user"]), create);

/**
 * @swagger
 * /comment/{id}:
 *   patch:
 *     tags:
 *       - Comment
 *     summary: Update comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *               star:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
commentRoute.patch("/comment/:id", verifytoken, checkRole(["admin", "teacher", "user"]), update);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: Delete comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
commentRoute.delete("/comment/:id", verifytoken, checkRole(["admin", "teacher", "user"]), remove);

export default commentRoute;
