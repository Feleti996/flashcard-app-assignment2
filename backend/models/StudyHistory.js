import mongoose from "mongoose";

const StudyHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flashcardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flashcard",
    required: true,
  },
  result: {
    type: String,
    enum: ["correct", "incorrect"],
    required: true,
  },
  studiedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("StudyHistory", StudyHistorySchema);
;
