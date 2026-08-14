import mongoose from "mongoose";
import { RequestHandler } from "express";
import Project from "../models/Project";

interface IdParams {
  id: string;
}

const getProjects: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({
      error: "Internal Server Error while retrieving projects.",
      details: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

const getProject: RequestHandler<IdParams> = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such project" });
    return;
  }

  const project = await Project.findOne({
    _id: id,
    userId: req.userId,
  });

  if (!project) {
    res.status(400).json({ error: "No such project" });
    return;
  }
  res.status(200).json(project);
};

const deleteProject: RequestHandler<IdParams> = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such project" });
    return;
  }

  const project = await Project.findOneAndDelete({
    _id: id,
    userId: req.userId,
  });
  if (!project) {
    res.status(400).json({ error: "No such project" });
    return;
  }
  res.status(200).json(project);
};

export { getProject, getProjects, deleteProject };
