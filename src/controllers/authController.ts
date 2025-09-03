import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/generateToken";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Superadmin login from .env
  if (username === process.env.ADMIN_USERNAME) {
    if (password === process.env.ADMIN_PASSWORD) {
      const token = generateToken("superadmin");
      return res.json({ token, role: "superadmin" });
    } else {
      return res.status(401).json({ message: "Invalid superadmin credentials" });
    }
  }

  // Normal admin login from DB
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  if (!user.isAdmin) {
    return res.status(403).json({ message: "Access denied: not an admin" });
  }

  const token = generateToken("admin", user.id);
  res.json({ token, role: "admin" });
};
