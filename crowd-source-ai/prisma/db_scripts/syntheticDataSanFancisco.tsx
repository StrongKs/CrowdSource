import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import incidentReports from './incident_reports/SanFanciscoEarthquake/unique_earthquake_reports_sf_500_with_comments.json';
import { comment } from 'postcss';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database with synthetic data...");

    let posts: any[] = [];
    let comments: any[] = [];

    // Create Posts with comments
    for (const report of incidentReports) {

        const newPost = await prisma.post.create({
            data: {
                author_name: faker.person.firstName() + " " + faker.person.lastName(),
                content: report.Description,
                latitude: report.Coordinates.Latitude,
                longitude: report.Coordinates.Longitude,
            }
        });

        posts.push(newPost);

        const commentPromises = report.Comments.map(commentReport => 
            prisma.comment.create({ 
                data: { 
                    author_name: faker.person.firstName() + " " + faker.person.lastName(), 
                    content: commentReport.Comment, 
                    post: { connect: { id: newPost.id } },
                    latitude: report.Coordinates.Latitude,
                    longitude: report.Coordinates.Longitude,
                }
            })
        );

        const createdComments = await Promise.all(commentPromises);
        comments.push(...createdComments);
    }

    console.log(`Created ${posts.length} posts.`);
    console.log(`Created ${comments.length} comments.`);

    console.log("✅ Seeding completed!");
}

main()
    .catch(e => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });