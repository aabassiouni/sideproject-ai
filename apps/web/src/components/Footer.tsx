import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg p-24">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between">
        <div className="space-y-4">
          <div className="font-bold text-base sm:text-xl">
            <p className="font-azeret">sideprojectAI</p>
          </div>
          <div className="flex gap-2">
            <Link href={"https://github.com/aabassiouni/sideproject-ai"}>
              <GitHubLogoIcon className="h-6 w-6 text-black" />
            </Link>
            <Link href={"https://twitter.com/alibassiouni"}>
              <svg width="24" height="24" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                  fill="black"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-neutral-500">©2024 Entrybase. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href={"/privacy"}>
              <p className="cursor-pointer text-neutral-500">Privacy Policy</p>
            </Link>
            <Link href={"/terms"}>
              <p className="cursor-pointer text-neutral-500">Terms of Service</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
