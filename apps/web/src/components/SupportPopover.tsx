import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HelpCircle } from "lucide-react";
import { Button } from "./ui/button";

export function SupportPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          className="fixed right-0 bottom-0 m-6 flex h-12 w-12 items-center justify-center rounded-full"
        >
          <HelpCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <div className="space-y-2 *:text-center">
          <h1 className="font-semibold text-lg">Submit feedback</h1>
          <p className="text-base">We'd love to hear from you!</p>
          <p className="text-sm">
            Head over to our feedback page to submit any features, bugs or anything else on your mind.
          </p>
        </div>
        <div className="p-4" />
        <div className="flex flex-col gap-2">
          <a rel="noreferrer" target="_blank" href="https://sideprojectai.feedbase.app/">
            <Button className="w-full">Submit feedback</Button>
          </a>
          <a href="mailto:usesideprojectai@gmail.com">
            <Button variant={"ghost"} className="w-full">
              Contact support
            </Button>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
