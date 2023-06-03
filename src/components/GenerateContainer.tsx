'use client';

import React, { useState } from "react";
import GithubRepoCard from "./GithubRepoCard";
import Generation from "./Generation";

function GenerateContainer() {
    const [response, setResponse] = useState<Response>();
    
	return (
		<>
			{/* <GithubRepoCard /> */}
			<Generation />
		</>
	);
}

export default GenerateContainer;
