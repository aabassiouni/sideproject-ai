import { Clerk } from "@clerk/clerk-sdk-node";
import { newId } from "@sideproject-ai/id";
import type { APIGatewayProxyHandlerV2WithJWTAuthorizer } from "aws-lambda";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import type { ChainValues } from "langchain/dist/schema";
import type { Document } from "langchain/document";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Octokit } from "octokit";
import { Config } from "sst/node/config";
import { z } from "zod";
import { decreaseUserCredits, insertError, insertGeneration } from "../../core/db";
import { notifyDiscord } from "../../core/discord";

const githubLoaderIgnorePaths = [
  "package-lock.json",
  "CODE_OF_CONDUCT.md",
  "CODE_OF_CONDUCT",
  "CODE_OF_CONDUCT.txt",
  "CODE_OF_CONDUCT.rst",
  "CODE_OF_CONDUCT.markdown",
  "CODE_OF_CONDUCT.MD",
  "CODE_OF_CONDUCT.md",
  "CODE_OF_CONDUCT.html",
  "CODE_OF_CONDUCT.htm",
  "CODE_OF_CONDUCT.pdf",
  "CODE_OF_CONDUCT.doc",
  "CODE_OF_CONDUCT.docx",
  "CODE_OF_CONDUCT.odt",
  "CODE_OF_CONDUCT.rtf",
  "CODE_OF_CONDUCT.txt",
  "CODE_OF_CONDUCT.wiki",
  "CODE_OF_CONDUCT.yml",
  "CODE_OF_CONDUCT.yaml",
  "CODE_OF_CONDUCT.json",
  "CODE_OF_CONDUCT.xml",
  "CODE_OF_CONDUCT.svg",
  "CODE_OF_CONDUCT.png",
  "CODE_OF_CONDUCT.jpg",
  "CODE_OF_CONDUCT.jpeg",
  "CODE_OF_CONDUCT.gif",
  "CODE_OF_CONDUCT.ico",
  "Contributing.md",
  "Contributing",
  "Contributing.txt",
  "Contributing.rst",
  "Contributing.markdown",
  "Contributing.MD",
  "Contributing.md",
  "Contributing.html",
  "Contributing.htm",
  "Contributing.pdf",
  "Contributing.doc",
  "Contributing.docx",
  "Contributing.odt",
  "Contributing.rtf",
  "Contributing.txt",
  "Contributing.wiki",
  "Contributing.yml",
  "Contributing.yaml",
  "Contributing.json",
  "CONTRIBUTING.md",
  "CONTRIBUTING",
  "CONTRIBUTING.txt",
  "CONTRIBUTING.rst",
  "CONTRIBUTING.markdown",
  "CONTRIBUTING.MD",
  "CONTRIBUTING.md",
  "CONTRIBUTING.html",
  "CONTRIBUTING.htm",
  "CONTRIBUTING.pdf",
  "CONTRIBUTING.doc",
  "CONTRIBUTING.docx",
  "CONTRIBUTING.odt",
  "CONTRIBUTING.rtf",
  "CONTRIBUTING.txt",
  "LICENSE.txt",
  "LICENSE",
  "LICENSE.md",
  "LICENSE-MIT",
  "LICENSE-MIT.txt",
  "LICENSE.BSD",
  "LICENSE.BSD-2",
  "LICENSE.BSD-3",
  "LICENSE.BSD-4",
  "LICENSE.APACHE",
  "LICENSE.APACHE-2",
  "LICENSE.APACHE-2.0",
  "LICENSE.APACHE-2.0.txt",
  "LICENSE.APACHE2",
  "LICENSE.APACHE2.txt",
  "LICENSE.GPL",
  "LICENSE.GPL-2",
  "LICENSE.GPL-3",
  "LICENSE.GPL-3.0",
  "LICENSE.GPL2",
  "LICENSE.GPL3",
  "LICENSE.LGPL",
  "node_modules/",
  "dist/",
  "build/",
  "coverage/",
  "yarn.lock",
  "yarn-error.log",
  "yarn-debug.log",
  "test/",
  "tests/",
  "public/",
  "testsuite/",
  "docs/",
  "doc/",
  "example/",
  "examples/",
  "demo/",
  "demos/",
  "benchmark/",
  "benchmarks/",
  "tmp/",
  "temp/",
  "log/",
  "logs/",
  "cache/",
  "caches/",
  "data/",
  "datas/",
  ".vscode/",
  ".eslintrc.json",
  ".eslintrc.js",
  ".eslintrc.yml",
  ".eslintrc.yaml",
  ".eslintrc",
  ".eslintignore",
  ".prettierrc",
  ".prettierrc.json",
  ".prettierrc.yml",
  ".prettierrc.yaml",
  ".prettierrc.js",
  ".prettierignore",
  ".stylelintrc",
  ".stylelintrc.json",
  ".stylelintrc.yml",
  ".stylelintrc.yaml",
  ".stylelintrc.js",
  ".stylelintignore",
  ".gitattributes",
  ".gitmodules",
  ".DS_Store",
  ".tern-project",
  ".gitkeep",
  "vite-env.d.ts",
  "vite.config.ts",
  "vite.config.js",
  "babel.config.js",
  "babel.config.json",
  "babel.config.ts",
  "jest.config.ts",
  "jest.config.json",
  "jest.config.js",
  "jest.setup.ts",
  "jest.setup.js",
  "jest.json",
  "jestrc",
  "jest.config.babel.js",
  "jest.config.cjs",
  "jest.config.mjs",
  "jest.config.json5",
  "tsconfig.node.json",
  "vercel.json",
  "tailwind.config.js",
  "postcss.config.js",
  "webpack.config.js",
  "rollup.config.js",
  "tsconfig.node.json",
  "gulpfile.js",
  "Gruntfile.js",
  "prettier.config.js",
  "jest.config.js",
  "jest.setup.js",
  "jest.config.json",
  "tsconfig.json",
  "tsconfig.build.json",
  "tsconfig.settings.json",
  "tslint.json",
  "jsconfig.json",
  "jsconfig.settings.json",
  "karma.conf.js",
  ".gitignore",
  ".vscodeignore",
  ".git",
  "poetry.lock",
  "*.sqlite3",
  "*.svg",
  "*.csv",
  "*.png",
  "*.jpg",
  "*.jpeg",
  "*.gif",
  "*.ico",
  "*.pdf",
  "*.docx",
  "*.doc",
  "*.pptx",
  "*.ppt",
  "*.xls",
  "*.xlsx",
  "*.mp4",
  "*.mp3",
  "*.wav",
  "*.zip",
  "*.tar.gz",
  "*.tgz",
  "*.rar",
  "*.7z",
  "*.bz2",
  "*.gz",
  "*.log",
  "*.psd",
  "*.ai",
  "*.sketch",
  "*.fig",
  "*.eps",
  "*.ttf",
  "*.otf",
  "*.woff",
  "*.woff2",
  "*.eot",
  "*.css",
  "components/",
  "*.yaml",
  "*.h",
  "*.lock",
  "*.o",
  "*.srec",
  "*.mk",
  "*.lss",
  "*.hex",
  "*.eep",
  "*.elf",
  "*.map",
  "*.d",
  "*.atsuo",
];
export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event) => {
  const clerkClient = Clerk({
    secretKey: Config.CLERK_SECRET_KEY,
  });

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No body provided" }),
    };
  }

  const { repo, owner, keywords } = JSON.parse(event.body);
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;

  const generationID = newId("generation");

  const llm = new ChatOpenAI({
    modelName: "gpt-4-1106-preview",
    temperature: 0.8,
    maxTokens: -1,
    openAIApiKey: Config.OPENAI_API_KEY,
  });

  const githubToken = await clerkClient.users.getUserOauthAccessToken(userId, "oauth_github");

  const octokit = new Octokit({
    auth: githubToken[0]?.token,
  });

  const { data: repoResponse } = await octokit.rest.repos.get({
    owner: owner,
    repo: repo,
  });

  const loader = new GithubRepoLoader(repoResponse.html_url, {
    ignorePaths: githubLoaderIgnorePaths,
    accessToken: githubToken[0]?.token,
    branch: repoResponse.default_branch,
  });

  const docs = await loader.load();

  const processedDocs = docs
    .map((doc) => {
      if (doc.pageContent === undefined) {
        return null;
      }

      if (doc.pageContent.length > 15000) {
        doc.pageContent = doc.pageContent.substring(0, 15000);
      }

      return doc;
    })
    .filter((doc) => doc !== null) as Document<Record<string, any>>[];

  const vectorStore = await MemoryVectorStore.fromDocuments(
    processedDocs,
    new OpenAIEmbeddings({
      openAIApiKey: Config.OPENAI_API_KEY,
    }),
  );

  const chain = new RetrievalQAChain({
    retriever: vectorStore.asRetriever(100),
    combineDocumentsChain: loadQAStuffChain(llm),
  });

  console.log("## calling chain ##");

  const ResponseSchema = z.object({
    firstBullet: z.string().describe("the first resume bullet point"),
    secondBullet: z.string().describe("the second resume bullet point"),
    thirdBullet: z.string().describe("the third resume bullet point"),
    fourthBullet: z.string().describe("the fourth resume bullet point"),
    fifthBullet: z.string().describe("the fifth resume bullet point"),
  });

  type Response = z.infer<typeof ResponseSchema>;

  const parser = StructuredOutputParser.fromZodSchema(ResponseSchema);

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `You are an expert resume writer for software engineers. I am going to give you the code for a software engineers project on github and I want you to create 5 resume bullet points to show their contributions on their resume. Follow the STAR (Situation, Task, Action, Result) method when creating the bullet points. You should include the technogies used. The statements should be professional and always start with an action verb in the past tense. Do not include the names of the providers of services. For example, if planetscale is a company that provides a hosted MySQL database, then you should state MySQL and not Planetscale. Avoid talking about fonts, colors, and other design elements. Make sure the bullet points are ATS friendly. The first bullet point should be a description of the project at a high level. Be detailed in your bullet points but keep them short and concise. Do not make up things or add information that you cannot deduce from the code. The bullet points should reflect the skills of the person who wrote the code and convey that to anyone reading them. If you do not have enough info to generate 5 bullet points, answer simply with the phrase "I do not have enough information to generate 5 bullet points" only. \n\n
    
        \n repository name: {repo} 
        
        ${keywords.length > 0 ? `Optimize your bullet points for the following keywords: ${keywords.join(", ")}.` : ""}

        ${
          repoResponse.stargazers_count || repoResponse.watchers_count
            ? `Metrics: ${repoResponse.stargazers_count ? `${repoResponse.stargazers_count} Github Stars` : ""}, ${
                repoResponse.watchers_count ? `${repoResponse.watchers_count} watchers on github` : ""
              }`
            : ""
        }

        \n{format_instructions}

        `,
    inputVariables: ["repo"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const input = await prompt.format({
    repo: repo,
  });

  let res: ChainValues;
  try {
    res = await chain.call({
      query: input,
    });
  } catch (error: any) {
    console.log("Error fetching completion:", error);
    console.log("error message:", error?.response?.data);

    const errorID = newId("error");
    await insertError(errorID, userId, `${owner}/${repo}`, error, "completion");

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "error during generation",
        errorID: errorID,
      }),
    };
  }

  const { text } = res;

  if (text.includes("I do not have enough information to generate 5 bullet points")) {
    const errorID = newId("error");
    await insertError(errorID, userId, `${owner}/${repo}`, "not enough information", "no_code");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "not enough information" }),
    };
  }

  const filteredText = text.replace(/.*?({.*?}).*/s, "$1");

  let responseObj: Response;

  try {
    responseObj = await parser.parse(filteredText);
  } catch (error: any) {
    console.log("Error parsing response:", error);
    const errorID = newId("error");
    await insertError(errorID, userId, `${owner}/${repo}`, error, "parsing");
    return {
      error: "error during generation",
      errorID: errorID,
    };
  }

  const bullets = Object.values(responseObj).map((bullet: any) => bullet.replace(/\n/g, ""));

  await insertGeneration({
    generation_id: generationID,
    userID: userId,
    owner,
    repo,
    text,
    bullets,
  });

  await decreaseUserCredits(userId);

  notifyDiscord({
    type: "generation_created",
    data: {
      repo: `${owner}/${repo}`,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: generationID, name: repo, bullets }),
  };
};
