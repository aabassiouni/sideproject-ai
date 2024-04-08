import type { GithubRepoType } from "@/types";
import ImportRepoButton from "./buttons/ImportRepoButton";
import GithubIcon from "./icons/GithubIcon";

export default function RepoCard({ repo }: { repo: GithubRepoType[0] }) {
  return (
    <div className="flex items-center rounded-xl border p-2 dark:border-gray-600">
      <div className="grow">
        <p className="font-medium text-sm leading-7 tracking-tight [&:not(:first-child)]:mt-6">
          <GithubIcon className="mr-2 inline-block" size={16} />
          {repo.full_name}
        </p>
      </div>
      <ImportRepoButton owner={repo.owner} name={repo.name} url={repo.html_url} />
    </div>
  );
}
