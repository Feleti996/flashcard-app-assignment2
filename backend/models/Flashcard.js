import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

  },
  { timestamps: true }
);

export default mongoose.model("Flashcard", FlashcardSchema);

