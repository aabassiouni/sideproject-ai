// 'use client'

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import type React from "react";
import SubmitLinkButton from "./buttons/SubmitLinkButton";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
// import FileTree from './FileTree'

function GithubRepoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-10 hidden max-w-sm flex-col items-center overflow-x-hidden rounded-xl bg-white px-6 py-3 sm:flex sm:min-h-screen sm:min-w-[400px] sm:rounded-none sm:rounded-tr-xl dark:bg-gray-800">
      <Link className="self-start" href={"/dashboard"}>
        <Button variant={"link"} size={"sm"} className="">
          <ArrowLeftCircle size={16} />
        </Button>
      </Link>
      <CardHeader className="pt-2">
        <CardTitle>Choose a repo!</CardTitle>
        <CardDescription>
          Choose a repo from your Github account to import into SideprojectAI or enter a GitHub link
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="repo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 dark:bg-gray-600">
          <TabsTrigger value="link">Link</TabsTrigger>
          <TabsTrigger value="repo">Repo</TabsTrigger>
        </TabsList>
        <TabsContent value="link">
          <div className="space-y-2">
            <SubmitLinkButton />
          </div>
        </TabsContent>
        <TabsContent value="repo">{children}</TabsContent>
      </Tabs>
      <Separator className="mx-0 my-3 mt-2" />
    </div>
  );
}

export default GithubRepoCard;
