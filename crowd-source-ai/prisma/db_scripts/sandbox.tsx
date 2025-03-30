import { PrismaClient } from "@prisma/client";
import { addPostsW_Coordinates } from "@/actions/post.action";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

async function main() {
  const defaultClient = await prisma.post.create({
    data: {
      author_name: "default_name",
      content: "script ran",
      latitude: 0.0,
      longitude: 0.0,
    },
  });
  console.log(defaultClient);

  addPostsW_Coordinates("Jane Doe", "This is a default post", 9.9, 9.9);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
