"use client";

import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useValues } from "../context/context";
import SparkleIcon from "../icons/SparkleIcon";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

function GenerateButton() {
  const { selectedRepo, setGeneration, keywords } = useValues();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { getToken } = useAuth();

  async function handleClick() {
    setIsLoading(true);
    const sstToken = await getToken({
      template: "sst-test",
    });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sstToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo: selectedRepo.repo,
          url: selectedRepo.url,
          owner: selectedRepo.owner,
          keywords: keywords,
        }),
      });

      const data = await response.json();

      if (data?.error === "not enough credits") {
        toast({
          variant: "destructive",
          title: "No Credits!",
          description: "You need to buy more credits to generate more bullets.",
        });

        setIsLoading(false);
      } else if (data?.error === "error during generation") {
        toast({
          variant: "destructive",
          title: "Error Generating Bullets!",
          description: "There was an error generating bullets. Please try again.",
        });
        setIsLoading(false);
      } else if (data?.error === "not enough information") {
        toast({
          variant: "destructive",
          title: "Not Enough Information!",
          description: "This repo doesn't have enough code to generate bullet points. Please choose a different repo",
        });

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setGeneration(data);
      }

      router.refresh();
    } catch {
      setIsLoading(false);
    }
  }
  return (
    <Button
      size={"lg"}
      onClick={handleClick}
      disabled={isLoading}
      className="flex w-40 flex-col bg-gradient-to-r from-cyan-500 to-blue-500 dark:bg-gradient-to-r dark:from-blue-700 dark:to-indigo-800"
    >
      {!isLoading ? (
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
