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
import { OllamaSummarizerFunction } from "./OllamaSummarizerFunc";

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

  // Automatically detect user's location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(`Detected Location: Latitude ${latitude}, Longitude ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ latitude: null, longitude: null });
        }
      );
    }
  }, []);

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

          {/* Display Detected Location */}
          <p className="text-sm text-gray-500">
            📍 Current Location: 
            {location.latitude !== null && location.longitude !== null
              ? ` Latitude: ${location.latitude}, Longitude: ${location.longitude}`
              : " Unable to detect location"}
          </p>

          {/* Manual Location Input */}
          {showManualLocation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-4 w-96 shadow-lg">
                <h2 className="text-lg font-bold mb-2">Enter Coordinates</h2>
                <input
                  type="text"
                  placeholder="Latitude"
                  value={manualLatitude}
                  onChange={(e) => setManualLatitude(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-400 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Longitude"
                  value={manualLongitude}
                  onChange={(e) => setManualLongitude(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-400 rounded-lg"
                />
                <div className="flex justify-end mt-2">
                  <Button onClick={() => setShowManualLocation(false)}>Cancel</Button>
                  <Button onClick={handleSaveManualLocation} className="ml-2">Save</Button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
            <Button onClick={() => setShowImageUpload(!showImageUpload)}>
              <ImageIcon className="size-4 mr-2" /> Photo
            </Button>
            <Button onClick={() => setShowManualLocation(true)}>
              <MapPinIcon className="size-4 mr-2" /> Edit Location
            </Button>
            <Button onClick={handleSummarize} disabled={loadingSummary || isPosting}>
              {loadingSummary ? "Summarizing..." : "Summarize"}
            </Button>
          </div>

          {/* Post Buttons */}
          <div className="flex flex-col space-y-2 w-full">
            <Button onClick={handlePostOriginal} disabled={(!content.trim() && !imageUrl) || isPosting}>
              {isPosting ? "Posting..." : "Post Original"}
            </Button>
            <Button onClick={handlePostSummary} disabled={!summary.trim() || isPosting}>
              {isPosting ? "Posting..." : "Post Summary"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;