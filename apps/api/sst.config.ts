import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";

export default {
  config(_input) {
    return {
      name: "sideproject-ai-api",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ApiStack);
  },
} satisfies SSTConfig;
