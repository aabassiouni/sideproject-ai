'use client'
import React, { useEffect, useState } from 'react'
import GithubIcon from './icons/GithubIcon'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

import { useValues } from './context/context'
import { Button } from './ui/button'
import SparkleIcon from './icons/SparkleIcon'
import GenerateButton from './GenerateButton'
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import KeywordInput from './KeywordInput'
function RepoInfo() {
    const { selectedRepo } = useValues()
    const [title, setTitle] = useState<string>('')
    const [size, setSize] = useState<number>(0)
    const [starCount, setStarCount] = useState<number>(0)
    const [numFiles, setNumFiles] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [keywords, setKeywords] = useState<string[]>([])
    const [description, setDescription] = useState<string>('')
    const [numLines, setNumLines] = useState<number>(0)

    console.log('selected repo is repo info is ', selectedRepo)

    useEffect(() => {
        // console.log(selectedRepo)
        async function fetchData() {
            setIsLoading(true)
            const response = await fetch(`/api/repo`, {
                // cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    repo: selectedRepo.repo,
                    owner: selectedRepo.owner,
                }),
            })
            const data = await response.json()
            setTitle(data.name)
            setSize(data.size)
            setStarCount(data.stargazers_count)
            setNumFiles(data.numFiles)
            setIsLoading(false)
            console.log(data)
        }
        if (selectedRepo.repo) {
            fetchData()
        }
    }, [selectedRepo])

    // const repoSelected = true;
    // const
    // if (isLoading) {
    //     return (
    //         <Card className="m-4 h-44">
    //             <CardHeader>
    //                 {/* <CardTitle> */}
    //                 {/* <GithubIcon className="inline-block mr-2" size={16} /> */}
    //                 {/* {title ?? "N/A"} */}
    //                 {/* </CardTitle> */}
    //                 <Skeleton className="h-4 w-48" />
    //                 <Skeleton className="h-4 w-28" />
    //                 {/* <CardDescription> */}
    //                 {/* {numFiles} files, {size}MB, {starCount} stars{" "} */}
    //                 {/* </CardDescription> */}
    //             </CardHeader>
    //         </Card>
    //     )
    // }

    return (
        <Card className="sm:h-44 ">
            <div className="flex flex-col sm:flex-row">
                {isLoading ? (
                    // <Card className="m-4 h-40">
                        <CardHeader className='h-40'>
                            {/* <CardTitle> */}
                            {/* <GithubIcon className="inline-block mr-2" size={16} /> */}
                            {/* {title ?? "N/A"} */}
                            {/* </CardTitle> */}
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-28" />
                            {/* <CardDescription> */}
                            {/* {numFiles} files, {size}MB, {starCount} stars{" "} */}
                            {/* </CardDescription> */}
                        </CardHeader>
                    // </Card>
                ) : (
                    <></>
                )}
                {selectedRepo.repo && !isLoading ? (
                    <>
                        <div className="grow">
                            <CardHeader>
                                <CardTitle className='text-center sm:text-left'>
                                    <GithubIcon className="text-center sm:text-left mr-2 inline-block" size={16} />
                                    {title ?? 'N/A'}
                                </CardTitle>
                                <CardDescription className='text-center sm:text-left'>
                                    {numFiles} files, {size}MB, {starCount} stars{' '}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='flex justify-center'>
                                <GenerateButton />
                            </CardContent>
                        </div>
                    </>
                ) : (
                    !isLoading && (
                        <div className="flex min-h-fit items-center justify-center sm:h-full sm:grow">
                            <CardContent className="flex   h-44 items-center justify-center">
                                <p className="text-slate-400">Pick a repo to start!</p>
                            </CardContent>
                        </div>
                    )
                )}
                <Separator orientation="vertical" className="hidden h-44 sm:block" />
                <Separator orientation="horizontal" className="w-full sm:hidden" />
                <div className="grow">
                    <CardHeader className="text-center">
                        <CardTitle>Optimize for Keywords:</CardTitle>
                        <CardDescription>Input a comma separated list for keywords to optimize for</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <KeywordInput keywords={keywords} setKeywords={setKeywords} />
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}

export default RepoInfo
