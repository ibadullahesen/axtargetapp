"use client";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-40">
      <div className="max-w-2xl mx-auto px-4 py-3 flex justify-center items-center">
        <Link href="/" className="text-2xl font-bold">AxtarGet</Link>
      </div>
    </div>
  );
}
