import { NextResponse } from 'next/server'
import { GithubRepoLoader } from 'langchain/document_loaders/web/github'
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains'
import clerk from '@clerk/clerk-sdk-node'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { auth } from '@clerk/nextjs'
import { Octokit } from 'octokit'
import { ChatOpenAI } from 'langchain/chat_models/openai'
// import { ChatAnthropic } from 'langchain/chat_models/anthropic'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { PromptTemplate } from 'langchain/prompts'
import type { Document } from 'langchain/document'
import { insertError, insertGeneration } from '@/lib/db'
import { newId } from '@sideproject-ai/id'
import { notifyDiscord } from '@/lib/discord'

export const runtime = 'nodejs'
export const maxDuration = 60

const githubLoaderIgnorePaths = [
    'package-lock.json',
    'CODE_OF_CONDUCT.md',
    'CODE_OF_CONDUCT',
    'CODE_OF_CONDUCT.txt',
    'CODE_OF_CONDUCT.rst',
    'CODE_OF_CONDUCT.markdown',
    'CODE_OF_CONDUCT.MD',
    'CODE_OF_CONDUCT.md',
    'CODE_OF_CONDUCT.html',
    'CODE_OF_CONDUCT.htm',
    'CODE_OF_CONDUCT.pdf',
    'CODE_OF_CONDUCT.doc',
    'CODE_OF_CONDUCT.docx',
    'CODE_OF_CONDUCT.odt',
    'CODE_OF_CONDUCT.rtf',
    'CODE_OF_CONDUCT.txt',
    'CODE_OF_CONDUCT.wiki',
    'CODE_OF_CONDUCT.yml',
    'CODE_OF_CONDUCT.yaml',
    'CODE_OF_CONDUCT.json',
    'CODE_OF_CONDUCT.xml',
    'CODE_OF_CONDUCT.svg',
    'CODE_OF_CONDUCT.png',
    'CODE_OF_CONDUCT.jpg',
    'CODE_OF_CONDUCT.jpeg',
    'CODE_OF_CONDUCT.gif',
    'CODE_OF_CONDUCT.ico',
    'Contributing.md',
    'Contributing',
    'Contributing.txt',
    'Contributing.rst',
    'Contributing.markdown',
    'Contributing.MD',
    'Contributing.md',
    'Contributing.html',
    'Contributing.htm',
    'Contributing.pdf',
    'Contributing.doc',
    'Contributing.docx',
    'Contributing.odt',
    'Contributing.rtf',
    'Contributing.txt',
    'Contributing.wiki',
    'Contributing.yml',
    'Contributing.yaml',
    'Contributing.json',
    'CONTRIBUTING.md',
    'CONTRIBUTING',
    'CONTRIBUTING.txt',
    'CONTRIBUTING.rst',
    'CONTRIBUTING.markdown',
    'CONTRIBUTING.MD',
    'CONTRIBUTING.md',
    'CONTRIBUTING.html',
    'CONTRIBUTING.htm',
    'CONTRIBUTING.pdf',
    'CONTRIBUTING.doc',
    'CONTRIBUTING.docx',
    'CONTRIBUTING.odt',
    'CONTRIBUTING.rtf',
    'CONTRIBUTING.txt',
    'LICENSE.txt',
    'LICENSE',
    'LICENSE.md',
    'LICENSE-MIT',
    'LICENSE-MIT.txt',
    'LICENSE.BSD',
    'LICENSE.BSD-2',
    'LICENSE.BSD-3',
    'LICENSE.BSD-4',
    'LICENSE.APACHE',
    'LICENSE.APACHE-2',
    'LICENSE.APACHE-2.0',
    'LICENSE.APACHE-2.0.txt',
    'LICENSE.APACHE2',
    'LICENSE.APACHE2.txt',
    'LICENSE.GPL',
    'LICENSE.GPL-2',
    'LICENSE.GPL-3',
    'LICENSE.GPL-3.0',
    'LICENSE.GPL2',
    'LICENSE.GPL3',
    'LICENSE.LGPL',
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    'yarn.lock',
    'yarn-error.log',
    'yarn-debug.log',
    'test/',
    'tests/',
    'public/',
    'testsuite/',
    'docs/',
    'doc/',
    'example/',
    'examples/',
    'demo/',
    'demos/',
    'benchmark/',
    'benchmarks/',
    'tmp/',
    'temp/',
    'log/',
    'logs/',
    'cache/',
    'caches/',
    'data/',
    'datas/',
    '.vscode/',
    '.eslintrc.json',
    '.eslintrc.js',
    '.eslintrc.yml',
    '.eslintrc.yaml',
    '.eslintrc',
    '.eslintignore',
    '.prettierrc',
    '.prettierrc.json',
    '.prettierrc.yml',
    '.prettierrc.yaml',
    '.prettierrc.js',
    '.prettierignore',
    '.stylelintrc',
    '.stylelintrc.json',
    '.stylelintrc.yml',
    '.stylelintrc.yaml',
    '.stylelintrc.js',
    '.stylelintignore',
    '.gitattributes',
    '.gitmodules',
    '.DS_Store',
    '.tern-project',
    '.gitkeep',
    'vite-env.d.ts',
    'vite.config.ts',
    'vite.config.js',
    'babel.config.js',
    'babel.config.json',
    'babel.config.ts',
    'jest.config.ts',
    'jest.config.json',
    'jest.config.js',
    'jest.setup.ts',
    'jest.setup.js',
    'jest.json',
    'jestrc',
    'jest.config.babel.js',
    'jest.config.cjs',
    'jest.config.mjs',
    'jest.config.json5',
    'tsconfig.node.json',
    'vercel.json',
    'tailwind.config.js',
    'postcss.config.js',
    'webpack.config.js',
    'rollup.config.js',
    'tsconfig.node.json',
    'gulpfile.js',
    'Gruntfile.js',
    'prettier.config.js',
    'jest.config.js',
    'jest.setup.js',
    'jest.config.json',
    'tsconfig.json',
    'tsconfig.build.json',
    'tsconfig.settings.json',
    'tslint.json',
    'jsconfig.json',
    'jsconfig.settings.json',
    'karma.conf.js',
    '.gitignore',
    '.vscodeignore',
    '.git',
    'poetry.lock',
    '*.sqlite3',
    '*.svg',
    '*.csv',
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.ico',
    '*.pdf',
    '*.docx',
    '*.doc',
    '*.pptx',
    '*.ppt',
    '*.xls',
    '*.xlsx',
    '*.mp4',
    '*.mp3',
    '*.wav',
    '*.zip',
    '*.tar.gz',
    '*.tgz',
    '*.rar',
    '*.7z',
    '*.bz2',
    '*.gz',
    '*.log',
    '*.psd',
    '*.ai',
    '*.sketch',
    '*.fig',
    '*.eps',
    '*.ttf',
    '*.otf',
    '*.woff',
    '*.woff2',
    '*.eot',
    '*.css',
    'components/',
    '*.yaml',
    '*.h',
    '*.lock',
    '*.o',
    '*.srec',
    '*.mk',
    '*.lss',
    '*.hex',
    '*.eep',
    '*.elf',
    '*.map',
    '*.d',
    '*.atsuo',
]

