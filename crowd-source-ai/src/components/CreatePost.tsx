"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Loader2Icon, SendIcon, PhoneIcon, SparklesIcon } from "lucide-react";
import { Button } from "./ui/button";
import ImageUpload from "./ImageUpload";
import { addPosts } from "@/actions/post.action";
import { OllamaSummarizerFunction } from "./OllamaSummarizerFunc"; // ✅ Import AI function

function CreatePost() {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [summary, setSummary] = useState(""); 
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState("");

  // Function to post original content
  const handlePostOriginal = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      addPosts("author_name", content);
      console.log("Posted Original Content: " + content);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  // Function to post AI summary
  const handlePostSummary = async () => {
    if (!summary.trim()) return; 

    setIsPosting(true);
    try {
      addPosts("author_name", summary);
      console.log("Posted AI Summary: " + summary);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  // Function to generate AI summary
  const handleSummarize = async () => {
    if (!content.trim()) return;
    
    setLoadingSummary(true);
    try {
      const summaryResult = await OllamaSummarizerFunction(content);
      setSummary(summaryResult); 
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Error generating summary.");
    }
    setLoadingSummary(false);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}

          {summary && (
            <div className="p-3 bg-gray-100 border rounded-md">
              <h3 className="font-semibold text-gray-700">AI Summary:</h3>
              <p className="text-gray-600">{summary}</p>
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowContactInfo(!showContactInfo)}
                disabled={isPosting}
              >
                <PhoneIcon className="size-4 mr-2" />
                Contact Info
              </Button>
              {/* 🔥 AI Summarization Button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={handleSummarize}
                disabled={loadingSummary || isPosting}
              >
                {loadingSummary ? (
                  <>
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="size-4 mr-2" />
                    Summarize
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-col space-y-2 w-full">
              <Button
                className="flex items-center text-sm px-3 py-1 w-full"
                onClick={handlePostOriginal}
                disabled={(!content.trim() && !imageUrl) || isPosting}
              >
                {isPosting ? (
                  <>
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <SendIcon className="size-4 mr-2" />
                    Post Original
                  </>
                )}
              </Button>

              <Button
                className="flex items-center text-sm px-3 py-1 w-full"
                onClick={handlePostSummary}
                disabled={!summary.trim() || isPosting}
              >
                {isPosting ? (
                  <>
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <SendIcon className="size-4 mr-1" />
                    Post Summary
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
