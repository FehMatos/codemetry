import express from "express";

import {
  getDailyStat,
  getDailyStats,
} from "../controllers/dailyStatController";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.use(requireAuth);

router.get("/", getDailyStats);
router.get("/:id", getDailyStat);

export default router;
