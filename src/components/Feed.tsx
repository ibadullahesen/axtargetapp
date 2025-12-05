"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("status", "==", true),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
      setLoading(false);
    };
    if (user) fetchPosts();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="pt-16 pb-20 max-w-2xl mx-auto">
        {loading ? (
          <div className="space-y-8 p-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Hələ paylaşım yoxdur</p>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
