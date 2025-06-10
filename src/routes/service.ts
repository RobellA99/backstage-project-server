import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
} from "../controllers/serviceController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", createService, authMiddleware);

export default router;
4;
