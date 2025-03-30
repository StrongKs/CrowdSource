"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import {
  ImageIcon,
  Loader2Icon,
  SendIcon,
  PhoneIcon,
  MapPinIcon,
  SparklesIcon
} from "lucide-react";
import { Button } from "./ui/button";
import ImageUpload from "./ImageUpload";
import { addPostsW_Coordinates } from "@/actions/post.action";
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
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [manualLatitude, setManualLatitude] = useState("");
  const [manualLongitude, setManualLongitude] = useState("");

  // Get user's location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ latitude: null, longitude: null });
        }
      );
    } else {
      setLocation({ latitude: null, longitude: null });
    }
  }, []);

  // Function to post original content
  const handlePostOriginal = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      await addPostsW_Coordinates(
        "author_name",
        content,
        location.latitude ?? 0,
        location.longitude ?? 0
      );
      console.log("Posted Original Content: " + content);
      // Clear input and image
      setContent("");
      setImageUrl("");
      setSummary("");
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  // Function to post AI-generated summary
  const handlePostSummary = async () => {
    if (!summary.trim()) return;

    setIsPosting(true);
    try {
      await addPostsW_Coordinates(
        "author_name",
        summary,
        location.latitude ?? 0,
        location.longitude ?? 0
      );
      console.log("Posted AI Summary: " + summary);
      setSummary("");
      setContent("");
      setImageUrl("");
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

  // Function to save manual location
  const handleSaveManualLocation = () => {
    const lat = parseFloat(manualLatitude);
    const lng = parseFloat(manualLongitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      setLocation({ latitude: lat, longitude: lng });
      setShowManualLocation(false);
    } else {
      alert("Please enter valid coordinates.");
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Text Input */}
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
          />

          {/* Image Upload */}
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

          {/* AI Summary Display */}
          {summary && (
            <div className="p-3 bg-gray-100 border rounded-md">
              <h3 className="font-semibold text-gray-700">AI Summary:</h3>
              <p className="text-gray-600">{summary}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button onClick={() => setShowImageUpload(!showImageUpload)}>
                <ImageIcon className="size-4 mr-2" /> Photo
              </Button>
              <Button onClick={() => setShowContactInfo(!showContactInfo)}>
                <PhoneIcon className="size-4 mr-2" /> Contact Info
              </Button>
              <Button onClick={handleSummarize} disabled={loadingSummary || isPosting}>
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
              <Button onClick={handlePostOriginal} disabled={(!content.trim() && !imageUrl) || isPosting}>
                {isPosting ? "Posting..." : "Post Original"}
              </Button>
              <Button onClick={handlePostSummary} disabled={!summary.trim() || isPosting}>
                {isPosting ? "Posting..." : "Post Summary"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
