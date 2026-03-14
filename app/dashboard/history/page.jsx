import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { HistoryCard } from "@/components/HistoryCard";
import { History as HistoryIcon } from "lucide-react";

export const revalidate = 0; // Dynamic route

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Fetch history
  const { data: history, error } = await supabase
    .from("content_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch history:", error);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 flex items-center gap-3">
          <HistoryIcon className="w-8 h-8 text-indigo-400" />
          Generation History
        </h1>
        <p className="text-neutral-500 text-sm max-w-xl">
          View all your previously repurposed content across platforms.
        </p>
      </div>

      {!history || history.length === 0 ? (
        <div className="p-10 border border-white/5 rounded-2xl bg-neutral-900/30 text-center flex flex-col items-center gap-2">
          <HistoryIcon className="w-10 h-10 text-neutral-600 mb-2" />
          <p className="text-neutral-400 font-medium">No history found</p>
          <p className="text-sm text-neutral-500">
            Generate some content first to see it here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 pb-20 fade-in-up">
          {history.map((record) => (
            <HistoryCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
}
