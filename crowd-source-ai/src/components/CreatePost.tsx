"use client";

// import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
// import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Loader2Icon, SendIcon, PhoneIcon } from "lucide-react";
import { Button } from "./ui/button";
// import { createPost } from "@/actions/post.action";
// import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { addDefaultPost, addPosts } from "@/actions/post.action";

function CreatePost() {
//   const { user } = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  //For determining if the contact info input box is visible
  const [showContactInfo, setShowContactInfo] = useState(false);
  //Variable containing the user inputted contact info
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      //Uncomment the contactInfo when connecting to the backend
      addPosts("author_name", content/*, contactInfo*/); // we need to create UI for author_name
      console.log("Content " + content);
      console.log("Contact Info: " + contactInfo);
      console.log("Post created successfully with content but not actual author name");
      // const result = await createPost(content, imageUrl);
      // if (result?.success) {
      //   // reset the form
      //   setContent("");
      //   setImageUrl("");
      //   setShowImageUpload(false);

      //   toast.success("Post created successfully");
      // }
    } catch (error) {
      console.error("Failed to create post:", error);
      // toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            {/* <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} />
            </Avatar> */}
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
                    onClick={() => {
                      // You can add a function here to handle the contact info submission
                      setShowContactInfo(false);
                    }}
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
            </div>
            <Button
              className="flex items-center"
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
      </CardContent>
    </Card>
  );
}
export default CreatePost;