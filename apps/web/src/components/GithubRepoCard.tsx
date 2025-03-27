import { type GithubRepoType, getAuthGHClient } from "@/lib/github";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import RepoCard from "./RepoCard";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export async function GithubRepos() {
  const user = await currentUser();

  let repos: GithubRepoType = [];

  if (user?.id) {
    if (user?.externalAccounts?.length !== 0) {
      const clerk = await clerkClient();
      const githubToken = await clerk.users.getUserOauthAccessToken(user.id, "oauth_github");

      const octokit = getAuthGHClient(githubToken.data[0].token);

      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        visibility: "all",
      });

      repos = data;
    }
  }

  return (
    <ScrollArea className="sm:h-96">
      <div className="mr-3 space-y-3">
        {repos.length > 0 ? (
          repos?.map((repo, idx) => <RepoCard key={idx} repo={repo} />)
        ) : (
          <div className="flex flex-col gap-2">
            <p className="my-auto text-balance text-center text-slate-400">
              Connect your GitHub account to view your repositories
            </p>
            <Link className="w-fit self-center" href="/dashboard/profile">
              <Button>
                Go to Profile
                <ArrowUpRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export function GithubReposLoading() {
  return (
    <>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </>
  );
}
