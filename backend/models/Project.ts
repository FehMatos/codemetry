import mongoose, { Schema, Document } from "mongoose";

export interface ProjectDocument extends Document {
  projectId: string;
  userId: mongoose.Types.ObjectId;
  name: string;
  remoteUrl: string;
  lastActivityAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    remoteUrl: {
      type: String,
      required: true,
    },
    lastActivityAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ProjectDocument>("Project", projectSchema);
