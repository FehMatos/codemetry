import express from "express";

import {
  getProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.use(requireAuth);

router.get("/", getProjects);
router.get("/:id", getProject);
router.delete("/:id", deleteProject);

export default router;
