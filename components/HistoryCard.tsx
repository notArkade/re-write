'use client';

import { CopyButton } from './CopyButton';
import { Clock } from 'lucide-react';

interface HistoryRecord {
  id: string;
  input_content: string;
  twitter_output: string | null;
  linkedin_output: string | null;
  instagram_output: string | null;
  youtube_output: string | null;
  created_at: string;
}

interface HistoryCardProps {
  record: HistoryRecord;
}

export function HistoryCard({ record }: HistoryCardProps) {
  const date = new Date(record.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getTruncatedInput = (text: string) => {
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  const platforms = [
    { name: 'Twitter', content: record.twitter_output },
    { name: 'LinkedIn', content: record.linkedin_output },
    { name: 'Instagram', content: record.instagram_output },
    { name: 'YouTube', content: record.youtube_output },
  ].filter((p) => p.content);

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
      <div className="p-4 border-b border-white/5 bg-neutral-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium">
          <Clock className="w-4 h-4" />
          {date}
        </div>
      </div>
      
      <div className="p-4 border-b border-white/5 bg-neutral-950/50">
        <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2 block">
          Original Input
        </span>
        <p className="text-sm text-neutral-300 italic">
          "{getTruncatedInput(record.input_content)}"
        </p>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-indigo-400">
                {platform.name}
              </span>
              <CopyButton text={platform.content!} className="bg-transparent border-none hover:bg-white/5" />
            </div>
            <p className="text-sm text-neutral-300 font-mono whitespace-pre-wrap pl-2 border-l-2 border-indigo-500/20">
              {platform.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
