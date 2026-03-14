import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { gemini } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { content, platforms } = body;

    if (
      !content ||
      !platforms ||
      !Array.isArray(platforms) ||
      platforms.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing content or platforms" },
        { status: 400 },
      );
    }

    // Build platform specific asks
    const platformPrompts = {
      twitter: '1. "twitter": A Twitter thread (5-7 tweets)',
      linkedin: '2. "linkedin": A LinkedIn post (professional tone)',
      instagram:
        '3. "instagram": An Instagram caption with emojis and hashtags',
      youtube: '4. "youtube": A YouTube short script (30-45 seconds)',
    };

    const requestedFormats = platforms
      .map((p) => platformPrompts[p])
      .filter(Boolean)
      .join("\n");

    const prompt = `Convert the following content into social media posts.

Content:
${content}

Generate the following formats (only for the requested ones):
${requestedFormats}

You MUST return the output as a valid JSON object. Do NOT wrap it in Markdown code blocks (like \`\`\`json). Just the raw JSON object. Use the exact keys: ${platforms.map((p) => `"${p}"`).join(", ")}. The values should be the generated text strings.`;

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are a senior social media manager and AI copywriter. Output strictly valid JSON without any markdown formatting.",
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    // Clean up potential markdown formatting just in case Claude didn't listen
    const cleanJsonString = responseText
      .replace(/```json\n?|\n?```/g, "")
      .trim();
    let generatedData;
    try {
      generatedData = JSON.parse(cleanJsonString);
    } catch (parseError) {
      console.error("Failed to parse Claude response as JSON", responseText);
      return NextResponse.json(
        {
          error: "Failed to generate content in expected format",
          details: responseText,
        },
        { status: 500 },
      );
    }

    // Prepare data for DB
    const dbRecord = {
      user_id: userId,
      input_content: content,
      twitter_output: generatedData.twitter || null,
      linkedin_output: generatedData.linkedin || null,
      instagram_output: generatedData.instagram || null,
      youtube_output: generatedData.youtube || null,
    };

    // Save to Supabase DB (We only insert if we generated more than 0 items)
    if (Object.keys(generatedData).length > 0) {
      const { error: dbError } = await supabase
        .from("content_history")
        .insert([dbRecord]);

      if (dbError) {
        console.error("Failed to save to Supabase:", dbError);
      }
    }

    return NextResponse.json(generatedData);
  } catch (error) {
    console.error("Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
