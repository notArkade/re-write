import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { ArrowRight, Sparkles, Zap, Globe, Github } from 'lucide-react';

export default async function LandingPage() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-14 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Repurpose.ai
          </span>
        </div>
        <div className="flex items-center gap-4">
          {userId ? (
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-indigo-400 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium hover:text-white/80 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-8 backdrop-blur-sm">
          <Zap className="w-4 h-4" />
          <span>Transform a single post into a full campaign</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-sm">
          AI Driven Content Repurposing
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10">
          Turn your blog posts, articles, and scripts into highly engaging Twitter threads, LinkedIn posts, Instagram captions, and YouTube Shorts in seconds.
        </p>

        <Link
          href="/dashboard"
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-indigo-600 border border-indigo-500 rounded-full hover:bg-indigo-700 hover:scale-105 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
        >
          Start Repurposing
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-white/10">
        <p>© {new Date().getFullYear()} Repurpose.ai — Built for creators.</p>
      </footer>
    </div>
  );
}
