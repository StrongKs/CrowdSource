import { NextResponse } from 'next/server';
import { getPosts } from '@/actions/post.action';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}
