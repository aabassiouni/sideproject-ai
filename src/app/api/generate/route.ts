import { NextResponse } from 'next/server'
import { GithubRepoLoader } from 'langchain/document_loaders/web/github'
import { RetrievalQAChain, loadQAMapReduceChain, loadQAStuffChain } from 'langchain/chains'
import clerk from '@clerk/clerk-sdk-node'
import { randomUUID } from 'crypto'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { auth } from '@clerk/nextjs'
import { conn } from '@/lib/planetscale'
import { Octokit } from 'octokit'
import { PineconeClient } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

export const runtime = 'nodejs'
// const docs = [
//     new Document({
//         metadata: { foo: 'bar' },
//         pageContent: 'pinecone is a vector db',
//     }),
//     new Document({
//         metadata: { foo: 'bar' },
//         pageContent: 'the quick brown fox jumped over the lazy dog',
//     }),
//     new Document({
//         metadata: { baz: 'qux' },
//         pageContent: 'lorem ipsum dolor sit amet',
//     }),
//     new Document({
//         metadata: { baz: 'qux' },
//         pageContent: 'pinecones are the woody fruiting body and of a pine tree',
//     }),
// ]
const githubLoaderIgnorePaths = [
    'package-lock.json',
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
    'tailwind.config.js',
    'postcss.config.js',
    'webpack.config.js',
    'rollup.config.js',
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
    '.git',
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
        const { rows } = (await conn.execute('SELECT credits FROM users WHERE clerk_user_id = ?', [userId])) as {
            rows: { credits?: number }[]
        }

        const credits = rows[0].credits ?? 0
        console.log('USER HAS CREDITS: ', credits, 'credits')

        if (credits < 1) {
            return NextResponse.json({ error: 'Not enough credits' })
        }

        // creating a new generation id for the DB
        const generation_id = randomUUID()

        // instantiating the LLM
        const llm = new ChatOpenAI({
            modelName: 'gpt-3.5-turbo-16k',
            maxTokens: -1,
            temperature: 0.9,
        })
        const embeddings = new OpenAIEmbeddings()

        const client = new PineconeClient()
        await client.init({
            apiKey: process.env.PINECONE_API_KEY ?? '',
            environment: process.env.PINECONE_ENVIRONMENT ?? '',
        })

        const pineconeIndex = client.Index('sideproject-index')

        const githubToken = await clerk.users.getUserOauthAccessToken(userId, 'oauth_github')
        console.log('githubToken', githubToken)
        console.time('Loading Docs')

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

        const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
            chunkSize: 2000,
        });

        const docs = await loader.loadAndSplit(splitter) 

        console.timeEnd('Loading Docs')

        console.log('## Analyzing Docs ##')

        console.log(docs.map((d) => d.metadata))

        console.time('Embedding Docs')
        // const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())

        // let vectorStore: PineconeStore;
        // if (docs.length > 8) {
        //     console.log("## too many docs, splitting into two")
        //     for (let index = 0; index < docs.length; index++) {
        //         console.log("indexing doc", docs[index].metadata)
        //         await PineconeStore.fromDocuments([docs[index]], embeddings, {
        //             pineconeIndex: pineconeIndex,
        //             namespace: `${owner}/${repo}-${generation_id}`,
        //         })
                
        //     }
        //     // await PineconeStore.fromDocuments(docs.slice(0, docs.length / 2), embeddings, {
        //     //     // pineconeIndex: 'sideproject',
        //     //     pineconeIndex: pineconeIndex,
        //     //     namespace: `${owner}/${repo}-${generation_id}`,
        //     // })
        //     // await PineconeStore.fromDocuments(docs.slice(docs.length / 2), embeddings, {
        //     //     // pineconeIndex: 'sideproject',
        //     //     pineconeIndex: pineconeIndex,
        //     //     namespace: `${owner}/${repo}-${generation_id}`,
        //     // })
        //     vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        //         pineconeIndex: pineconeIndex,
        //         namespace: `${owner}/${repo}-${generation_id}`,
        //     })

        // } else {
            console.log("## not too many docs, indexing all")
            const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
                pineconeIndex: pineconeIndex,
                namespace: `${owner}/${repo}-${generation_id}`,
            })
        // }




        console.timeEnd('Embedding Docs')

        // const vectorStore =await PineconeStore.fromExistingIndex(embeddings, {
        //     pineconeIndex: pineconeIndex,
        //     namespace: 'test_docs',
        // })

        console.log('## keywords ##')
        console.log(keywords)

        /////////////////////////////////////////////////////////////////////////////////

        console.time('Calling LLM API')
        // const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever())
        const chain = new RetrievalQAChain({
            retriever: vectorStore.asRetriever(),
            combineDocumentsChain: loadQAStuffChain(llm),
        })
        const template = `
        
            You are an expert resume writer for software engineers. I want you to understand the code then generate 5 resume bullet points for this codebase. Follow the STAR method when creating the bullet points. You should include the technogies used. The statements should be professional and always start with an action verb in the past tense. Avoid talking about fonts, colors, and other design elements. Make sure the bullet points are ATS friendly. Be detailed in your bullet points.

            repository name: ${repo}

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

           The result type should be provided in the following JSON data structure:
           {
               name: "name of the project",
               firstBullet: "the first resume bullet point",
               secondBullet: "the second resume bullet point",
               thirdBullet: "the third resume bullet point",
               fourthBullet: "the fourth resume bullet point",
               fifthBullet: "the fifth resume bullet point",

           }

       Respond only with the output in the exact format specified, with no explanation or conversation.


            `

        console.log('## calling chain ##')

        const res = (await chain.call({
            // query: "explain what this code does like a resume writer would if he were to put this project in a software engineers resume",
            // query: 'create four resume bullet points for this project separated by a new line',
            query: template,
        
        }))

        // console.log(res)
        console.timeEnd('Calling LLM API')

        console.log('##OPENAI call returned: ', res?.text)

        console.log('## splitting the text into bullets ##')
        const { text } = res

        const responseObj = JSON.parse(text)
        console.log(responseObj)

        const bullets = Object.values(responseObj).map((bullet: any) => bullet.replace(/\n/g, ''))

        // const bullets = text.split('|')
        console.log(bullets)

        // const { name, firstBullet, secondBullet, thirdBullet, fourthBullet, fifthBullet } = JSON.parse(
        //     JSON.stringify(text)
        // )

        ////////////////////////////////////////////////////////////////////////////////////
        console.time('Saving to DB')
        const bullets2 = ['1', '2', '3', '4', '5']
        console.log('saving to db')

        await conn.execute(
            'Insert into generations (generation_id, user_id, repo_name, created_on_date, generated_text, bullets ) values (UUID_TO_BIN(?), ?, ?, ?, ?, ?)',
            [generation_id, userId, `${owner}/${repo}`, new Date(), res?.text, JSON.stringify(bullets)]
            // [generation_id, userId, `${owner}/${repo}`, new Date(), "", JSON.stringify(bullets2)]
        )

        await conn.execute('UPDATE users SET credits = credits - 1 WHERE clerk_user_id = ?', [userId])

        console.log('saved to db:', generation_id)
        console.timeEnd('Saving to DB')

        pineconeIndex.delete1({ deleteAll: true, namespace: `${owner}/${repo}-${generation_id}` })

        // const res = {
        //     name: 'name of the project',
        //     firstBullet: 'the first resume bullet point',
        //     secondBullet: 'the second resume bullet point',
        //     thirdBullet: 'the third resume bullet point',
        //     fourthBullet: 'the fourth resume bullet point',
        //     fifthBullet: 'the fifth resume bullet point',
        // }

        return NextResponse.json({ bullets })
    }
    return
}
