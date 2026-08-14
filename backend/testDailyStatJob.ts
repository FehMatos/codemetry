import mongoose from "mongoose";
import dotenv from "dotenv";
import { generateDailyStats } from "./jobs/dailyStatJob";

dotenv.config();

async function run() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(MONGO_URI);

  console.log("Connected to MongoDB.");

  await generateDailyStats();

  console.log("Daily stats generated successfully.");

  await mongoose.disconnect();
}

run().catch((error) => {
  console.error("Error generating daily stats:", error);
  process.exit(1);
});
