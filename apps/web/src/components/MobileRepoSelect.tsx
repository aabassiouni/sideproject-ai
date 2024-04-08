import { Link as LinkIcon } from "lucide-react";
import type React from "react";
import SubmitLinkButton from "./buttons/SubmitLinkButton";
import GithubIcon from "./icons/GithubIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function MobileRepoSelect({ children }: { children: React.ReactNode }) {
  return (
    <Card className="m-4 my-2 flex h-fit min-h-44 flex-col items-center py-3 sm:hidden">
      <Tabs defaultValue="select" className="flex flex-col items-center">
        <TabsList className="mx-auto">
          <TabsTrigger className="" value="input">
            <LinkIcon className="" size={16} />
          </TabsTrigger>
          <TabsTrigger value="select">
            <GithubIcon />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <CardHeader className="pt-2">
            <CardTitle>Choose a repo!</CardTitle>
            <CardDescription>
              Choose a repo from your Github account to import into SideprojectAI or enter a GitHub link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SubmitLinkButton />
          </CardContent>
        </TabsContent>
        <TabsContent value="select" className="">
          <CardContent className="space-y-2">{children}</CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default MobileRepoSelect;
