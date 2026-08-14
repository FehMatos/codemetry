import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserDocument extends Document {
  githubId: string;
  githubUsername: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  timezone: string;
}

const userSchema = new Schema<UserDocument>(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    githubUsername: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    timezone: {
      type: String,
      required: true,
      default: "UTC",
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserDocument>("User", userSchema);
