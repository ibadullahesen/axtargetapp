"use client";

import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";

interface PostCardProps {
  post: any;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div>
          <p className="font-medium">@{post.username || "user"}</p>
        </div>
      </div>

      <div className="relative aspect-square bg-gray-100">
        <Image
          src={post.imageUrl}
          alt="Post"
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex gap-4 mb-3">
          <button className="hover:text-red-500 transition">
            <Heart className="w-7 h-7" />
          </button>
          <button className="hover:text-blue-500 transition">
            <Bookmark className="w-7 h-7" />
          </button>
        </div>
        {post.description && (
          <p className="text-sm">{post.description}</p>
        )}
      </div>
    </div>
  );
}
