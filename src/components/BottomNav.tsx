"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", icon: Home },
    { href: "/explore", icon: Search },
    { href: "/upload", icon: PlusSquare },
    { href: "/notifications", icon: Heart },
    { href: "/u/me", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 sm:hidden">
      <div className="flex justify-around py-2">
        {items.map(({ href, icon: Icon }) => (
          <Link key={href} href={href} className="p-3">
            <Icon className={`w-6 h-6 ${pathname === href ? "text-black" : "text-gray-600"}`} />
          </Link>
        ))}
      </div>
    </div>
  );
}
