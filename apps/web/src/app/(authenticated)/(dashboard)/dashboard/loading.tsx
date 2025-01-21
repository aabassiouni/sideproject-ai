import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
function DashboardPageLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-slate-200 p-4 pt-0 dark:bg-gray-900">
      <Card className="mt-10 w-full sm:w-[650px] dark:bg-gray-800">
        <CardHeader className="items-center justify-between sm:flex-row">
          <CardTitle>Generations</CardTitle>
          <Skeleton className="flex h-10 min-w-[50px] px-4 py-2">
            <span className="invisible">start writing</span>
            <div className="ml-2 h-6 w-6" />
          </Skeleton>
        </CardHeader>
        <Separator />
        <CardContent className="my-auto flex min-h-[50px] flex-col gap-2 overflow-x-scroll p-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardPageLoading;
