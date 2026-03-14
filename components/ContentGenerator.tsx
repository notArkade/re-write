'use client';

import { useState } from 'react';
import { Sparkles, CheckSquare, Square, Loader2 } from 'lucide-react';
import { OutputCard } from './OutputCard';
import { cn } from '@/lib/utils';

interface GeneratedResults {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export function ContentGenerator() {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState({
    twitter: true,
    linkedin: true,
    instagram: true,
    youtube: true,
  });
  
  const [loading, setLoading] = useState(false);
  const [regeneratingPlatform, setRegeneratingPlatform] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const togglePlatform = (key: keyof typeof platforms) => {
    setPlatforms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = async () => {
    if (!content.trim()) {
      setError('Please enter some content to repurpose.');
      return;
    }

    const selectedPlatforms = Object.entries(platforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => key);

    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, platforms: selectedPlatforms }),
      });

      if (!res.ok) {
        let errorMsg = 'Failed to generate content';
        try {
          const errData = await res.json();
          errorMsg = errData.error || errData.details || errorMsg;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegeneratePlatform = async (platform: string) => {
    setRegeneratingPlatform(platform);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, platforms: [platform] }),
      });

      if (!res.ok) {
        throw new Error(`Failed to regenerate ${platform} content`);
      }

      const data = await res.json();
      setResults(prev => prev ? { ...prev, [platform]: data[platform] } : data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setRegeneratingPlatform(null);
    }
  };

  const platformOptions = [
    { id: 'twitter', label: 'Twitter/X Thread', color: 'hover:text-sky-400 hover:border-sky-400/50' },
    { id: 'linkedin', label: 'LinkedIn Post', color: 'hover:text-blue-500 hover:border-blue-500/50' },
    { id: 'instagram', label: 'Instagram Caption', color: 'hover:text-pink-500 hover:border-pink-500/50' },
    { id: 'youtube', label: 'YouTube Short Script', color: 'hover:text-red-500 hover:border-red-500/50' },
  ] as const;

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-x-0 -top-px h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Repurpose Content
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-400">
              Input Content (Blog/Article/Script)
            </label>
            <textarea
              className="w-full h-48 bg-neutral-950/50 border border-white/10 rounded-xl p-4 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all"
              placeholder="Paste your long-form content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-neutral-400">
              Select Output Platforms
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 border border-white/5 p-2 rounded-xl bg-neutral-950/30">
              {platformOptions.map((option) => {
                const isSelected = platforms[option.id as keyof typeof platforms];
                return (
                  <button
                    key={option.id}
                    onClick={() => togglePlatform(option.id as keyof typeof platforms)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all text-sm font-medium text-left",
                      isSelected 
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300" 
                        : "bg-white/5 border-transparent text-neutral-400 hover:bg-white/10"
                    )}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 opacity-50" />
                    )}
                    <span className="truncate">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white transition-all duration-300 bg-indigo-600 border border-indigo-500 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full md:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  Generate Content
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 fade-in-up">
          {Object.entries(results).map(([platform, output]) => {
            if (!output) return null;
            return (
              <div key={platform} className="h-96">
                <OutputCard
                  platform={platform}
                  content={output as string}
                  onRegenerate={() => handleRegeneratePlatform(platform)}
                  isRegenerating={regeneratingPlatform === platform}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
