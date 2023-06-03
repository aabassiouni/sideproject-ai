import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";


export default async function Home() {

	return (
		<>
			<div className=" h-96 gap-5 flex flex-col justify-center items-center p-4">
				<p className=" text-center font-extrabold text-5xl">
					Focus on Building.
					<br /> Let AI Craft Your Portfolio.
				</p>
				<Button size="lg" className="text-lg mt-4">Get Started!</Button>
			</div>
			{/* <div>
				<div className="flex flex-col justify-center items-center">
					<p className="text-center font-extrabold text-5xl">
						How it Works
					</p>
					<div className="flex flex-col justify-center items-center">
						<div className="flex flex-row justify-center items-center">

							<div className="flex flex-col justify-center items-center">
								<Image
									src="/images/1.svg"
									alt="Picture of the author"
									width={200}
									height={200}
								/>
								<p className="text-center font-extrabold text-2xl">
									1. Connect Your Github
								</p>
								
			</div> */}
		</>
	);
}
