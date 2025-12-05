"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Ana səhifə" },
    { href: "/explore", icon: Search, label: "Kəşf et" },
    { href: "/upload", icon: PlusSquare, label: "Yüklə" },
    { href: "/notifications", icon: Heart, label: "Bildirişlər" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 sm:hidden">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="p-3">
              <Icon className={`w-6 h-6 ${isActive ? "text-black" : "text-gray-600"}`} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
