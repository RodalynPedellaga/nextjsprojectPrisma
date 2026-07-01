process.env.DATABASE_URL = "mysql://root:@localhost:3306/myjesusdb";
const { PrismaClient } = require("./app/generated/prisma");
(async () => {
  const prisma = new PrismaClient();
  const post = await prisma.post.create({
    data: { title: "Check from terminal", content: "Hello from Prisma", published: true },
  });
  console.log(JSON.stringify(post));
  await prisma.$disconnect();
})();
