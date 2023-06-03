"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { GithubIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import SubmitLinkButton from "./SubmitLinkButton";

function RepoCard() {
	return (
		<div className="rounded-xl p-2 border flex items-center">
			<div className="grow">
				<p className="leading-7 [&:not(:first-child)]:mt-6 tracking-tight text-sm font-medium ">
					<GithubIcon className="inline-block mr-2" size={16} />
					aabassiouni/repo-1
				</p>
			</div>
			<Button size="sm" className="">
				<ArrowRightIcon size={16} />
			</Button>
		</div>
	);
}
function GithubRepoCard({ children }: { children: React.ReactNode }) {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		setIsSubmitted(true);
	};

	const variants = {
		hidden: { x: "0%" },
		show: { x: "-100%" },
	};

	return (
		<div className="bg-white p-6 max-w-sm max-h-screen overflow-x-hidden rounded-tr-xl">
			<CardHeader>
				<CardTitle>Choose a repo!</CardTitle>
				<CardDescription>
					Choose a repo from your Github account to import into sideproject.ai
					or input a github a link
				</CardDescription>
			</CardHeader>
			<div className="space-y-2">
				<SubmitLinkButton />
				<Separator />
				{children}
			</div>
		</div>
	// <Card className="max-w-sm max-h-screen overflow-x-hidden">
	// 	{/* <motion.div
	// 		variants={variants}
	// 		initial="hidden"
	// 		animate={isSubmitted ? "show" : "hidden"}
	// 		transition={{ duration: 1 }}> */}
	// 	<CardHeader>
	// 		<CardTitle>Choose a repo!</CardTitle>
	// 		<CardDescription>
	// 			Choose a repo from your Github account to import into sideproject.ai
	// 			or input a github a link
	// 		</CardDescription>
	// 	</CardHeader>
	// 	<CardContent className="space-y-2">
	// 		<Input placeholder="Github Link" className="w-full" />
	// 		<Button onClick={handleSubmit} className="w-full">
	// 			Submit
	// 		</Button>
	// 		<Separator />
	// 		{children}
	// 	</CardContent>
	// 	{/* </motion.div> */}
	// </Card>
	);
}

export default GithubRepoCard;
