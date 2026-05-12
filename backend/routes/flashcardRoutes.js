import express from "express";
import {
  getFlashcards,
  createFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from "../controllers/flashcardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ⭐ All flashcard routes require login
router.get("/", authMiddleware, getFlashcards);
router.post("/", authMiddleware, createFlashcard);
router.delete("/:id", authMiddleware, deleteFlashcard);
router.put("/:id", authMiddleware, updateFlashcard);

export default router;
