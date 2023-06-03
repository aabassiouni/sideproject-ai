import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { Suspense, useState } from "react";
import {
	Configuration,
	CreateCompletionResponse,
	CreateCompletionResponseChoicesInner,
	OpenAIApi,
} from "openai";
import { Button } from "@/components/ui/button";
import Generation from "@/components/Generation";
import { auth } from "@clerk/nextjs";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { Octokit } from "octokit";
import clerk from "@clerk/clerk-sdk-node";
import GithubRepoCard from "@/components/GithubRepoCard";
import Navbar from "@/components/Navbar";

export default async function Home() {
	// const user = await currentUser();
	// console.log("user", user);
	// const { userId, getToken } = auth();
	// const user = await currentUser();
	// console.log(user);
	// const token = await getToken();
	// console.log(token);

	// let repos;
	// if (userId) {
	// 	const githubToken = await clerk.users.getUserOauthAccessToken(
	// 		userId,
	// 		"oauth_github"
	// 	);
	// 	const test = await fetch("https://api.github.com/user/repos", {
	// 		headers: {
	// 			Authorization: `token ${githubToken[0].token}`,
	// 		},
	// 	});

	// 	// console.log(test.json());
	// 	const res = await test.json();
	// 	console.log(res);

	// 	const octokit = new Octokit({
	// 		auth: githubToken[0].token,
	// 	});
	// 	console.log("token", githubToken[0].token);
	// 	const { data } = await octokit.rest.repos.listForAuthenticatedUser({
	// 		type: "private",
	// 	});
	// 	repos = data;
	// 	console.log(repos);
	// }

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
