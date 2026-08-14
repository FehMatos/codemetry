import express from "express";
import { extensionAuth } from "../middleware/extesionAuth";
import { createHeartbeat } from "../controllers/heartbeatController";

const router = express.Router();

router.post("/", extensionAuth, createHeartbeat);

export default router;
