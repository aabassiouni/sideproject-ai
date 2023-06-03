'use client';

import React from "react";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { GithubOwnerType } from "@/types";
import { useValues } from "./context/context";
function ImportRepoButton({ owner, name, url }: { owner: GithubOwnerType; name: string, url: string}) {
	
	const { setSelectedRepo } = useValues();
	
	function handleClick(event: any) {
		// event.preventDefault();
		console.log("Importing Repo: " + owner + "/" + name);
		setSelectedRepo({ owner: owner.login, repo: name, path: "", url: url });
	}
	return (
		<Button onClick={handleClick} size="sm" className="">
			<ArrowRightIcon size={16} />
		</Button>
	);
}

export default ImportRepoButton;
