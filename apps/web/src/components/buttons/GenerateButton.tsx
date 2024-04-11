"use client";

import { useGenerateMutation } from "@/lib/hooks";
import { useGenerationActions, useRepoInfo } from "@/lib/store";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import SparkleIcon from "../icons/SparkleIcon";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

function GenerateButton() {
  const { repoInfo } = useRepoInfo();
  const { setGeneration } = useGenerationActions();
  const { toast } = useToast();
  const { getToken } = useAuth();

  const { mutate, isPending } = useGenerateMutation({
    onSuccess: (data) => {
      setGeneration(data);
    },
    onError: (error) => {
      if (error?.error === "not enough credits") {
        toast({
          variant: "destructive",
          title: "No Credits!",
          description: "You need to buy more credits to generate more bullets.",
        });
      } else if (error?.error === "error during generation") {
        toast({
          variant: "destructive",
          title: "Error Generating Bullets!",
          description: "There was an error generating bullets. Please try again.",
        });
      } else if (error?.error === "not enough information") {
        toast({
          variant: "destructive",
          title: "Not Enough Information!",
          description: "This repo doesn't have enough code to generate bullet points. Please choose a different repo",
        });
      }
    },
  });

  async function handleClick() {
    const sstToken = await getToken({
      template: "sst-test",
    });

    if (!sstToken || !repoInfo) {
      return;
    }

    mutate({
      sstToken,
      repo: repoInfo.name,
      owner: repoInfo.owner,
      keywords: [],
    });
  }

  return (
    <Button
      size={"lg"}
      onClick={handleClick}
      disabled={isPending}
      className="flex w-40 flex-col bg-gradient-to-r from-cyan-500 to-blue-500 dark:bg-gradient-to-r dark:from-blue-700 dark:to-indigo-800"
    >
      {!isPending ? (
        <>
          <span className="text-white leading-none">
            Generate
            <SparkleIcon className="ml-2 inline-block" />
          </span>
        </>
      ) : (
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      )}
    </Button>
  );
}

export default GenerateButton;
