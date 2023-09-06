import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

function LandingNavbar() {
    return (
        <div className="rounded-b-md bg-slate-200  p-4 ">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-base font-bold sm:text-xl">
                    <Link className="font-necto" href="/">
                        sideproject.ai
                    </Link>
                </div>

                {/* <div className="hidden space-x-4 sm:flex">
                    <Link href="/pricing">
                        <p className="text-gray-700 hover:text-black">Pricing</p>
                    </Link>
                    <Link href="/details">
                        <p className="text-gray-700 hover:text-black">FAQ</p>
                    </Link>
                </div> */}

                <div className="hidden sm:block">
                    <Link href="/signin">
                        <Button className="rounded-lg bg-gray-800 px-4  py-2 text-white hover:bg-gray-900">
                            {/* <GithubIcon className="inline-block mr-2" size={16} /> */}
                            Login
                        </Button>
                    </Link>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="sm:hidden" size={'sm'} variant={'ghost'}>
                            <Menu size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                        {/* <DropdownMenuSeparator /> */}
                        <Link href={'/signin'}>
                            <DropdownMenuItem>Login</DropdownMenuItem>
                        </Link>
                        <Link href={'/pricing'}>
                            <DropdownMenuItem>Pricing</DropdownMenuItem>
                        </Link>
                        <Link href={'/faq'}>
                            <DropdownMenuItem>FAQ</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default LandingNavbar
