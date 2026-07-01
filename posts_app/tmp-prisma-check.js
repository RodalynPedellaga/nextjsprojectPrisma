import { config } from "dotenv";
import { PrismaClient } from "./app/generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
config({ path: [".env"] });
const url = process.env.DATABASE_URL;
console.log('DATABASE_URL=', url);
const prisma = new PrismaClient({adapter: new PrismaMariaDb(url)});
(async () => {
  try {
    const posts = await prisma.post.findMany({ take: 1 });
    console.log('posts', posts);
  } catch (e) {
    console.error('ERR', e);
  } finally {
    await prisma.$disconnect();
  }
})();
