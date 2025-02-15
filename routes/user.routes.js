import { Router } from "express";
import { findAll, findOne, login, register, remove, sendOtp, update, verifyOtp } from "../controllers/user.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";
import selfpolice from "../middleware/selfPolice.js";
import upload from "../config/multer.js";

let userRout = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication operations including login, register, OTP, etc.
 */

/**
 * @swagger
 * /send-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Send OTP to user's email for registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent to the email
 *       400:
 *         description: Invalid email or error
 */
userRout.post("/send-otp", sendOtp);

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP entered by the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: OTP successfully verified
 *       400:
 *         description: Invalid OTP or error
 */
userRout.post("/verify-otp", verifyOtp);

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword"
 *               role:
 *                 type: string
 *                 example: "student"
 *               year:
 *                 type: integer
 *                 example: 2023
 *               image:
 *                 type: string
 *                 example: "/images/profile.jpg"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input or email already exists
 */
userRout.post("/register", upload.single("image"), register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: "jwt_token"
 *       403:
 *         description: Email not found
 *       400:
 *         description: Incorrect password
 */
userRout.post("/login", login);

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Users not found
 */
userRout.get('/user', verifytoken, checkRole(["admin"]), findAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRout.get("/user/:id", verifytoken, selfpolice(["admin"]), findOne);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     tags:
 *       - Authentication
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               experience:
 *                 type: string
 *               year:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
userRout.patch("/user/:id", verifytoken, selfpolice(["admin", "user", "teacher"]), update);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - Authentication
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
userRout.delete("/user/:id", verifytoken, selfpolice(["admin", "user", "teacher"]), remove);

export default userRout;
