import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, toggleAdminStatus } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleWare";

// Router instance
const router = Router();

// Get paginated users list with optional sorting
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get paginated list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [username, firstName, birthdate]
 *         description: Field to sort by
 *     responses:
 *       200:
 *         description: List of users with pagination
 */
router.get("/", authMiddleware, getUsers);

// Get user by ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, getUser);

// Create a new user
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               birthdate:
 *                 type: string
 *                 format: date
 *             required:
 *               - username
 *               - password
 *               - firstName
 *               - lastName
 *               - gender
 *               - birthdate
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", authMiddleware, createUser);

// Update user by ID
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               birthdate:
 *                 type: string
 *                 format: date
 *             required:
 *               - firstName
 *               - lastName
 *               - gender
 *               - birthdate
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put("/:id", authMiddleware, updateUser);

// Delete user by ID
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", authMiddleware, deleteUser);

// Toggle admin status of a user
/**
 * @swagger
 * /users/toggle/{id}:
 *   patch:
 *     summary: Toggle admin status of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully toggled admin status
 *       404:
 *         description: User not found
 */
router.patch("/toggle/:id", authMiddleware, toggleAdminStatus);

export default router;
