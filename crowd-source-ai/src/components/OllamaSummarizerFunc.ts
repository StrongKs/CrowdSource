import { Post } from "@/actions/post.action";

export const OllamaSummarizerFunction = async (post: Post): Promise<string> => {
  if (!post.content?.trim()) return "Error: No content available to summarize.";

  // Detailed prompt including all fields
  const prompt = `You are tasked with generating a concise summary of the following post. 
  The summary should include key points considering the author, content, location, and timestamps. 
  Make it brief and to the point.

  Here are the details of the post:
  - **Author:** ${post.author_name}
  - **Content:** ${post.content || "No content available"}
  - **Author's Latitude:** ${post.latitude}
  - **Author's Longitude:** ${post.longitude}
  - **Created At:** ${new Date(post.createdAt).toLocaleString()}
  - **Updated At:** ${new Date(post.updatedAt).toLocaleString()}

  Provide a clear summary and make sure to include all the key points without additional comments or explanations. Your output should only contain the summary itself.

  Summary:
  `;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-r1:1.5b",
        prompt: prompt,
        temperature: 0,
        stream: false,
      }),
    });

    const rawText = await response.text();
    console.log("Raw API Response:", rawText);

    const jsonMatches = rawText.match(/\{[^}]+\}/g);
    if (!jsonMatches) {
      return "Error: No valid JSON found in response.";
    }

    try {
      const lastJsonObject = JSON.parse(jsonMatches[jsonMatches.length - 1]);
      let summary = lastJsonObject.response || "No response received from Ollama.";

      // Remove unnecessary AI tags if they exist
      summary = summary.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

      return summary;
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError);
      return `Error parsing JSON: ${(jsonError as Error).message || "Unknown JSON error"}`;
    }
  } catch (error) {
    console.error("Error calling Ollama API:", error);
    return `Error generating summary: ${(error as Error).message || "Unknown error"}`;
  }
};
