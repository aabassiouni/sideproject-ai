"use client";

import React from "react";
import { Button } from "../ui/button";
import SparkleIcon from "../icons/SparkleIcon";
import { useValues } from "../context/context";

function GenerateButton() {
	const { selectedRepo, generation, setGeneration, keywords } = useValues();

	async function handleClick(event: any) {
		// event.preventDefault();
		console.log("Generating");

		const response = await fetch(`/api/generate`, {
			// cache: 'no-store',
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				repo: selectedRepo.repo,
				url: selectedRepo.url,
				owner: selectedRepo.owner,
				keywords: keywords,
			}),
		});
		const { bullets } = await response.json();
		console.log(bullets);
		setGeneration(bullets);
	}
	return (

		<Button size={"lg"} onClick={handleClick} className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col w-40">
			<span className="leading-none">
				Generate
				<SparkleIcon className="inline-block ml-2" />
			</span>
            <span className="leading-none text-xs">(1 credit)</span>
		</Button>
	);
}

export default GenerateButton;
