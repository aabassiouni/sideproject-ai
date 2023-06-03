import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Generation from '@/components/Generation'
import GithubRepoCard from '@/components/GithubRepoCard'
// import GenerateContainer from "@/components/GenerateContainer";
import { auth, currentUser } from '@clerk/nextjs'
import clerk from '@clerk/clerk-sdk-node'
import { Octokit } from 'octokit'
import RepoCard from '@/components/RepoCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import GithubIcon from '@/components/icons/GithubIcon'
import DashboardNavbar from '@/components/DashboardNavbar'
import RepoInfo from '@/components/RepoInfo'
import ts from 'typescript'
import { Skeleton } from '@/components/ui/skeleton'
import MobileRepoSelect from '@/components/MobileRepoSelect'

function RepoCardSkeleton() {
    return <Skeleton className="h-16 w-full" />
}

async function WritePage() {
    const user = await currentUser()

    const { userId } = auth()
    // console.log('user', user)
    const repoSelected = true
    let repos
    if (userId) {
        if (user?.externalAccounts?.length !== 0) {
            const githubToken = await clerk.users.getUserOauthAccessToken(userId, 'oauth_github')

            const octokit = new Octokit({
                auth: githubToken[0].token,
            })
            // console.log('token', githubToken[0].token)

            const { data } = await octokit.rest.repos.listForAuthenticatedUser({
                visibility: 'all',
            })

            repos = data
        }
    }

    return (
        <div className="flex h-screen flex-col sm:flex-row">
            <MobileRepoSelect>
                <ScrollArea className="h-44">
                    <div className="space-y-3">
                        {repos?.map((repo) => (
                            // @ts-ignore
                            <Suspense fallback={<div>Loading...</div>}>
                                {/*  @ts-ignore */}
                                <RepoCard key={repo.id} repo={repo} />
                            </Suspense>
                        ))}
                    </div>
                </ScrollArea>
            </MobileRepoSelect>
            <GithubRepoCard>
                <ScrollArea className="sm:h-96">
                    <div className="mr-3 space-y-3">
                        {repos?.map((repo) => (
                            // @ts-ignore
                            <Suspense fallback={<div>Loading...</div>}>
                                {/*  @ts-ignore */}
                                <RepoCard key={repo.id} repo={repo} />
                            </Suspense>
                        ))}
                    </div>
                </ScrollArea>
            </GithubRepoCard>
            <div className="flex grow flex-col">
                <div className='m-4 my-2'>
                    <RepoInfo />
                </div>
                <Generation />
            </div>
            {/* <GenerateContainer /> */}
        </div>
    )
}

export default WritePage
