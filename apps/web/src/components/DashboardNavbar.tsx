import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

async function UserButton() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-56" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{user?.username}</p>
            <p className="text-muted-foreground text-xs leading-none">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/dashboard/profile"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/purchase"}>
            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Credits
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <SignOutButton>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DashboardNavbar() {
  return (
    <div className="relative z-10 bg-slate-200 px-2 py-4 shadow-md dark:bg-gray-900 sm:p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-lg sm:text-xl">
          <Link className="font-azeret" href="/dashboard" replace>
            sideprojectAI
          </Link>
          <Badge className="ml-2 bg-slate-800">Beta</Badge>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
            <UserButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
