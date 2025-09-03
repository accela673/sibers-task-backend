import { Router } from "express";
import { login } from "../controllers/authController";

const router = Router();

// Login endpoint
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as admin or superadmin
 *     tags: [Auth]
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
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

export default router;
