"use client";

import { useRepoInfoMutation } from "@/lib/hooks";
import { useRepoInfoActions } from "@/lib/store";
import { extractOwnerAndRepoAndPath } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SubmitLinkButton() {
  const [link, setLink] = useState<string>("");
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

  function handleChange(event: any) {
    setLink(event.target.value);
  }

  function handleClick() {
    const { owner, repo } = extractOwnerAndRepoAndPath(link.trim());
    mutate({ repo, owner });
  }

  return (
    <>
      <Input placeholder="Github Link" onChange={handleChange} className="w-full" />
      <Button onClick={handleClick} className="w-full">
        Submit
      </Button>
    </>
  );
}

export default SubmitLinkButton;
