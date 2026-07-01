import { config } from "dotenv";
import { PrismaClient } from "./app/generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

config({ path: ['.env'] });

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL),
});

(async () => {
  try {
    const posts = await prisma.post.findMany({ take: 1 });
    console.log('ok', posts);
  } catch (e) {
    console.error('ERR', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
