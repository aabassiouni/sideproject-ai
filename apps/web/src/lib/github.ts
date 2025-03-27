import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import { Octokit } from "octokit";

const octokit = new Octokit();

export function getAuthGHClient(token: string) {
  return new Octokit({
    auth: token,
  });
}

export type ListForAuthenticatedUserType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.listForAuthenticatedUser
>;

export type GetTreeType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.git.getTree>;

export type GithubRepoType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listForAuthenticatedUser>;
