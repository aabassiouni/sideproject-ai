"use client";
import React, { useEffect, useState } from "react";
import GithubIcon from "./icons/GithubIcon";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

import { useValues } from "./context/context";
import { Button } from "./ui/button";
import SparkleIcon from "./icons/SparkleIcon";
import GenerateButton from "./GenerateButton";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import KeywordInput from "./KeywordInput";
function RepoInfo() {
	const { selectedRepo } = useValues();
	const [title, setTitle] = useState<string>("");
	const [size, setSize] = useState<number>(0);
	const [starCount, setStarCount] = useState<number>(0);
	const [numFiles, setNumFiles] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [keywords, setKeywords] = useState<string[]>([]);
	const [description, setDescription] = useState<string>("");
	const [numLines, setNumLines] = useState<number>(0);

	console.log("selected repo is repo info is ", selectedRepo);

	useEffect(() => {
		// console.log(selectedRepo)
		async function fetchData() {
			setIsLoading(true);
			const response = await fetch(`/api/repo`, {
				// cache: 'no-store',
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					repo: selectedRepo.repo,
					owner: selectedRepo.owner,
				}),
			});
			const data = await response.json();
			setTitle(data.name);
			setSize(data.size);
			setStarCount(data.stargazers_count);
			setNumFiles(data.numFiles);
			setIsLoading(false);
			console.log(data);
		}
		if (selectedRepo.repo) {
			fetchData();
		}
	}, [selectedRepo]);

	// const repoSelected = true;
	// const
	if (isLoading) {
		return (
			<Card className="m-4 h-44">
				<CardHeader>
					{/* <CardTitle> */}
					{/* <GithubIcon className="inline-block mr-2" size={16} /> */}
					{/* {title ?? "N/A"} */}
					{/* </CardTitle> */}
					<Skeleton className="w-48 h-4" />
					<Skeleton className="w-28 h-4" />
					{/* <CardDescription> */}
					{/* {numFiles} files, {size}MB, {starCount} stars{" "} */}
					{/* </CardDescription> */}
				</CardHeader>
			</Card>
		);
	}

	return (
		
		<Card className="m-4 h-44">
			{selectedRepo.repo ? (
				<div className="flex">
					<div className="grow">
						<CardHeader>
							<CardTitle>
								<GithubIcon className="inline-block mr-2" size={16} />
								{title ?? "N/A"}
							</CardTitle>
							<CardDescription>
								{numFiles} files, {size}MB, {starCount} stars{" "}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<GenerateButton />
						</CardContent>
					</div>
					<Separator orientation="vertical" className="h-44" />
					<div className="grow">
						<CardHeader className="text-center">
							<CardTitle>
								{/* <GithubIcon className="inline-block mr-2" size={16} />
								{title ?? "N/A"} */}
								Optimize for Keywords:
							</CardTitle>
							<CardDescription>
								{/* {numFiles} files, {size}MB, {starCount} stars{" "} */}
								Input a comma separated list fo keywords to optimize for
							</CardDescription>
						</CardHeader>
						<CardContent>
							<KeywordInput keywords={keywords} setKeywords={setKeywords}/>
							{/* <GenerateButton /> */}
						</CardContent>
					</div>
				</div>
			) : (
				<div className="flex h-full justify-center items-center">
					<CardContent className="  flex justify-center items-center">
						<p className="text-slate-400">Pick a repo to start!</p>
					</CardContent>
				</div>
			)}
		</Card>
	);
}

export default RepoInfo;
