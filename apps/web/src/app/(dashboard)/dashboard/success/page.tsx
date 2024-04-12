import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function SuccessPage() {
  return (
    <div className="flex w-full flex-col overflow-y-scroll bg-slate-200 dark:bg-gray-900">
      <Card className="mx-auto my-4 w-full max-w-lg flex-1">
        <div className="absolute left-1/2">{/* {render && <Confetti stageWidth={1000} />} */}</div>
        <CardHeader>
          <CardTitle className="text-center text-2xl">🎉 Your credits have been added! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-center font-medium text-xl">Your credits have been added to your account successfully.</p>
          <p className="text-center">Click the button below to create a resume section for your GitHub repository.</p>
          <Link className="w-full" href={"/dashboard"}>
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default SuccessPage;
