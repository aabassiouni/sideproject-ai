import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex h-screen flex-col bg-slate-200 sm:flex-row dark:bg-gray-900">
      <Card className="m-4 my-2 flex h-fit min-h-44 flex-col items-center gap-2 p-3 py-3 pt-11 sm:hidden dark:bg-gray-800">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </Card>
      <div className="z-10 hidden max-w-sm flex-col items-center space-y-1.5 overflow-x-hidden rounded-xl bg-white px-6 py-5 sm:flex sm:max-h-screen sm:min-w-[400px] sm:rounded-none sm:rounded-tr-xl dark:bg-gray-800">
        <Skeleton className="h-36 w-full dark:bg-slate-600" />
        <Skeleton className="h-96 w-full dark:bg-slate-600" />
      </div>
      <div className="flex grow flex-col">
        <div className="m-4 mx-auto my-2 basis-1/4">
          <Card className="w-80 sm:h-full dark:bg-gray-800">
            <div className="flex flex-col justify-center sm:flex-row">
              <div className="sm:basis-1/3">
                <CardHeader className="flex h-44 items-center justify-center">
                  <Skeleton className="h-4 w-44" />
                </CardHeader>
              </div>
            </div>
          </Card>
        </div>
        <Card className="m-4 mt-2 flex h-full items-center justify-center sm:min-w-0 dark:bg-gray-800">
          <Skeleton className="h-4 w-44" />
        </Card>
      </div>
    </div>
  );
}

export default Loading;
