import User from "../models/User";

interface GithubUserData {
  id: number;
  login: string;
  avatar_url: string;
}

export async function findOrCreateGithubUser(githubUser: GithubUserData) {
  let user = await User.findOne({
    githubId: String(githubUser.id),
  });

  if (!user) {
    user = await User.create({
      githubId: String(githubUser.id),
      githubUsername: githubUser.login,
      avatarUrl: githubUser.avatar_url,
    });
  }

  return user;
}
