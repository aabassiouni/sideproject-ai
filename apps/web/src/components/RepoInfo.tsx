"use client";

import { useRepoInfo } from "@/lib/store";
import { useIsMutating } from "@tanstack/react-query";
import GenerateButton from "./buttons/GenerateButton";
import GithubIcon from "./icons/GithubIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function RepoInfo() {
  const { repoInfo } = useRepoInfo();
  const isLoading = useIsMutating({
    mutationKey: ["repoInfo"],
  });

  return (
    <Card className="w-80 sm:h-full dark:bg-gray-800">
      <div className="flex flex-col justify-center sm:flex-row">
        {isLoading ? (
          <div className="sm:basis-1/3">
            <CardHeader className="h-40">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-28" />
            </CardHeader>
          </div>
        ) : (
          <></>
        )}
        {repoInfo && !isLoading ? (
          <>
            {/* add basis back when keywords is added*/}
            <div className="basi-1/3">
              <CardHeader>
                <CardTitle className="text-center text-lg sm:text-left">
                  <GithubIcon className="mr-2 inline-block text-center sm:text-left" size={16} />
                  {`${repoInfo?.owner}/${repoInfo.name}` ?? "N/A"}
                </CardTitle>
                <CardDescription className="mx-auto text-center sm:text-left">
                  {repoInfo?.numFiles} files, {repoInfo?.size}MB, {repoInfo?.starCount} stars{" "}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <GenerateButton />
              </CardContent>
            </div>
          </>
        ) : (
          !isLoading && (
            <div className="flex min-h-fit items-center justify-center sm:h-full sm:grow">
              <CardContent className="flex h-44 items-center justify-center">
                <p className="text-slate-400">Pick a repo to start!</p>
              </CardContent>
            </div>
          )
        )}
        {/* <Separator orientation="vertical" className="hidden sm:block" /> */}
        {/* <Separator orientation="horizontal" className="w-full sm:hidden" /> */}
        {/* <div className="basis-2/3 ">
            <CardHeader className="text-center">
                <CardTitle>Optimize for Keywords:</CardTitle>
                <CardDescription>Input a comma separated list for keywords to optimize for <br />( Max 5 keywords. )</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col sm:flex-row items-center justify-between'>
                <KeywordInput />
                <div className="grid grid-cols-5 w-full gap-2 rounded-xl p-2 h-11 m-2 bg-slate-200 justify-center   ">
                    {keywords.map((keyword, index) => {
                        console.log('keyword is ', keyword)
                        return (
                            <div key={index} className="flex text-sm border w-fit p-1 px-2 rounded-lg border-slate-400 items-center gap-2">
                                <p className="text-xs text-center ">{keyword}</p>
                                
                                <KeywordDeleteButton currKeyword= {keyword} />
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </div> */}
      </div>
    </Card>
  );
}

export default RepoInfo;
