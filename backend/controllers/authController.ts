import { Request, Response } from "express";
import { getGithubAccessToken, getGithubUser } from "../services/githubService";
import { findOrCreateGithubUser } from "../services/userService";
import { createSession } from "../services/sessionService";

export function redirectToGithub(req: Request, res: Response) {
  const githubUrl = new URL("https://github.com/login/oauth/authorize");

  githubUrl.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);

  githubUrl.searchParams.set("redirect_uri", process.env.GITHUB_CALLBACK_URL!);

  githubUrl.searchParams.set("scope", "read:user user:email");

  res.redirect(githubUrl.toString());
}

export async function githubCallback(req: Request, res: Response) {
  try {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        message: "GitHub authorization code is missing",
      });
    }

    const accessToken = await getGithubAccessToken(code);

    const githubUser = await getGithubUser(accessToken);

    const user = await findOrCreateGithubUser(githubUser);

    const { token, expiresAt } = await createSession(user._id.toString());

    res.cookie("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return res.json({
      message: "GitHub authentication successful",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "GitHub authentication failed",
    });
  }
}
