import { config } from "dotenv";
import { PrismaClient } from "./app/generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
config({ path: [".env", ".env.local"] });

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb({ url: process.env.DATABASE_URL }),
});
(async () => {
  try {
    const posts = await prisma.post.findMany({ include: { comments: true } });
    console.log(JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
