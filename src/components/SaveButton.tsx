"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface SaveButtonProps {
  postId: string;
}

export default function SaveButton({ postId }: SaveButtonProps) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "bookmarks", `${user.uid}_${postId}`)).then(snap => {
        setSaved(snap.exists());
      });
    }
  }, [user, postId]);

  const toggleSave = async () => {
    if (!user) return;

    const ref = doc(db, "bookmarks", `${user.uid}_${postId}`);
    if (saved) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, { uid: user.uid, postId });
    }
    setSaved(!saved);
  };

  return (
    <button onClick={toggleSave}>
      <Bookmark className={`w-7 h-7 transition ${saved ? "fill-black" : ""}`} />
    </button>
  );
}
