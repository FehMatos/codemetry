import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import ExtensionToken from "../models/ExtensionToken";

export async function extensionAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Extension token missing",
      });
    }

    const token = authorization.split(" ")[1];

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const extensionToken = await ExtensionToken.findOne({
      tokenHash,
      revokedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!extensionToken) {
      return res.status(401).json({
        message: "Invalid or expired extension token",
      });
    }

    req.userId = extensionToken.userId.toString();

    next();
  } catch (error) {
    console.error("Extension authentication error:", error);

    return res.status(500).json({
      message: "Extension authentication error",
    });
  }
}
