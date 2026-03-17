import { Navbar } from "@/components/Navbar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-50 relative selection:bg-indigo-500/30">
      <Navbar />

      {/* Mobile top bar */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-16 border-b border-white/10 flex items-center justify-between px-4 bg-neutral-950/80 backdrop-blur-md z-40">
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Re: Write
        </span>
        <UserButton afterSignOutUrl="/" />
      </div>

      <main className="flex-1 max-w-full mx-auto p-4 pt-20 md:p-10 md:pt-10 overflow-y-auto grid-bg">
        {children}
      </main>
    </div>
  );
}
