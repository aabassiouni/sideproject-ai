import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-slate-200 px-4 dark:bg-gray-900">
      <div className="mt-10 flex flex-col items-center sm:flex-row">
        <Link className="hidden sm:block" href={"/dashboard"}>
          <Button variant={"ghost"} className="m-4 rounded-xl">
            <ArrowLeftCircle size={24} />
          </Button>
        </Link>
        <Card className="flex h-24 w-full flex-col p-2 sm:w-[550px] dark:bg-gray-800">
          <CardContent className="flex h-full items-center gap-4 self-center">
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>
      </div>
      <Card className="relative mt-2 h-full sm:w-[850px] dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Generated Text</CardTitle>
        </CardHeader>
        <div className="flex h-full grow items-center justify-center">
          <CardContent className="w-full">
            <div className="h-full w-full space-y-2 rounded-md bg-slate-100 p-2 text-lg dark:bg-gray-900 sm:p-10">
              <Skeleton className="h-4 w-24" />
              <Separator />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Loading;
