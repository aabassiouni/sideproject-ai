import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse, NextRequest } from 'next/server'
import { Octokit } from 'octokit'
import { users } from '@clerk/clerk-sdk-node'

// export const revalidate = 1

export async function POST(request: NextRequest) {
    console.log('/////////////////////// /api/repo ////////////////////////')
    const { userId } = auth()
    const user = await currentUser()
    const { repo, owner } = await request.json()
 
    if (userId) {
        if (user?.externalAccounts.length !== 0) {
            const githubToken = await users.getUserOauthAccessToken(userId, 'oauth_github')

            const octokit = new Octokit({
                auth: githubToken[0].token,

            })
            // console.log("token", githubToken[0].token);

            const { data: repoResponse } = await octokit.rest.repos.get({
                owner: owner,
                repo: repo,
            })

            const { data: tree } = await octokit.rest.git.getTree({
                owner: repoResponse.owner.login,
                repo: repoResponse.name,
                tree_sha: repoResponse.default_branch,
                recursive: 'true',
            })

            // console.log("repo is", repoResponse.full_name);
            // console.log("data2", tree.tree.length);

            const obj = {
                name: repoResponse.full_name,
                size: (repoResponse.size / 1024).toFixed(2),
                stargazers_count: repoResponse.stargazers_count,
                numFiles: tree.tree.length,
            }
            // const {stargazers_count,full_name,size } = data;

            return NextResponse.json(obj)
        } else {
            // const githubToken = await clerk.users.getUserOauthAccessToken(userId, 'oauth_github')

            const octokit = new Octokit()
            // console.log("token", githubToken[0].token);

            const { data: repoResponse } = await octokit.rest.repos.get({
                owner: owner,
                repo: repo,
            })

            const { data: tree } = await octokit.rest.git.getTree({
                owner: repoResponse.owner.login,
                repo: repoResponse.name,
                tree_sha: repoResponse.default_branch,
                recursive: 'true',
            })

            // console.log("repo is", repoResponse.full_name);
            // console.log("data2", tree.tree.length);

            const obj = {
                name: repoResponse.full_name,
                size: repoResponse.size,
                stargazers_count: repoResponse.stargazers_count,
                numFiles: tree.tree.length,
            }
            // const {stargazers_count,full_name,size } = data;

            return NextResponse.json(obj)
        }

    }
}
