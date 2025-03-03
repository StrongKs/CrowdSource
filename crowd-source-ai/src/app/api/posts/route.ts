import { NextResponse } from 'next/server';
import { addPosts, getPosts } from '@/actions/post.action';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

// ✅ Add this function to handle POST requests
export async function POST(req: Request) {
  try {
    const { author_name, content } = await req.json();

    // Validate input
    if (!author_name || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newPost = await addPosts(author_name, content);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
