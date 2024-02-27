"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useValues } from "../context/context";
import { extractOwnerAndRepoAndPath } from "@/lib/utils";
function SubmitLinkButton() {

    const [link, setLink] = useState<string>("");
    const { setSelectedRepo } = useValues();

    function handleChange(event: any) {
        setLink(event.target.value);
    }

    function handleClick(event: any) {
        const { owner, repo, path } = extractOwnerAndRepoAndPath(link.trim());

        setSelectedRepo({ owner, repo, path, url: link.trim() });
    }

	return (
		<>
			<Input placeholder="Github Link" onChange={handleChange} className="w-full" />
			<Button onClick={handleClick} className="w-full">
				Submit
			</Button>
		</>
	);
}

export default SubmitLinkButton;
