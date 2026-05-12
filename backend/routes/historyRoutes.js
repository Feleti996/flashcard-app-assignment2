import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserHistory,
  addHistory,
  deleteHistory,
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", authMiddleware, getUserHistory);
router.post("/", authMiddleware, addHistory);
router.delete("/:id", authMiddleware, deleteHistory);

export default router;
