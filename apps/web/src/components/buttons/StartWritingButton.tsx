"use client";

import { useRepoInfoActions } from "@/lib/store";
import SparkleIcon from "../icons/SparkleIcon";
import { Button } from "../ui/button";

function StartWritingButton({ className }: { className?: string }) {
  const { setRepoInfo } = useRepoInfoActions();

  function handleClick() {
    setRepoInfo(null);
  }

  return (
    <Button className={className} onClick={handleClick}>
      Start Writing{" "}
      <span className="ml-2">
        <SparkleIcon />
      </span>
    </Button>
  );
}

export default StartWritingButton;
