import { OllamaSummarizerFunction } from "@/components/OllamaSummarizerFunc";
import type { Post } from "@/actions/post.action";

describe("OllamaSummarizerFunction", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const mockPost: Post = {
    id: "1",
    author_name: "John Doe",
    content: "Flooding downtown",
    latitude: 25.0,
    longitude: -80.0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: null,
  };

  it("should return a summary from valid JSON response", async () => {
    const summaryText = "John Doe reports flooding in Miami.";
    fetchMock.mockResponseOnce(JSON.stringify({ response: summaryText }));

    const result = await OllamaSummarizerFunction(mockPost);
    expect(result).toBe(summaryText);
  });

  it("should remove AI tags from the response", async () => {
    const aiResponse = "<think>This is internal</think>Final summary here.";
    fetchMock.mockResponseOnce(JSON.stringify({ response: aiResponse }));

    const result = await OllamaSummarizerFunction(mockPost);
    expect(result).toBe("Final summary here.");
  });

  it("should handle invalid JSON", async () => {
    fetchMock.mockResponseOnce("invalid-json-response");

    const result = await OllamaSummarizerFunction(mockPost);
    expect(result).toMatch(/No valid JSON found/);
  });

  it("should return error if fetch fails", async () => {
    fetchMock.mockRejectOnce(new Error("Ollama is down"));

    const result = await OllamaSummarizerFunction(mockPost);
    expect(result).toMatch(/Error generating summary: Ollama is down/);
  });

  it("should return error if post content is empty", async () => {
    const noContentPost = { ...mockPost, content: " " };
    const result = await OllamaSummarizerFunction(noContentPost);
    expect(result).toBe("Error: No content available to summarize.");
  });
});
