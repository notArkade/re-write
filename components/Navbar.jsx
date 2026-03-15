"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Sparkles, LayoutDashboard, History } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/history", label: "History", icon: History },
  ];

  return (
    <nav className="w-64 border-r border-white/10 bg-neutral-900/50 p-4 shrink-0 flex flex-col hidden md:flex min-h-screen">
      <div className="flex items-center gap-2 mb-10 px-2 py-2">
        {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div> */}
        <Link href="/">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 space-mono">
            Re: Write
          </span>
        </Link>
      </div>

      <div className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3 px-2">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />

        <span className="text-sm text-neutral-400 font-medium truncate">
          My Account
        </span>
      </div>
    </nav>
  );
}
