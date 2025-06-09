import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../utils/db"; // Your DB connection file
import { generateToken } from "../utils/jwt"; // <-- Use your utility

const SALT_ROUNDS = 10;

// POST /api/auth/register
const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if ((existing as any[]).length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await db.query(
      "INSERT INTO users (email, passwordHash, name) VALUES (?, ?, ?)",
      [email, hashedPassword, name]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// POST /api/auth/login
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = (users as any[])[0];

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Use generateToken utility
    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// GET /api/auth/me
const getCurrentUser = async (req: Request, res: Response) => {
  const user = req.user; // Injected by authMiddleware
  res.json({ user });
};

export { loginUser, registerUser, getCurrentUser };
