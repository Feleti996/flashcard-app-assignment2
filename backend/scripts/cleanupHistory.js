import mongoose from "mongoose";
import StudyHistory from "../models/StudyHistory.js";

const MONGO_URI = process.env.MONGO_URI;

async function cleanup() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Find broken entries
    const broken = await StudyHistory.find({ flashcardId: null });

    console.log(`Found ${broken.length} broken history entries`);

    if (broken.length > 0) {
      await StudyHistory.deleteMany({ flashcardId: null });
      console.log("Deleted broken entries successfully");
    } else {
      console.log("No broken entries found");
    }

    process.exit(0);
  } catch (err) {
    console.error("Cleanup error:", err);
    process.exit(1);
  }
}

cleanup();
