import Generation from "@/components/Generation";
import GithubRepoCard from "@/components/GithubRepoCard";
import MobileRepoSelect from "@/components/MobileRepoSelect";
import RepoCard from "@/components/RepoCard";
import RepoInfo from "@/components/RepoInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GithubRepoType } from "@/types";
import clerk from "@clerk/clerk-sdk-node";
import { currentUser } from "@clerk/nextjs";
import { Octokit } from "octokit";
import { Suspense } from "react";

async function WritePage() {
  const user = await currentUser();

  let repos: GithubRepoType = [];

  if (user?.id) {
    if (user?.externalAccounts?.length !== 0) {
      const githubToken = await clerk.users.getUserOauthAccessToken(user.id, "oauth_github");

      const octokit = new Octokit({
        auth: githubToken[0].token,
      });

      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        visibility: "all",
      });

      repos = data;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-200 sm:flex-row dark:bg-gray-900">
      <MobileRepoSelect>
        <ScrollArea className="h-44">
          <div className="space-y-3">
            {repos?.map((repo, idx) => (
              <Suspense key={idx} fallback={<div>Loading...</div>}>
                <RepoCard repo={repo} />
              </Suspense>
            ))}
          </div>
        </ScrollArea>
      </MobileRepoSelect>
      <GithubRepoCard>
        <ScrollArea className="sm:h-96">
          <div className="mr-3 space-y-3">
            {repos ? (
              repos?.map((repo, idx) => (
                <Suspense key={idx} fallback={<div>Loading...</div>}>
                  <RepoCard repo={repo} />
                </Suspense>
              ))
            ) : (
              <p className="my-auto text-center text-slate-400">
                Connect your GitHub account to view your repositories
              </p>
            )}
          </div>
        </ScrollArea>
      </GithubRepoCard>
      <div className="flex grow flex-col">
        <div className="m-4 mx-auto my-2 basis-1/4">
          <RepoInfo />
        </div>
        <Generation />
      </div>
    </div>
  );
}

export default WritePage;
