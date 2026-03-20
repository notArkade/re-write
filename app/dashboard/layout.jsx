import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-50 relative selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-1 max-w-full mx-auto p-4 pt-20 md:p-10 md:pt-10 overflow-y-auto grid-bg">
        {children}
      </main>
    </div>
  );
}
