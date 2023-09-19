'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Separator } from './ui/separator'
import GithubIcon from './icons/GithubIcon'
import { useValues } from './context/context'
import GenerateButton from './buttons/GenerateButton'
// import KeywordInput from './KeywordInput'
// import KeywordDeleteButton from './buttons/KeywordDeleteButton'


function RepoInfo() {
    const { selectedRepo, keywords } = useValues()
    const [title, setTitle] = useState<string>('')
    const [size, setSize] = useState<number>(0)
    const [starCount, setStarCount] = useState<number>(0)
    const [numFiles, setNumFiles] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        // console.log(selectedRepo)
        async function fetchData() {
            setIsLoading(true)
            const response = await fetch(`/api/repo`, {
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
        }
        if (selectedRepo.repo) {
            fetchData()
        }
    }, [selectedRepo])


    return (
        <Card className="sm:h-full w-80">
            <div className="flex flex-col justify-center sm:flex-row">
                {isLoading ? (
                    // <Card className="m-4 h-40">
                    <div className="sm:basis-1/3  ">
                        <CardHeader className="h-40">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-28" />
                        </CardHeader>
                        {/* </Card> */}
                    </div>
                ) : (
                    <></>
                )}
                {selectedRepo.repo && !isLoading ? (
                    <>
                        {/* add basis back when keywords is added*/}
                        <div className="basi-1/3">
                            <CardHeader>
                                <CardTitle className="text-center sm:text-left">
                                    <GithubIcon className="mr-2 inline-block text-center sm:text-left" size={16} />
                                    {title ?? 'N/A'}
                                </CardTitle>
                                <CardDescription className="text-center mx-auto sm:text-left">
                                    {numFiles} files, {size}MB, {starCount} stars{' '}
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
                            <CardContent className="flex   h-44 items-center justify-center">
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
    )
}

export default RepoInfo
