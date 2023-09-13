import React, { Suspense } from 'react'
import Generation from '@/components/Generation'
import GithubRepoCard from '@/components/GithubRepoCard'
import { auth, currentUser } from '@clerk/nextjs'
import clerk from '@clerk/clerk-sdk-node'
import { Octokit } from 'octokit'
import RepoCard from '@/components/RepoCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import RepoInfo from '@/components/RepoInfo'
import { Skeleton } from '@/components/ui/skeleton'
import MobileRepoSelect from '@/components/MobileRepoSelect'

async function WritePage() {
    const user = await currentUser()

    const { userId } = auth()  

    

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
                        {repos ? (
                            repos?.map((repo) => (
                                // @ts-ignore
                                <Suspense fallback={<div>Loading...</div>}>
                                    {/*  @ts-ignore */}
                                    <RepoCard key={repo.id} repo={repo} />
                                </Suspense>
                            ))
                        ) : (
                            <p className='my-auto text-slate-400  text-center'>Connect your GitHub account to view your repositories</p>
                        )}
                    </div>
                </ScrollArea>
            </GithubRepoCard>
            <div className="flex grow flex-col">
                <div className="m-4 mx-auto my-2 basis-1/4">
                    <RepoInfo/>
                </div>
                <Generation/>
            </div>
            {/* <GenerateContainer /> */}
        </div>
    )
}

export default WritePage
