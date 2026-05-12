import StudyHistory from "../models/StudyHistory.js";

export const getUserHistory = async (req, res) => {
  try {
    // ADMIN → return ALL history with full population
    if (req.user.role === "admin") {
      const all = await StudyHistory.find()
        .populate("userId", "username email")
        .populate("flashcardId", "question answer")
        .sort({ createdAt: -1 });

      return res.json(all);
    }

    // USER → return only their own history
 const userHistory = await StudyHistory.find({ userId: req.user.id })
  .populate("userId", "username email")
  .populate("flashcardId", "question answer")
  .sort({ createdAt: -1 });
    return res.json(userHistory);

  } catch (err) {
        console.error("GET HISTORY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// CREATE history entry
export const addHistory = async (req, res) => {
  try {
    const { flashcardId, result } = req.body;

      // VALIDATION — this was missing
    if (!flashcardId) {
      return res.status(400).json({ error: "flashcardId missing" });
    }

    const history = await StudyHistory.create({
      userId: req.user.id,
      flashcardId,
      result,
      studiedAt: new Date()
    });

    res.json(history);
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// DELETE a single history entry
export const deleteHistory = async (req, res) => {
  try {
    const deleted = await StudyHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "History not found" });
    }

    res.json({ message: "History deleted" });
  } catch (error) {
        console.error("DELETE HISTORY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


