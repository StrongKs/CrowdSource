"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addDefaultPost } from "@/actions/db.action";
import { addPosts } from '@/actions/db.action'
import { useState } from 'react'

// function HomePage() {
//     return (
//       <div className="h-screen flex justify-center items-start">
//         <div className="max-w-sm mt-20">
//           <div className="grid w-full max-w-sm items-center gap-1.5">
//             <Input type="Title" id="Title" placeholder="Type your Name Here" />
//           </div>
//           <form action=""></form>
//           <div className="grid w-full gap-2">
//             <Textarea placeholder="Type your Message Here" />
//             <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100"
//               onClick={() => { 
//                 console.log("Post Created!"); 
//                 //addDefaultPost();
//                 addPosts(); 
//               }}
//             >
//             Send Message
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

// export default HomePage
export default function HomePage() {
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = async () => {
    if (!authorName.trim() || !message.trim()) {
      console.error("Both fields are required");
      return;
    }

    try {
      await addPosts(authorName, message);
      console.log("Post Created!");
      
      // Clear the inputs after successful post
      setAuthorName("");
      setMessage("");
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-start">
      <div className="max-w-sm mt-20">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            type="text"
            id="authorName"
            placeholder="Type your Name Here"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>

        <div className="grid w-full gap-2 mt-4">
          <Textarea
            placeholder="Type your Message Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="bg-white text-black border border-gray-300 hover:bg-gray-100"
            onClick={handlePost}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
