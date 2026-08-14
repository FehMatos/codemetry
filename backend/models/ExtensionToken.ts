import mongoose, { Schema, Document } from "mongoose";

export interface ExtensionTokenDocument extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  createdAt: Date;
  lastUsedAt?: Date;
  expiresAt?: Date;
  revokedAt?: Date;
}

const extensionTokenSchema = new Schema<ExtensionTokenDocument>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    lastUsedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
    revokedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ExtensionTokenDocument>(
  "ExtensionToken",
  extensionTokenSchema
);
