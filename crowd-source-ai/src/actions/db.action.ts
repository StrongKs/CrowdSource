"use server";

import { prisma } from "@/lib/prisma";

// Tested and Functioning as expected
export async function addDefaultPost() {
    try {
        const post = await prisma.post.create({
            data: {
                author_name: "Jane Doe",
                content: "This is a default post",
            }
        });
        console.log("Default post created successfully", post);
    } catch (error) {
        console.error("Error in addDefaultPost", error);
    }
}

// Tested
export async function addPosts(author_name: string, content: string) {
    try {
        const post = await prisma.post.create({
            data: {
                author_name: `${author_name || ""}`,
                content: `${content || ""}`,
            }
        });
        console.log("Post created successfully", post);
    } catch (error) {
        console.error("Error in addPosts", error);
    }
}

 
// Not Tested
export async function getPosts() {
    try {
        const posts = await prisma.post.findMany();
        console.log("Posts retrieved successfully", posts);
        return posts;
    } catch (error) {
        console.error("Error in getPosts", error);
    }
}

// Not Tested
// export async function addComment(post_ID: number, author_name: string, content: string) {
//     try {
//         const comment = await prisma.comment.create({
//             data: {
//                 postID: post_ID,
//                 author_name: `${author_name}`,
//                 content: `${content}`,
//             }
//         });
//         console.log("Comment created successfully", comment);
//     } catch (error) {
//         console.error("Error in addComment", error);
//     }
// }