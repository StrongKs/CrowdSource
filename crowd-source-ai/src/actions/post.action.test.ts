import { prisma } from "@/lib/prisma";
import {
  addDefaultPost,
  addPosts,
  addPostsW_Coordinates,
  getPosts,
} from "./post.action";

// Mock the Prisma client
jest.mock("@/lib/prisma", () => ({
  prisma: {
    post: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe("Post Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("addDefaultPost creates a default post", async () => {
    await addDefaultPost();
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        author_name: "Jane Doe",
        content: "This is a default post",
        latitude: 0.0,
        longitude: 0.0,
      },
    });
  });

  it("addPosts creates a post with image", async () => {
    await addPosts("Alice", "Hello World", "https://img.com/cat.png");
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        author_name: "Alice",
        content: "Hello World",
        latitude: 0.0,
        longitude: 0.0,
        image: "https://img.com/cat.png",
      },
    });
  });

  it("addPostsW_Coordinates creates a post with coords", async () => {
    const result = await addPostsW_Coordinates(
      "Bob",
      "Testing GPS",
      30.1,
      -82.3,
      "https://img.com/dog.png"
    );
    expect(result).toEqual({ sucess: true });
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        author_name: "Bob",
        content: "Testing GPS",
        latitude: 30.1,
        longitude: -82.3,
        image: "https://img.com/dog.png",
      },
    });
  });

  it("getPosts retrieves latest 10 posts", async () => {
    const fakePosts = [{ id: "123", content: "hi" }];
    (prisma.post.findMany as jest.Mock).mockResolvedValue(fakePosts);
    const posts = await getPosts();
    expect(posts).toEqual(fakePosts);
    expect(prisma.post.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  });
});
