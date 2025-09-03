import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";

// Get paginated list of users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const sort = (req.query.sort as string) || "username";
    const offset = (page - 1) * limit;

    const total = await prisma.user.count();

    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      orderBy: { [sort]: "asc" },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        gender: true,
        birthdate: true,
        isAdmin: true,
      },
    });

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get user details
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        gender: true,
        birthdate: true,
        isAdmin: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName, gender, birthdate, isAdmin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        gender,
        birthdate: new Date(birthdate),
        isAdmin: !!isAdmin,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        gender: true,
        birthdate: true,
        isAdmin: true,
      },
    });

    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, gender, birthdate } = req.body;
    const id = Number(req.params.id);

    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        gender,
        birthdate: new Date(birthdate)
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        gender: true,
        birthdate: true,
      },
    });

    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle admin status without body
export const toggleAdminStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { isAdmin: !user.isAdmin },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
    },
  });

  res.json(updated);
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) return res.status(404).json({ message: "User not found" });

    await prisma.user.delete({ where: { id } });

    res.json({ message: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
