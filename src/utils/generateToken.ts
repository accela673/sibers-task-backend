import jwt from "jsonwebtoken";

export const generateToken = (role: string, id?: number) => {
  return jwt.sign(
    { id: id || null, role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );
};
