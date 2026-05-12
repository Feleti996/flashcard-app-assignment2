import User from "../models/User.js";
import Flashcard from "../models/Flashcard.js";
import StudyHistory from "../models/StudyHistory.js";

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE user role
export const updateUserRole = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all flashcards
export const getAllFlashcards = async (req, res) => {
  try {
    const cards = await Flashcard.find().populate("createdBy", "username email");
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE any flashcard
export const deleteFlashcardAdmin = async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: "Flashcard deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all study history
export const getAllHistory = async (req, res) => {
  try {
    const history = await StudyHistory.find()
      .populate("userId", "username email")
      .populate("flashcardId", "question answer");

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE any history entry
export const deleteHistoryAdmin = async (req, res) => {
  try {
    await StudyHistory.findByIdAndDelete(req.params.id);
    res.json({ message: "History entry deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
