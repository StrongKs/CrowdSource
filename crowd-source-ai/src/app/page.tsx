// import { getPosts } from "@/actions/post.action";
// import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
// import PostCard from "@/components/PostCard";
// import WhoToFollow from "@/components/WhoToFollow";
// import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  // const user = await currentUser();
  // const posts = await getPosts();
  // const dbUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {/* {user ? <CreatePost /> : null} */}
        <CreatePost />
        {/* <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div> */}
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        {/* <WhoToFollow /> */}
        Another possible side bar
      </div>
    </div>
  );
}


// "use client"
// import React from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'

// function HomePage() {
//     return (
//       <div className="h-screen flex justify-center items-start">
//         <div className="max-w-sm mt-20">
//           <div className="grid w-full max-w-sm items-center gap-1.5">
//             <Input type="Title" id="Title" placeholder="Type your Title Here" />
//           </div>
//           <form action=""></form>
//           <div className="grid w-full gap-2">
//             <Textarea placeholder="Type your Message Here" />
//             <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100">
//             Send message
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

// export default HomePage
