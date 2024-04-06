import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Api, Config, StackContext } from "sst/constructs";

export function ApiStack({ app, stack }: StackContext) {
  const OPENAI_API_KEY = new Config.Secret(stack, "OPENAI_API_KEY");
  const CLERK_SECRET_KEY = new Config.Secret(stack, "CLERK_SECRET_KEY");
  const DATABASE_URL = new Config.Secret(stack, "DATABASE_URL");
  const DISCORD_WEBHOOK_URL = new Config.Secret(stack, "DISCORD_WEBHOOK_URL");

  if (!process.env.AWS_CUSTOM_DOMAIN || !process.env.AWS_CERTIFICATE_ARN) {
    throw new Error(
      "Please set the AWS_CUSTOM_DOMAIN and AWS_CERTIFICATE_ARN environment variables."
    );
  }

  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "clerk",
      function: {
        timeout: 60,
        bind: [
          OPENAI_API_KEY,
          CLERK_SECRET_KEY,
          DATABASE_URL,
          DISCORD_WEBHOOK_URL,
        ],
      },
    },
    customDomain: app.stage === "prod" ? {
      domainName: process.env.AWS_CUSTOM_DOMAIN,
      isExternalDomain: true,
      cdk: {
        certificate: Certificate.fromCertificateArn(
          stack,
          "MyCert",
          process.env.AWS_CERTIFICATE_ARN
        ),
      },
    } : undefined,
    // cors: {
    //   // allowMethods: ["ANY"],
    //   // allowHeaders: ["*"],
    //   allowOrigins: ["https://usesideprojectai.com"],
    // },
    authorizers: {
      clerk: {
        type: "jwt",
        identitySource: ["$request.header.Authorization"],
        jwt: {
          issuer: "https://one-bonefish-61.clerk.accounts.dev",
          audience: ["test"],
        },
      },
    },
    routes: {
      "POST /generate": "packages/functions/src/generate.handler",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
