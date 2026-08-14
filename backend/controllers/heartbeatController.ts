import { RequestHandler } from "express";
import Heartbeat from "../models/Heartbeat";
import Project from "../models/Project";

const createHeartbeat: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId, file, language } = req.body;

    if (!projectId || !file || !language) {
      res.status(400).json({
        error: "projectId, file and language are required.",
      });
      return;
    }

    const project = await Project.findOne({
      projectId,
      userId,
    });

    if (!project) {
      res.status(404).json({
        error: "Project not found.",
      });
      return;
    }

    const heartbeat = await Heartbeat.create({
      userId,
      projectId,
      file,
      language,
      timezone: user.timezone,
    });

    await Project.updateOne(
      { projectId, userId },
      { lastActivityAt: heartbeat.createdAt }
    );

    res.status(201).json(heartbeat);
  } catch (error) {
    console.error("Error creating heartbeat:", error);

    res.status(500).json({
      error: "Internal Server Error while creating heartbeat.",
      details: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export { createHeartbeat };
