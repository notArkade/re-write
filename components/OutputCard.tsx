'use client';

import { CopyButton } from './CopyButton';
import { RefreshCw } from 'lucide-react';

interface OutputCardProps {
  platform: string;
  content: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export function OutputCard({ platform, content, onRegenerate, isRegenerating }: OutputCardProps) {
  if (!content) return null;

  return (
    <div className="bg-neutral-900 overflow-hidden rounded-xl border border-white/10 flex flex-col h-full hover:border-indigo-500/50 transition-colors">
      <div className="px-4 py-3 bg-neutral-900/50 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm capitalize text-indigo-400">
            {platform}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="p-2 rounded-md bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Regenerate this specific post"
            >
              <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            </button>
          )}
          <CopyButton text={content} />
        </div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="whitespace-pre-wrap text-sm text-neutral-300 leading-relaxed font-mono">
          {content}
        </p>
      </div>
    </div>
  );
}
