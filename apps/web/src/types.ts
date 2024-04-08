import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import { Octokit } from "octokit";
const octokit = new Octokit();

export type ListForAuthenticatedUserType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.listForAuthenticatedUser
>;
export type GetTreeType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.git.getTree>;

export type GithubRepoType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listForAuthenticatedUser>;

export type GithubOwnerType = {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
};

export type SelectedRepo = {
  owner: string;
  repo: string;
  path: string;
  url: string;
};
