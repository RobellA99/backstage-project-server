import express from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
