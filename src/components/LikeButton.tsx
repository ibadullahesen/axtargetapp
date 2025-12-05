"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "likes", `${user.uid}_${postId}`)).then(snap => {
        setLiked(snap.exists());
      });
    }
  }, [user, postId]);

  const toggleLike = async () => {
    if (!user) return;

    const likeRef = doc(db, "likes", `${user.uid}_${postId}`);

    if (liked) {
      await deleteDoc(likeRef);
      setLikes(likes - 1);
    } else {
      await setDoc(likeRef, { uid: user.uid, postId });
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <button onClick={toggleLike} className="flex items-center gap-2">
      <Heart className={`w-7 h-7 transition ${liked ? "fill-red-500 text-red-500" : ""}`} />
      {likes > 0 && <span className="text-sm font-medium">{likes}</span>}
    </button>
  );
}
