import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import { Octokit } from "octokit";
const octokit = new Octokit();

export type ListForAuthenticatedUserType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.listForAuthenticatedUser
>;
export type GetTreeType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.git.getTree>;

export type GithubRepoType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listForAuthenticatedUser>;

export type Generation = { id: string; name: string; bullets: string[] } | null;

export type SelectedRepo = {
  owner: string;
  repo: string;
  path: string;
  url: string;
};
