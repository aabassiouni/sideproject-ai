import BuyButton from "@/components/buttons/BuyButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

async function PurchasePage() {
  const oneCredit = process.env.ONE_CREDIT!;
  const threeCredits = process.env.THREE_CREDITS!;

  return (
    <div className="flex min-h-screen flex-col bg-slate-200 dark:bg-gray-900">
      <div className="py-10">
        <h1 className="text-center font-bold text-4xl">Purchase Credits</h1>
        <p className="text-center text-xl">Select the amount of credits you would like to purchase.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        <Card className="mx-3 flex min-h-[350px] w-full min-w-[350px] flex-col border-2 border-blue-400 sm:w-64">
          <CardHeader>
            <CardTitle className="text-center text-2xl">1 credit</CardTitle>
            <CardTitle className="pb-2 text-center font-bold text-6xl">$3</CardTitle>
            <Badge className="invisible my-5 w-max self-center">Recommended</Badge>
          </CardHeader>
          <CardContent className="grow">
            <div className="flex justify-center gap-2">
              <CheckCircle2 />
              Great to try out!
            </div>
          </CardContent>
          <CardFooter>
            <BuyButton item={oneCredit} />
          </CardFooter>
        </Card>
        <Card className="mx-3 flex min-h-[350px] w-full min-w-[350px] flex-col border-2 border-blue-400 sm:w-64">
          <CardHeader>
            <CardTitle className="text-center text-2xl">3 Credits</CardTitle>
            <CardTitle className="pb-2 text-center font-bold text-6xl">$5</CardTitle>
            <Badge className="my-5 w-max self-center bg-blue-500 dark:bg-blue-700 dark:text-white">Save $4!</Badge>
          </CardHeader>
          <CardContent className="grow">
            <div className="flex justify-center gap-2">
              <CheckCircle2 />
              Perfect for developers with multiple projects
            </div>
          </CardContent>
          <CardFooter>
            <BuyButton item={threeCredits} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default PurchasePage;
