import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function makeAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const res = await User.updateOne(
    { email: "feletiteaupa@gmail.com" },
    { $set: { role: "admin" } }
  );

  console.log("Update result:", res);
  mongoose.connection.close();
}

makeAdmin();
