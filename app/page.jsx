import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import HoverText from "../components/HoverText";
import MagnifyParagraph from "../components/MagnifyParagraph";
import { MdPlayArrow } from "react-icons/md";

export default async function LandingPage() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen grid-bg -z-10">
      <header className="px-6 lg:px-60 py-8 flex items-center justify-between border-b border-indigo-500/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 space-mono">
            Re: Write
          </span>
        </div>
        <div className="flex items-center gap-4">
          {userId ? (
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-indigo-400 transition-colors border border-indigo-500/50 px-4 py-2 rounded-lg"
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
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" /> */}

        <div className="relative select-none">
          <h1 className="text-9xl space-mono mb-8">Re: Write</h1>
          <h1 className="absolute top-1 text-9xl space-mono text-indigo-500 mb-8">
            Re: Write
          </h1>
        </div>
        <MagnifyParagraph
          text={`Turn your blog posts, articles, and scripts into highly engaging
  Twitter threads, LinkedIn posts, Instagram captions, and YouTube
  Shorts in seconds.`}
        />

        <Link
          href="/dashboard"
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base space-mono uppercase tracking-[0.1em] font-semibold bg-[#111111] text-white transition-all duration-300 border border-indigo-500 rounded-lg hover:bg-indigo-700 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
        >
          Start
          <span>
            <HoverText>Repurposing</HoverText>
          </span>
          <MdPlayArrow className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </main>

      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-indigo-500/50 backdrop-blur-md">
        <p>© {new Date().getFullYear()} — Re: Write</p>
        <p>Built for creators. By creators.</p>
      </footer>
    </div>
  );
}
