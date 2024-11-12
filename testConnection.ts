import { prisma } from './src/app/lib/prisma';

async function testConnection() {
  const testPost = await prisma.post.create({
    data: {
      title: "Connection Test Post",
      slug: "connection-test-post", // Added slug here

      content: "This post verifies Prisma is connected.",
    },
  });
  console.log("Test Post Created:", testPost);

  const posts = await prisma.post.findMany();
  console.log("All Posts:", posts);
}

testConnection()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
