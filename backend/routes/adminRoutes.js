import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  deleteUser,
  getAllFlashcards,
  deleteFlashcardAdmin
} from "../controllers/adminController.js";

import { 
  getUserHistory, 
  deleteHistory 
} from "../controllers/historyController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/flashcards", getAllFlashcards);
router.delete("/flashcards/:id", deleteFlashcardAdmin);

// ⭐ FIXED — use the correct controller
router.get("/history", getUserHistory);
router.delete("/history/:id", deleteHistory);

export default router;
