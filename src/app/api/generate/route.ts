import { NextResponse } from 'next/server'
// import { Configuration, OpenAIApi } from "openai";
import { GithubRepoLoader } from 'langchain/document_loaders/web/github'
import { OpenAI } from 'langchain/llms/openai'
import {
    loadQAStuffChain,
    loadQAMapReduceChain,
    RetrievalQAChain,
    AnalyzeDocumentChain,
    loadQARefineChain,
} from 'langchain/chains'
import clerk from '@clerk/clerk-sdk-node'
import { randomUUID } from 'crypto'
import { PineconeClient } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { Document } from 'langchain/document'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { auth } from '@clerk/nextjs'
import { conn } from '@/lib/planetscale'
import { Octokit } from 'octokit'

export const runtime = 'nodejs'
const githubLoaderIgnorePaths = [
    'package-lock.json',
    'LICENSE.txt',
    'node_modules/',
    '.vscode/',
    '.eslintrc.json',
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
    const { repo, owner, url } = await request.json()
    // console.log("userId", userId);
    // console.log("repo", repo);
    // console.log("owner", owner);
    if (userId) {
        //maybe add a privacy check
        const generation_id = randomUUID()

        const llm = new OpenAI({
            modelName: 'text-davinci-003',
            maxTokens: 350,
            temperature: 0.7,
            streaming: true
        })

        console.log('pinecone api key', process.env.PINECONE_API_KEY)
        console.log('pinecone api key', process.env.PINECONE_ENVIRONMENT)
        console.log('pinecone api key', process.env.PINECONE_INDEX)

        // const client = new PineconeClient()
        // await client.init({
        //     apiKey: process.env.PINECONE_API_KEY ?? '',
        //     environment: process.env.PINECONE_ENVIRONMENT ?? '',
        // })
        // const indexesList = await client.listIndexes()
        // console.log('indexesList', indexesList)

        // const pineconeIndex = client.Index('sideproject')

        const githubToken = await clerk.users.getUserOauthAccessToken(userId, 'oauth_github')

        const octokit = new Octokit({
            auth: githubToken[0].token,
        })
        const { data: repoResponse } = await octokit.rest.repos.get({
            owner: owner,
            repo: repo,
        })
        
        const loader = new GithubRepoLoader(url, {
            ignorePaths: githubLoaderIgnorePaths,
            accessToken: githubToken[0].token,
            branch: repoResponse.default_branch,
        })

        const docs = await loader.load()
        // const docs = [
        //     new Document({
        //       metadata: { foo: "bar" },
        //       pageContent: "pinecone is a vector db",
        //     }),
        //     new Document({
        //       metadata: { foo: "bar" },
        //       pageContent: "the quick brown fox jumped over the lazy dog",
        //     }),
        //     new Document({
        //       metadata: { baz: "qux" },
        //       pageContent: "lorem ipsum dolor sit amet",
        //     }),
        //     new Document({
        //       metadata: { baz: "qux" },
        //       pageContent: "pinecones are the woody fruiting body and of a pine tree",
        //     }),
        //   ];
        console.log(docs.map((d) => d.metadata))

        console.log('indexing into pinecone')
        const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())
        // console.log('MemoryVectorStore index', test)

        const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever())
        // const resultOne = await test.similaritySearch("nextjs app router", 1);

        // console.log('resultOne', resultOne)

        console.log('loading chain')
        // const chain = loadQARefineChain(llm)

        console.log('calling chain')
        const res = {
            text: `generated text for ${owner}/${repo}`,
        }
        // After learning those things, i want you to write 3-4 resume bullet points about this project. they shouldn't be too long. they should start with an action verb.
        // const res = await chain.call({
        //     query: "what is this github project's name? what does it do? what technologies does it use? After learning this information, I want you to write 3-4 resume bullet points about this project. they shouldn't be too long. they should start with an action verb. only return the bullet points",
            
        // })
        console.log(res)
        console.log('ai call returned: ', res.text)

        console.log('saving to db')
        await conn.execute(
            'Insert into generations (generation_id, user_id, repo_name, created_on_date, generated_text) values (UUID_TO_BIN(?), ?, ?, ?, ?)',
            [generation_id, userId, `${owner}/${repo}`, new Date(), res.text]
        )
        console.log('saved to db:', generation_id)

        return NextResponse.json({ text: res.text })
    }
    return
}
