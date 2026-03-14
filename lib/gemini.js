import { GoogleGenAI } from "@google/genai";

const apiKey = (process.env.GEMINI_API_KEY || "").trim();

if (!apiKey) {
  console.warn("Missing GEMINI_API_KEY environment variable");
}

export const gemini = new GoogleGenAI({ apiKey });
