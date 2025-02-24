import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function main() {
  const defaultClient = await prisma.post.create( { data: { author_name : "default_name", content : "script ran" } } )
  console.log(defaultClient)
}


main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })