"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, History, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/history", label: "History", icon: History },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="w-64 border-r border-white/10 bg-neutral-900/50 p-4 shrink-0 flex-col hidden md:flex min-h-screen">
        <div className="flex items-center gap-2 mb-10 px-2 py-2">
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

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/10 flex items-center justify-between px-4 bg-neutral-950/80 backdrop-blur-md z-40">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-dashboard-menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        <Link href="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 space-mono">
          Re: Write
        </Link>

        <UserButton afterSignOutUrl="/" />
      </div>

      <div
        className={cn(
          "md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-dashboard-menu"
        className={cn(
          "md:hidden fixed top-16 left-0 right-0 z-40 border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl transition-all duration-200",
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 pointer-events-none opacity-0",
        )}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                    : "border-white/10 bg-white/[0.03] text-neutral-200 hover:bg-white/10",
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-sm font-medium text-neutral-200">Account</span>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
