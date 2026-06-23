import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  generator: {
    client: {
      provider: "prisma-client-js",
      output: "../app/generated/prisma",
    },
  },
});