import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
// import { auth } from "@clerk/nextjs";
import { GithubIcon } from "lucide-react";

function Navbar() {
	// const { userId } = auth();
	return (
		// <div className="flex bg-white justify-evenly items-center rounded-b-2xl h-14">
		// 	<div>
		// 		<p>sideproject.ai</p>
		// 	</div>
		// 	<div className="flex gap-4">
		// 		<p>Pricing</p>
		// 		<p>FAQ</p>
		// 	</div>
		// 	<div className="gap-2 flex ">
		// 		{/* <Button className="bg-indigo-500 text-white">Sign Up</Button> */}
		//         {userId}
		// 		<Link href="/signin">
		// 			<Button className="bg-indigo-500 text-white">Log In</Button>
		// 		</Link>
		// 	</div>
		// </div>
		<div className="bg-white p-4 rounded-b-md shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-xl font-bold">
					<Link href="/">Sideproject.ai</Link>
				</div>

				<div className="flex space-x-4">
					<Link href="/pricing">
						<p className="text-gray-700 hover:text-black">Pricing</p>
					</Link>
					<Link href="/details">
						<p className="text-gray-700 hover:text-black">Details</p>
					</Link>
				</div>

				<div>
					<Link href="/signin">
						<Button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
							<GithubIcon className="inline-block mr-2" size={16} />
							Login with GitHub
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
