import type { Generation } from "@/types";
import { create } from "zustand";

type RepoInfo = {
  name: string;
  owner: string;
  size: number;
  starCount: number;
  numFiles: number;
};

interface RepoStore {
  repoInfo: RepoInfo | null;
  isLoading: boolean;
  actions: {
    setRepoInfo: (repoInfo: RepoInfo | null) => void;
  };
}

const useRepoInfoStore = create<RepoStore>((set) => ({
  repoInfo: null,
  isLoading: false,
  actions: {
    setRepoInfo: (repoInfo) => set({ repoInfo }),
  },
}));

const useGenerationStore = create<{
  generation: Generation | null;
  actions: {
    setGeneration: (generation: Generation) => void;
  };
}>((set) => ({
  generation: null,
  actions: {
    setGeneration: (generation) => set({ generation }),
  },
}));

export const useRepoInfo = () =>
  useRepoInfoStore((state) => {
    return { repoInfo: state.repoInfo, isLoading: state.isLoading };
  });
export const useRepoInfoActions = () => useRepoInfoStore((state) => state.actions);

export const useGeneration = () => useGenerationStore((state) => state.generation);
export const useGenerationActions = () => useGenerationStore((state) => state.actions);
