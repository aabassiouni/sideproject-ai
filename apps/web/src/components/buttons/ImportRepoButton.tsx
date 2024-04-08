"use client";

import type { GithubOwnerType } from "@/types";
import { ArrowRight } from "lucide-react";
import { useValues } from "../context/context";
import { Button } from "../ui/button";
function ImportRepoButton({ owner, name, url }: { owner: GithubOwnerType; name: string; url: string }) {
  const { setSelectedRepo } = useValues();

  function handleClick() {
    console.log(`Importing Repo: ${owner}/${name}`);
    setSelectedRepo({ owner: owner.login, repo: name, path: "", url: url });
  }
  return (
    <Button onClick={handleClick} size="sm" className="">
      <ArrowRight size={16} />
    </Button>
  );
}

export default ImportRepoButton;
