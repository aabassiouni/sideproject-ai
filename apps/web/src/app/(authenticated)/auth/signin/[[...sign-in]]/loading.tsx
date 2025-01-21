import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-slate-200">
      <h1 className="font-azeret font-bold text-2xl">sideprojectAI</h1>
      <Skeleton className="h-1/4 w-1/4" />
    </div>
  );
}

export default Loading;
