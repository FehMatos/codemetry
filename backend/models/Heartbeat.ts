import mongoose, { Schema, Document } from "mongoose";

export interface HeartbeatDocument extends Document {
  userId: mongoose.Types.ObjectId;
  projectId: string;
  file: string;
  language: string;
  timezone: string;
  createdAt: Date;
}

const heartbeatSchema = new Schema<HeartbeatDocument>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<HeartbeatDocument>("Heartbeat", heartbeatSchema);
