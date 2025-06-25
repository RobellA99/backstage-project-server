import express from "express";
import {
  createDoc,
  getDocBySlug,
  getDocSlugs,
  updateDoc,
} from "../controllers/docController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getDocSlugs);
router.get("/:slug", getDocBySlug);
router.post("/", authMiddleware, createDoc);
router.put("/:id", authMiddleware, updateDoc);

export default router;
