import crypto from "crypto";
import Session from "../models/Session";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30;

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = hashToken(token);

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await Session.create({
    userId,
    tokenHash,
    expiresAt,
  });

  return {
    token,
    expiresAt,
  };
}

export async function findSessionByToken(token: string) {
  const tokenHash = hashToken(token);

  const session = await Session.findOne({
    tokenHash,
    expiresAt: { $gt: new Date() },
  });

  return session;
}

export async function deleteSession(token: string) {
  const tokenHash = hashToken(token);

  const session = await Session.findOne({ tokenHash });

  const result = await Session.deleteOne({
    tokenHash,
  });

  console.log("Session delete result:", result);
}
