'use client';

import { useState } from 'react';
import CreatePost from '@/components/CreatePost';
import ScrollingFeed from '@/components/ScrollingFeed';

export default function Home() {

  return (
    <div className="flex min-h-screen">

      {/* Main content area */}
      <div className="flex-1 p-4">
        <CreatePost />
        <ScrollingFeed />
      </div>
    </div>
  );
}
