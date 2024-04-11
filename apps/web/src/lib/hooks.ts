import type { Generation } from "@/types";
import { useMutation } from "@tanstack/react-query";

type RepoResponse = {
  name: string;
  owner: string;
  size: string;
  starCount: number;
  numFiles: number;
};

type GenerateParams = {
  sstToken: string;
  repo: string;
  owner: string;
  keywords: string[];
};

export function useRepoInfoMutation({
  onError,
  onSuccess,
}: { onError?: (error: any) => void; onSuccess?: (data: RepoResponse) => void }) {
  return useMutation<RepoResponse, unknown, { repo: string; owner: string }>({
    mutationKey: ["repoInfo"],
    mutationFn: async ({ repo, owner }: { repo: string; owner: string }) => {
      return await fetch("/api/repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo,
          owner,
        }),
      }).then(async (res) => (res.ok ? res.json() : Promise.reject(await res.json())));
    },
    onError: (error) => {
      onError?.(error);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
}

export function useGenerateMutation({
  onError,
  onSuccess,
}: { onError?: (error: any) => void; onSuccess?: (data: Generation) => void }) {
  return useMutation<Generation, unknown, GenerateParams>({
    mutationKey: ["generation"],
    mutationFn: async ({ sstToken, repo, owner, keywords }: GenerateParams) => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sstToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo,
          owner,
          keywords,
        }),
      }).then(async (res) => (res.ok ? res.json() : Promise.reject(await res.json())));
    },
    onError(error) {
      onError?.(error);
    },
    onSuccess(data) {
      onSuccess?.(data);
    },
  });
}
