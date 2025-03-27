import { GithubRepos, GithubReposLoading } from "@/components/GithubRepoCard";
import { SupportPopover } from "@/components/SupportPopover";
import DeleteGenerationButton from "@/components/buttons/DeleteGenerationButton";
import SubmitLinkButton from "@/components/buttons/SubmitLinkButton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deleteGenerationAction } from "@/lib/actions";
import { fetchAllGenerationsForUser, fetchUserCredits } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import type { Generation } from "@sideproject-ai/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

function GenerationCard({ generation }: { generation: Generation }) {
  const date = new Date(generation.timestamp ?? Date.now());

  const deleteGenerationWithId = deleteGenerationAction.bind(null, generation.generationID);

  return (
    <Card className="flex w-full items-center justify-around bg-slate-100 p-4 py-2 sm:w-full dark:bg-gray-900">
      <Link prefetch={false} className="flex justify-between gap-2" href={`/dashboard/${generation?.generationID}`}>
        <div className="w-44 overflow-ellipsis">
          <p className="line-clamp-1 text-ellipsis font-medium text-sm tracking-tight sm:text-base">
            {generation?.repoName?.split("/")[1]}
          </p>
        </div>
      </Link>
      <div className="line-clamp-1 w-fit text-slate-400 text-sm">
        <p>{date.toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <DeleteGenerationButton deleteGenerationAction={deleteGenerationWithId} />
      </div>
    </Card>
  );
}
async function UserCredits() {
  const user = await currentUser();
  if (!user) return;
  const credits = await fetchUserCredits(user?.id);

  return (
    <p className="font-azeret text-muted-foreground">{credits === 1 ? `${credits} credit` : `${credits} credits`}</p>
  );
}

async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return;
  }

  if (user?.privateMetadata?.isOnboarded === false) {
    redirect("/onboarding");
  }

  const generations = await fetchAllGenerationsForUser(user?.id);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-slate-200 p-4 pt-0 dark:bg-gray-900">
      <Card className="mt-10 w-full sm:w-[450px] dark:bg-gray-800">
        <CardContent className="pt-4">
          <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid w-full grid-cols-2 dark:bg-gray-600">
              <TabsTrigger value="repo">Repo</TabsTrigger>
              <TabsTrigger value="link">Link</TabsTrigger>
            </TabsList>
            <TabsContent value="link">
              <SubmitLinkButton />
            </TabsContent>
            <TabsContent value="repos">
              <Suspense fallback={<GithubReposLoading />}>
                <GithubRepos />
              </Suspense>
            </TabsContent>
          </Tabs>
        </CardContent>
        {/* <CardHeader className="items-center justify-between sm:flex-row">
          <CardTitle className="p-2 sm:p-0">Generations</CardTitle>
          <Suspense fallback={<Skeleton className="h-4 w-20" />}>
            <UserCredits />
          </Suspense>
          <Link href="/dashboard/write"></Link>
        </CardHeader> */}
        {/* <Separator /> */}
        {/* <CardContent className="my-auto flex min-h-[50px] flex-col gap-2 overflow-x-scroll p-2">
          {generations?.length > 0 ? (
            generations.map((generation: any, index: number) => <GenerationCard key={index} generation={generation} />)
          ) : (
            <p className="text-center text-slate-400">No generations yet!</p>
          )}
        </CardContent> */}
      </Card>
      <SupportPopover />
    </div>
  );
}

export default DashboardPage;
