export const OllamaSummarizerFunction = async (message: string): Promise<string> => {
  if (!message.trim()) return "";

  const prompt = `Your task is to summarize the message the user posted. Please ensure you capture all the key points and your summarization should be as short as possible.\n\nHere is the message:\n${message}\n\nOutput your summarization and nothing else. Do not include any explanations, reasoning, or additional comments—only the final summary itself.`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-r1:1.5b", // ✅ Using DeepSeek model
        prompt: prompt,
        temperature: 0,
        stream: false, // Ensure a single JSON response
      }),
    });

    const rawText = await response.text();
    console.log("Raw API Response:", rawText);

    // Extract JSON response if there are multiple JSON objects
    const jsonMatches = rawText.match(/\{[^}]+\}/g);
    if (!jsonMatches) {
      return "Error: No valid JSON found in response.";
    }

    try {
      const lastJsonObject = JSON.parse(jsonMatches[jsonMatches.length - 1]); // Parse last JSON object
      let summary = lastJsonObject.response || "No response received from Ollama.";

      // 🔥 Remove any <think> ... </think> text if present
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
