"use client";

import { useRepoInfoMutation } from "@/lib/hooks";
import { useRepoInfoActions } from "@/lib/store";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

function ImportRepoButton({ owner, name }: { owner: string; name: string }) {
  const { setRepoInfo } = useRepoInfoActions();

  const { mutate } = useRepoInfoMutation({
    onSuccess: (data) => {
      setRepoInfo({
        name: data.name,
        owner: data.owner,
        size: data.numFiles,
        starCount: data.starCount,
        numFiles: data.numFiles,
      });
    },
  });

  function handleClick() {
    mutate({ repo: name, owner: owner });
  }

  return (
    <Button onClick={handleClick} size="sm" className="">
      <ArrowRight size={16} />
    </Button>
  );
}

export default ImportRepoButton;
