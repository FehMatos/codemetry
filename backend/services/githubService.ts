import axios from "axios";
import dotenv from "dotenv";

interface GithubAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GithubUserResponse {
  id: number;
  login: string;
  avatar_url: string;
}

export async function getGithubAccessToken(code: string) {
  const response = await axios.post<GithubAccessTokenResponse>(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data.access_token;
}

export async function getGithubUser(accessToken: string) {
  const response = await axios.get<GithubUserResponse>(
    "https://api.github.com/user",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  return response.data;
}
