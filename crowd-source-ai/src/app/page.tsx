import { Card } from "@/components/ui/card";
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
  let aiSummaryText: string = " According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second. Hello? - Barry? - Adam? - Oan you believe this is happening? - I can't. I'll pick you up. Looking sharp. Use the stairs. Your father paid good money for those. Sorry. I'm excited. Here's the graduate. ";
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
        <Card>
          <h2 className="px-4 py-2 text-lg font-semibold text-gray-900 dark:text-gray-100">AI Summary</h2>
          <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{aiSummaryText}</p>
        </Card>
      </div>
    </div>
  );
}