import { Request, Response, NextFunction } from "express";
import { findSessionByToken } from "../services/sessionService";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.session;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const session = await findSessionByToken(token);

    if (!session) {
      return res.status(401).json({
        message: "Invalid or expired session",
      });
    }

    req.userId = session.userId.toString();

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Authentication error",
    });
  }
}
