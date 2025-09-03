import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;
    (req as any).user = decoded;

    if (decoded.role !== "superadmin" && decoded.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};
