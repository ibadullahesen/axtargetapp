"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

interface PostCardProps {
  post: any;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-dashed" />
        <Link href={`/u/${post.username}`} className="font-medium">
          @{post.username}
        </Link>
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
        <div className="flex justify-between items-center mb-3">
          <LikeButton postId={post.id} initialLikes={post.likes || 0} />
          <SaveButton postId={post.id} />
        </div>
        {post.description && (
          <p className="text-sm mt-2">{post.description}</p>
        )}
      </div>
    </div>
  );
}
