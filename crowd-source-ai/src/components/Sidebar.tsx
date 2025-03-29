"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getPosts } from "@/actions/post.action";
import { OllamaSummarizerFunction } from "@/components/OllamaSummarizerFunc";

export default function Sidebar() {
  const [summaries, setSummaries] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [viewMode, setViewMode] = useState<"original" | "summary" | "generatedSummary">("original");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track AI summarization progress

  useEffect(() => {
    fetchOriginalPosts();
  }, []);

  // Function to fetch original posts from the database
  const fetchOriginalPosts = async () => {
    setLoading(true);
    setProgress(0);
    try {
      const posts = await getPosts();
      setOriginalPosts(posts);
      setSummaries([]); // Clear summaries when fetching new posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  // Function to generate summaries using Ollama with Progress Bar
  const fetchSummaries = async () => {
    if (originalPosts.length === 0) return;

    setLoading(true);
    setSummaries([]);
    setProgress(0); // Reset progress

    try {
      const summarizedPosts = [];
      for (let i = 0; i < originalPosts.length; i++) {
        const summary = await OllamaSummarizerFunction(originalPosts[i].content);
        summarizedPosts.push({ ...originalPosts[i], summary });
        setProgress(Math.round(((i + 1) / originalPosts.length) * 100)); // Update progress
      }
      setSummaries(summarizedPosts);
      setViewMode("summary");
    } catch (error) {
      console.error("Error generating summaries:", error);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full lg:w-1/4 min-h-screen bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 
    flex flex-col fixed left-0 top-16">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {viewMode === "original" 
            ? "Recent Posts" 
            : viewMode === "summary"
            ? "Summaries (AI Rerun)"
            : "Generated Summaries"}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto max-h-[calc(100vh-250px)]">
        {loading ? (
          <>
            <div className="flex justify-center">
              <Loader2 className="animate-spin h-6 w-6" />
            </div>
            {/* Progress Bar */}
            {progress > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Summarizing... {progress}%</p>
                <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </>
        ) : (
          <ul className="space-y-3">
            {(viewMode === "original" ? originalPosts : summaries).length > 0 ? (
              (viewMode === "original" ? originalPosts : summaries).map((post, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 border-b pb-2">
                  {viewMode === "original" ? post.content : post.summary || "No summary available"}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No posts available.</p>
            )}
          </ul>
        )}
      </CardContent>

      {/* Section for Display Control Buttons */}
      <CardFooter className="flex space-x-2 pb-2">
        <Button onClick={() => setViewMode("original")} disabled={viewMode === "original"}>
          Original Posts
        </Button>

        <Button
          onClick={() => setViewMode("generatedSummary")}
          disabled={summaries.length === 0 || viewMode === "generatedSummary"}
        >
          Generated Summary
        </Button>
      </CardFooter>

      {/* Section for AI and Refresh Actions */}
      <CardFooter className="flex space-x-2 pt-2 border-t">
        <Button
          onClick={fetchSummaries}
          disabled={loading}
        >
          AI Summarization
        </Button>

        <Button onClick={fetchOriginalPosts} disabled={viewMode === "summary" || loading}>
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}
