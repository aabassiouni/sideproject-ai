import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

function LandingNavbar() {
  return (
    <div className="rounded-b-md bg-slate-200 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-lg sm:text-xl">
          <Link className="font-azeret" href="/">
            sideprojectAI
          </Link>
        </div>
        <div className="hidden sm:block">
          <Link href="/signin">
            <Button className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900">Login</Button>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="sm:hidden" size={"sm"} variant={"ghost"}>
              <Menu size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={"/signin"}>
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
            <Link href={"#pricing"}>
              <DropdownMenuItem>Pricing</DropdownMenuItem>
            </Link>
            <Link href={"#faq"}>
              <DropdownMenuItem>FAQ</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default LandingNavbar;
