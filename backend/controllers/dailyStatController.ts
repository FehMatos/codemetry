import mongoose from "mongoose";
import { RequestHandler } from "express";
import DailyStat from "../models/DailyStat";

interface IdParams {
  id: string;
}

const getDailyStats: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const dailyStats = await DailyStat.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(dailyStats);
  } catch (error) {
    console.error("Error retrieving daily stats:", error);
    res.status(500).json({
      error: "Internal Server Error while retrieving daily stats.",
      details: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

const getDailyStat: RequestHandler<IdParams> = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such daily stat" });
    return;
  }

  const dailyStat = await DailyStat.findOne({
    _id: id,
    userId: req.userId,
  });

  if (!dailyStat) {
    res.status(404).json({ error: "No such daily stat" });
    return;
  }
  res.status(200).json(dailyStat);
};

export { getDailyStat, getDailyStats };
