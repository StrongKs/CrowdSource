import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Will delete all data in the database while keeping the schema(tables)
async function resetDatabase() {
    console.log("🗑 Deleting all data...");

    await prisma.post.deleteMany({});
    await prisma.comment.deleteMany({});

    console.log("✅ Database reset complete!");
}

resetDatabase()
    .catch(e => console.error("❌ Error:", e))
    .finally(async () => {
        await prisma.$disconnect();
    });