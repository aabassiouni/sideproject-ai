"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Loader2, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { startTransition, useState } from "react";
import { Button } from "../ui/button";

function DeleteGenerationButton({
  className,
  deleteGenerationAction,
}: { className?: string; deleteGenerationAction: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setIsEditing(true);

    await deleteGenerationAction();

    setIsEditing(false);
    setIsOpen(false);

    startTransition(() => {
      if (pathname !== "/dashboard") {
        router.refresh();
        router.replace("/dashboard");
      }
    });
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button type="button" size={"sm"} className={cn(className)} disabled={isEditing} variant={"destructive"}>
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently delete the generation!</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            className="bg-red-600 text-slate-50 dark:bg-red-900 dark:hover:bg-red-900/90 hover:bg-red-600/90 dark:text-slate-50"
          >
            {isEditing ? <Loader2 className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteGenerationButton;