export async function POST(request: Request) {
    console.log('///////////////////////// /api/generate /////////////////////////')

    const { userId } = auth()
    const { repo, owner, url, keywords } = (await request.json()) as {
        repo: string
        owner: string
        url: string
        keywords: string[]
    }

    console.log('url', url)
    if (userId) {
        //maybe add a privacy check

        //fetching credits
        // const credits = await db.fetchUserCredits(userId)
        // console.log('USER HAS CREDITS: ', credits, 'credits')
        // if (credits < 1) {
        //     return NextResponse.json({ error: 'not enough credits' })
        // }

        // creating a new generation id for the DB
        const generationID = newId('generation')

        // instantiating the LLM
        // const llm = new ChatOpenAI({
        //     modelName: 'gpt-4',
        //     maxTokens: -1,
        //     temperature: 0.9,
        // })

        const llm = new ChatOpenAI({
            modelName: 'gpt-4-1106-preview',
            temperature: 0.8,
            maxTokens: -1,
        })

        const githubToken = await clerk.users.getUserOauthAccessToken(userId, 'oauth_github')
        console.log('githubToken', githubToken)
        // console.time('Loading Docs')

        const octokit = new Octokit({
            auth: githubToken[0]?.token,
        })

        console.log('## Fetching Repo Info ##')
        console.log('owner', owner)
        console.log('repo', repo)

        const { data: repoResponse } = await octokit.rest.repos.get({
            owner: owner,
            repo: repo,
        })

        const loader = new GithubRepoLoader(url.trim(), {
            ignorePaths: githubLoaderIgnorePaths,
            accessToken: githubToken[0]?.token,
            branch: repoResponse.default_branch,
        })

        const docs = await loader.load()

        // console.timeEnd('Loading Docs')

        console.log('## Analyzing Docs ##')
        console.log(docs.map((d) => d.metadata))

        const processedDocs = docs
            .map((doc) => {
                console.log('length of doc', doc.metadata.source, 'is', doc.pageContent?.length)
                if (doc.pageContent === undefined) {
                    console.log('Removing doc:', doc.metadata.source)
                    return null
                } else if (doc.pageContent.length > 15000) {
                    console.log('Trimming doc:', doc.metadata.source)
                    doc.pageContent = doc.pageContent.substring(0, 15000)
                }
                return doc
            })
            .filter((doc) => doc !== null) as Document<Record<string, any>>[]

        console.time('Embedding Docs')
        console.log('## Embedding Documents ##')

        let vectorStore
        try {
            vectorStore = await MemoryVectorStore.fromDocuments(processedDocs, new OpenAIEmbeddings())
        } catch (error: any) {
            console.log('Error embedding documents:', error)
            console.log('error message:', error?.response?.data)
            const errorID = newId('error')
            await insertError(errorID, userId, generationID, owner + '/' + repo, error, 'embeddings')
            return NextResponse.json({ error: 'error during generation', errorID: errorID })
        }

        console.timeEnd('Embedding Docs')

        // console.log('## keywords ##')
        // console.log(keywords ?? 'no keywords')

        /////////////////////////////////////////////////////////////////////////////////

        console.time('Calling LLM API')
        const chain = new RetrievalQAChain({
            retriever: vectorStore.asRetriever(100),
            combineDocumentsChain: loadQAStuffChain(llm),
            // verbose: true,
        })

        console.log('## calling chain ##')

        const parser = StructuredOutputParser.fromZodSchema(
            z.object({
                firstBullet: z.string().describe('the first resume bullet point'),
                secondBullet: z.string().describe('the second resume bullet point'),
                thirdBullet: z.string().describe('the third resume bullet point'),
                fourthBullet: z.string().describe('the fourth resume bullet point'),
                fifthBullet: z.string().describe('the fifth resume bullet point'),
            })
        )

        const formatInstructions = parser.getFormatInstructions()

        const prompt = new PromptTemplate({
            template: `You are an expert resume writer for software engineers. I want you to understand the code then generate 5 resume bullet points for this codebase. Follow the STAR (Situation, Task, Action, Result) method when creating the bullet points. You should include the technogies used. The statements should be professional and always start with an action verb in the past tense. Do not include the names of the providers of services. For example, if planetscale is a company that provides a hosted MySQL database, then you should state MySQL and not Planetscale. Avoid talking about fonts, colors, and other design elements. Make sure the bullet points are ATS friendly. The first bullet point should be a description of the project at a high level. Be detailed in your bullet points but keep them short and concise. Do not make up things or add information that you cannot deduce from the code. The bullet points should reflect the skills of the person who wrote the code and convey that to anyone reading them. If you do not have enough info to generate 5 bullet points, answer simply with the phrase "I do not have enough information to generate 5 bullet points" only. \n\n
            
            \n repository name: {repo} 
                
                ${
                    keywords.length > 0
                        ? `Include the following keywords to include in your statements: ${keywords.join(', ')}.`
                        : ''
                }
     
                ${
                    repoResponse.stargazers_count || repoResponse.watchers_count
                        ? `Metrics: ${
                              repoResponse.stargazers_count ? repoResponse.stargazers_count + 'Github Stars' : ''
                          }, ${repoResponse.watchers_count ? repoResponse.watchers_count + 'watchers on github' : ''}`
                        : ''
                }

                \n{format_instructions}

                `,
            inputVariables: ['repo'],
            partialVariables: { format_instructions: formatInstructions },
        })

        const input = await prompt.format({
            repo: repo,
        })

        let res
        try {
            res = await chain.call({
                query: input,
            })
        } catch (error: any) {
            console.log('Error fetching completion:', error)
            console.log('error message:', error?.response?.data)

            const errorID = newId('error')
            await insertError(errorID, userId, generationID, owner + '/' + repo, error, 'completion')

            return NextResponse.json({ error: 'error during generation', errorID: errorID })
        }

        console.timeEnd('Calling LLM API')
        // console.log('##OPENAI call returned: ', res?.text)
        console.log('## splitting the text into bullets ##')
        //@ts-ignore
        const { text } = res

        if (text.includes('I do not have enough information to generate 5 bullet points')) {
            const errorID = newId('error')
            await insertError(errorID, userId, generationID, owner + '/' + repo, 'not enough information', 'no_code')
            return NextResponse.json({ error: 'not enough information' })
        }

        const filteredText = text.replace(/.*?({.*?}).*/s, '$1')

        let responseObj
        try {
            responseObj = await parser.parse(filteredText)
        } catch (error: any) {
            console.log('Error parsing response:', error)
            const errorID = newId('error')
            await insertError(errorID, userId, generationID, owner + '/' + repo, error, 'parsing')
            return NextResponse.json({ error: 'error during generation', errorID: errorID })
        }
        console.log('the parsed object is', responseObj)

        const bullets = Object.values(responseObj).map((bullet: any) => bullet.replace(/\n/g, ''))

        console.log(bullets)

        console.time('Saving to DB')
        console.log('Saving to db')

        await insertGeneration(generationID, userId, owner, repo, res, bullets)
        // await db.updateUserCredits(userId)

        console.log('saved to db:', generationID)
        console.timeEnd('Saving to DB')

        // pineconeIndex.delete1({ deleteAll: true, namespace: `${owner}/${repo}-${generationID}` })

        notifyDiscord({
            type: 'generation_created',
            data: {
                repo: owner + '/' + repo,
            },
        })
        return NextResponse.json({ id: generationID, name: repo, bullets })
    }
    return
}
