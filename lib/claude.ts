import Anthropic from '@anthropic-ai/sdk';

if (!process.env.CLAUDE_API_KEY) {
  console.warn('Missing CLAUDE_API_KEY environment variable');
}

export const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});
