"use server";

import { prisma } from "@/lib/prisma";

// Tested and Functioning as expected
export async function addDefaultPost() {
  try {
    const post = await prisma.post.create({
      data: {
        author_name: "Jane Doe",
        content: "This is a default post",
        latitude: 0.0,
        longitude: 0.0,
      },
    });
    console.log("Default post created successfully", post);
  } catch (error) {
    console.error("Error in addDefaultPost", error);
  }
}

// Not tested
export async function addPosts(author_name: string, content: string,  imageUrl?: string) {
  try {
    const post = await prisma.post.create({
      data: {
        author_name: `${author_name}`,
        content: `${content}`,
        latitude: 0.0,
        longitude: 0.0,
        image : imageUrl
        
      },
    });
    console.log("Post created successfully", post);
  } catch (error) {
    console.error("Error in addPosts", error);
  }
}


// export async function getPosts() {
//   try {
//     const posts = await prisma.post.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       },
//       take: 10 // Limit the number of posts fetched at once
//     });
//     return posts;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }
// }


export interface Post {
    id: string;
    author_name: string;
    content: string | null;
    image: string | null;
    latitude: number;
    longitude: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export async function getPosts(): Promise<Post[]> {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }  

// Not tested
export async function addPostsW_Coordinates(
  author_name: string,
  content: string,
  _latitude: number,
  _longitude: number,
  imageUrl?: string
) {
  try {
    const post = await prisma.post.create({
      data: {
        author_name: `${author_name}`,
        content: `${content}`,
        latitude: _latitude,
        longitude: _longitude,
        image: imageUrl

      },
    });
    console.log("Post created successfully", post);
    return {sucess: true};
  } catch (error) {
    console.error("Error in addPosts", error);
  }
}

// // Not Tested
// export async function getPosts() {
//   try {
//     console.log("bob");
//     const posts = await prisma.post.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       take: 10, // Limit the number of posts fetched at once
//     });
//     return posts;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }
// }

// export async function getPosts() {
//     try {
//         const posts = await prisma.post.findMany();
//         console.log("Posts retrieved successfully", posts);
//         return posts;
//     } catch (error) {
//         console.error("Error in getPosts", error);
//     }
// }

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
