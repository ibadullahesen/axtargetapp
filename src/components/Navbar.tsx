"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

export default function Navbar() {
  const { profile } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-40">
      <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">AxtarGet</Link>
        
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="Axtar..."
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none"
          />
        </div>

        <Link href={`/u/${profile?.username || ""}`}>
          <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-dashed" />
        </Link>
      </div>
    </div>
  );
}
