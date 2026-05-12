import Flashcard from "../models/Flashcard.js";

// ⭐ GET all flashcards for logged-in user
export const getFlashcards = async (req, res) => {
  try {
    // ⭐ If admin → return ALL flashcards
    if (req.user.role === "admin") {
      const cards = await Flashcard.find().populate("createdBy", "username email");
      return res.json(cards);
    }

    // ⭐ If normal user → return ONLY their flashcards
    const cards = await Flashcard.find({ createdBy: req.user.id });
    res.json(cards);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// ⭐ CREATE a flashcard
export const createFlashcard = async (req, res) => {
  try {
    const { question, answer, category, difficulty } = req.body;

    const card = await Flashcard.create({
      question,
      answer,
      category,
      difficulty,
      createdBy: req.user.id   // ⭐ IMPORTANT
    });

    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// ⭐ DELETE a flashcard
export const deleteFlashcard = async (req, res) => {
  try {
    const card = await Flashcard.findById(req.params.id);

    if (!card) return res.status(404).json({ error: "Flashcard not found" });

    // ⭐ Admin can delete anything
    if (req.user.role === "admin") {
      await card.deleteOne();
      return res.json({ message: "Flashcard deleted by admin" });
    }

    // ⭐ User can delete ONLY their own
    if (card.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await card.deleteOne();
    res.json({ message: "Flashcard deleted" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ⭐ UPDATE a flashcard
export const updateFlashcard = async (req, res) => {
  try {
    const updated = await Flashcard.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Flashcard not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update flashcard" });
  }
};




