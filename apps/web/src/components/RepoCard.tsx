import { ArrowRightIcon,  } from "lucide-react";
import { Button } from "./ui/button";
import ImportRepoButton from "./buttons/ImportRepoButton";
import GithubIcon from "./icons/GithubIcon";
import { GithubRepoType } from "@/types";

export default function RepoCard({repo}: {repo: GithubRepoType[0]}) {
	return (
		<div className="rounded-xl p-2 border dark:border-gray-600 flex items-center">
			<div className="grow">
				<p className="leading-7 [&:not(:first-child)]:mt-6 tracking-tight text-sm font-medium ">
					<GithubIcon className="inline-block mr-2" size={16} />
					{/* aabassiouni/repo-1 */}
                    {repo.full_name}
				</p>
			</div>
			<ImportRepoButton owner={repo.owner} name={repo.name} url={repo.html_url}/>
		</div>
	);
}
