"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { getPosts, Post } from "@/actions/post.action";
import { OllamaSummarizerFunction } from "@/components/OllamaSummarizerFunc";

// Type guard to check if a post has a summary
function isSummarizedPost(post: Post | (Post & { summary: string })): post is Post & { summary: string } {
  return (post as Post & { summary: string }).summary !== undefined;
}

export default function Sidebar() {
  // State with proper types
  const [summaries, setSummaries] = useState<(Post & { summary: string })[]>([]);
  const [originalPosts, setOriginalPosts] = useState<Post[]>([]);
  const [viewMode, setViewMode] = useState<"original" | "summary" | "generatedSummary">("original");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchOriginalPosts();
  }, []);

  // Fetch original posts from the database
  const fetchOriginalPosts = async () => {
    setLoading(true);
    setProgress(0);
    try {
      const posts = await getPosts();
      setOriginalPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  // Generate summaries using Ollama with a progress bar using full post details
  const fetchSummaries = async () => {
    if (originalPosts.length === 0) return;

    setLoading(true);
    setSummaries([]);
    setProgress(0);

    try {
      const summarizedPosts = [];
      for (let i = 0; i < originalPosts.length; i++) {
        const summary = await OllamaSummarizerFunction(originalPosts[i]);
        summarizedPosts.push({ ...originalPosts[i], summary });
        setProgress(Math.round(((i + 1) / originalPosts.length) * 100));
      }
      setSummaries(summarizedPosts);
      setViewMode("generatedSummary"); // Automatically switch to summary view
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
              (viewMode === "original" ? originalPosts : summaries).map((post) => (
                <li key={String(post.id)} className="text-sm text-gray-700 dark:text-gray-300 border-b pb-4">
                  
                  {/* Display Based on View Mode */}
                  {viewMode === "generatedSummary" ? (
                    <>
                      {/* Show Only Summary */}
                      {isSummarizedPost(post) ? (
                        <p><strong>Summary:</strong> {post.summary}</p>
                      ) : (
                        <p>No summary available.</p>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Show Original Post Details */}
                      <p><strong>Author:</strong> {post.author_name}</p>
                      <p><strong>Content:</strong> {post.content || "No Content"}</p>
                      {post.image ? (
                        <div className="my-2">
                          <Image
                            src={post.image}
                            alt="Post Image"
                            width={300}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      ) : (
                        <p><strong>Image:</strong> No Image Available</p>
                      )}
                      <p><strong>Latitude:</strong> {post.latitude}</p>
                      <p><strong>Longitude:</strong> {post.longitude}</p>
                      <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                      <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}</p>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No posts available.</p>
            )}
          </ul>
        )}
      </CardContent>

      {/* Display Control Buttons */}
      <CardFooter className="flex space-x-2 pb-2">
        <Button onClick={() => setViewMode("original")} disabled={viewMode === "original"}>
          Original Posts
        </Button>

        <Button
          onClick={() => {
            if (summaries.length > 0) {
              setViewMode("generatedSummary");
            } else {
              console.error("No summaries available. Please generate summaries first.");
            }
          }}
          disabled={summaries.length === 0 || viewMode === "generatedSummary"}
        >
          Generated Summary
        </Button>
      </CardFooter>

      {/* AI and Refresh Actions */}
      <CardFooter className="flex space-x-2 pt-2 border-t">
        <Button onClick={fetchSummaries} disabled={loading}>
          AI Summarization
        </Button>

        {/* Disable Refresh when viewing Summary */}
        <Button onClick={fetchOriginalPosts} disabled={viewMode === "generatedSummary" || loading}>
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}
