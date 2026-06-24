import { PrismaClient } from "../generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required for Prisma client initialization.");
  }
  return url;
};

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: getDatabaseUrl(),
    }),
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export default prisma;
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
