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
} from "lucide-react";
import { Button } from "./ui/button";

import ImageUpload from "./ImageUpload";
import { addPostsW_Coordinates } from "@/actions/post.action";

function CreatePost() {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
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

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;
    setIsPosting(true);
    try {
      const res = await addPostsW_Coordinates(
        "author_name",
        content,
        location.latitude ?? 0,
        location.longitude ?? 0,
        imageUrl ?? ""
      );

      console.log("Content:", content);
      console.log("Contact Info:", contactInfo);
      console.log("Location:", location);
      console.log("image:",imageUrl )
      console.log(
        "Post created successfully with content but not actual author name"
      );
      if (res?.sucess) {
        // reset the form
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsPosting(false);
    }
  };

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
          <div className="flex space-x-4">
            <Textarea
              placeholder="What's happening near you?"
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
          {showContactInfo && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-transparent rounded-lg p-4 w-96">
                <h2 className="text-lg font-bold mb-2">Add Contact Info</h2>
                <input
                  type="text"
                  placeholder="Enter your contact info"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-lg"
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => setShowContactInfo(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
                    onClick={() => setShowContactInfo(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          {showManualLocation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-transparent rounded-lg p-4 w-96">
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
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => setShowManualLocation(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
                    onClick={handleSaveManualLocation}
                  >
                    Save
                  </button>
                </div>
              </div>
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
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary truncate max-w-[150px]"
                onClick={() => setShowManualLocation(true)}
                disabled={isPosting}
              >
                <MapPinIcon className="size-4 mr-2" />
                {location.latitude && location.longitude
                  ? `Lat: ${location.latitude.toFixed(
                      2
                    )}, Lng: ${location.longitude.toFixed(2)}`
                  : "Set Location"}
              </Button>
              <Button
                className="flex items-center whitespace-nowrap"
                onClick={handleSubmit}
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
                    Post
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
