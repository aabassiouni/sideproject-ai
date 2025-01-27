import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(request: NextRequest) {
  console.log("/////////////////////// /api/repo ////////////////////////");
  const { userId } = await auth();
  const user = await currentUser();
  const { repo, owner } = await request.json();

  if (userId) {
    if (user?.externalAccounts.length !== 0) {
      const clerk = await clerkClient();
      const githubToken = await clerk.users.getUserOauthAccessToken(userId, "oauth_github");

      const octokit = new Octokit({
        auth: githubToken.data[0].token,
      });

      const { data: repoResponse } = await octokit.rest.repos.get({
        owner: owner,
        repo: repo,
      });

      const { data: tree } = await octokit.rest.git.getTree({
        owner: repoResponse.owner.login,
        repo: repoResponse.name,
        tree_sha: repoResponse.default_branch,
        recursive: "true",
      });

      const obj = {
        name: repoResponse.name,
        owner: repoResponse.owner.login,
        size: (repoResponse.size / 1024).toFixed(2),
        stargazers_count: repoResponse.stargazers_count,
        numFiles: tree.tree.length,
      };

      return NextResponse.json(obj);
    }

    const octokit = new Octokit();

    const { data: repoResponse } = await octokit.rest.repos.get({
      owner: owner,
      repo: repo,
    });

    const { data: tree } = await octokit.rest.git.getTree({
      owner: repoResponse.owner.login,
      repo: repoResponse.name,
      tree_sha: repoResponse.default_branch,
      recursive: "true",
    });

    const obj = {
      name: repoResponse.name,
      owner: repoResponse.owner.login,
      size: repoResponse.size,
      stargazers_count: repoResponse.stargazers_count,
      numFiles: tree.tree.length,
    };

    return NextResponse.json(obj);
  }
}
