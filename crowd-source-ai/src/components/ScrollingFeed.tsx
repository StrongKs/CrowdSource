'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Post {
  id: string;
  author_name: string;
  content?: string;
  image?: string;
  createdAt: string;
}

const ScrollingFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="h-screen overflow-y-auto p-4">
      <h2 className="text-white text-2xl mb-4">Recent Posts</h2>
      {isLoading ? (
        <p className="text-gray-400" data-testid="loading-text">Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-gray-800 text-white p-4 rounded-lg mb-4 shadow-md">
            <h3 className="font-bold">{post.author_name}</h3>
            <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
            <p className="mt-2">{post.content}</p>
            {post.image && (
              <div className="mt-2">
                <Image
                  src={post.image}
                  alt="Post Image"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ScrollingFeed;
