"use client";
// import { getPosts } from "@/actions/post.action";
// import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
// import PostCard from "@/components/PostCard";
// import WhoToFollow from "@/components/WhoToFollow";
// import { currentUser } from "@clerk/nextjs/server";
import ScrollingFeed from "@/components/ScrollingFeed";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"


export default async function Home() {
  // const user = await currentUser();
  // const posts = await getPosts();
  // const dbUserId = await getDbUserId();
  
  //UPDATE THIS POSITION WITH THE POSITION GRABBED FROM THE USER
  const position = { lat:29.64833, lng:-82.34944 };

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
        <ScrollingFeed />
      </div>

      <div style={ {height: "40vh"} }className="hidden lg:block lg:col-span-4 sticky top-20">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map zoom = {12} center={position}></Map>
          </APIProvider>
      </div>
    </div>
  );
}