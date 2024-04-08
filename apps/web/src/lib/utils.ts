import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractOwnerAndRepoAndPath(url: string): {
  owner: string;
  repo: string;
  path: string;
} {
  const match = url.match(/(?:https?:\/\/)?github.com\/([^/]+)\/([^/]+)(\/tree\/[^/]+\/(.+))?/i);

  if (!match) {
    throw new Error("Invalid GitHub URL format.");
  }

  return { owner: match[1], repo: match[2], path: match[4] || "" };
}
