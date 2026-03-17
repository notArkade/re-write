import { ContentGenerator } from "@/components/ContentGenerator";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 space-mono">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 uppercase">
          Creation Studio
        </h1>
        <p className="text-neutral-500 text-sm">
          Paste your content below to automatically generate engaging social
          media posts tailored to your selected platforms.
        </p>
      </div>

      <ContentGenerator />
    </div>
  );
}
