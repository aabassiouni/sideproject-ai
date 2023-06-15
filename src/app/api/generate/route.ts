import { NextResponse } from 'next/server'
import { GithubRepoLoader } from 'langchain/document_loaders/web/github'
import { OpenAI } from 'langchain/llms/openai'
import { RetrievalQAChain } from 'langchain/chains'
import clerk from '@clerk/clerk-sdk-node'
import { randomUUID } from 'crypto'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { auth } from '@clerk/nextjs'
import { conn } from '@/lib/planetscale'
import { Octokit } from 'octokit'
import { PineconeClient } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
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
]

export async function POST(request: Request) {
    console.log('GET /api/complete')
    console.log('api key is ', process.env.OPENAI_API_KEY)
    console.log('loading docs')

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

        // creating a new generation id for the DB
        const generation_id = randomUUID()

        // instantiating the LLM
        const llm = new OpenAI({
            modelName: 'text-davinci-003',
            maxTokens: -1,
            temperature: 0.9,
        })

        const embeddings = new OpenAIEmbeddings()

        const client = new PineconeClient()
        await client.init({
            apiKey: process.env.PINECONE_API_KEY ?? '',
            environment: process.env.PINECONE_ENVIRONMENT ?? '',
        })
        const indexesList = await client.listIndexes()
        console.log('indexesList', indexesList)

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

        const docs = await loader.load()

        console.timeEnd('Loading Docs')

        console.log('## Analyzing Docs ##')

        console.log(docs.map((d) => d.metadata))

        console.time('Embedding Docs')
        // const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())

        const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
            // pineconeIndex: 'sideproject',
            pineconeIndex: pineconeIndex,
            namespace: `${owner}/${repo}-${generation_id}`,
        })

        console.timeEnd('Embedding Docs')

        // const vectorStore =await PineconeStore.fromExistingIndex(embeddings, {
        //     pineconeIndex: pineconeIndex,
        //     namespace: 'test_docs',
        // })

        console.log('## keywords ##')
        console.log(keywords)

        /////////////////////////////////////////////////////////////////////////////////

        console.time('Calling LLM API')
        const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever())
        const template = `
        You are an expert resume writer. Write me 10 resume bullet points for this codebase describing what the project does and some of the important high level software techniques implemented in this project. You should include the technogies used and the problem that this project solves. The statements should be professional and always start with an action verb in the past tense. Avoid talking about fonts, colors, and other design elements. Focus on the software engineering aspects of the project such as databases, algorithms, REST APIs, and other software engineering concepts.

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

           write the name of the project and 5 statements separated by "|". Do not include newline characters.
            `

        console.log('## calling chain ##')

        const res = (await chain.call({
            // query: "explain what this code does like a resume writer would if he were to put this project in a software engineers resume",
            // query: 'create four resume bullet points for this project separated by a new line',
            query: template,
        })) as { text: string }
        console.timeEnd('Calling LLM API')

        console.log('##OPENAI call returned: ', res)

        console.log('## splitting the text into bullets ##')
        const { text } = res
        // console.log(JSON.parse(text))

        const bullets = text.split('|')
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
        console.log('saved to db:', generation_id)
        console.timeEnd('Saving to DB')

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
