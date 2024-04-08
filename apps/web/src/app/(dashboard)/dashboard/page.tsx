import DeleteGenerationButton from "@/components/buttons/DeleteGenerationButton";
import StartWritingButton from "@/components/buttons/StartWritingButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllGenerationsForUser } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import type { Generation } from "@sideproject-ai/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 0;

function GenerationsCardLoading() {
  return (
    <Card className="mt-10 w-full sm:w-[650px]">
      <CardHeader className="space-y-4">
        <CardTitle>Generations</CardTitle>
        <Separator />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </CardHeader>
    </Card>
  );
}
function GenerationCard({ generation }: { generation: Generation }) {
  const date = new Date(generation.timestamp ?? Date.now());
  return (
    <Card className="flex w-full items-center justify-around bg-slate-100 p-4 py-2 sm:w-full dark:bg-gray-900">
      <Link className="flex justify-between gap-2" href={`/dashboard/${generation?.generationID}`}>
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
        <DeleteGenerationButton generationID={generation.generationID ?? "0"} />
      </div>
    </Card>
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
      <Suspense fallback={<GenerationsCardLoading />}>
        <Card className="mt-10 w-full sm:w-[650px] dark:bg-gray-800">
          <CardHeader className="items-center justify-between sm:flex-row">
            <CardTitle className="p-2 sm:p-0">Generations</CardTitle>
            <Link href="/dashboard/write">
              <StartWritingButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white dark:bg-gradient-to-r dark:from-blue-700 dark:to-indigo-800 dark:text-white" />
            </Link>
          </CardHeader>
          <Separator />
          <CardContent className="my-auto flex min-h-[50px] flex-col gap-2 overflow-x-scroll p-2">
            {generations?.length > 0 ? (
              generations.map((generation: any, index: number) => (
                <GenerationCard key={index} generation={generation} />
              ))
            ) : (
              <p className="text-center text-slate-400">No generations yet!</p>
            )}
            {/* </div> */}
          </CardContent>
          <CardFooter />
        </Card>
      </Suspense>
    </div>
  );
}

export default DashboardPage;
