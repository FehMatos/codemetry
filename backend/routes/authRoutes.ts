import { Router } from "express";
import { deleteSession } from "../services/sessionService";

import {
  redirectToGithub,
  githubCallback,
} from "../controllers/authController";

import { requireAuth } from "../middleware/requireAuth";
import User from "../models/User";

const router = Router();

router.get("/github", redirectToGithub);
router.get("/github/callback", githubCallback);

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch user",
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.session;

    if (token) {
      await deleteSession(token);
    }

    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Logout failed",
    });
  }
});

export default router;
