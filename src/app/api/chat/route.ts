import Anthropic from "@anthropic-ai/sdk";
import {
  buildMascotFallbackReply,
  createMascotSystemPrompt,
  type MascotMode,
} from "@/lib/mascot";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

function textResponse(text: string) {
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  try {
    const { messages, mode } = (await req.json()) as {
      messages?: ChatMessage[];
      mode?: MascotMode;
    };
    const resolvedMode = mode ?? "assistant";

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    const lastUserMessage =
      [...messages].reverse().find((item) => item.role === "user")?.content ??
      "";

    if (!client) {
      return textResponse(
        buildMascotFallbackReply(lastUserMessage, resolvedMode, "th"),
      );
    }

    let stream;

    try {
      stream = await client.messages.stream({
        model: process.env.ANTHROPIC_MODEL || "claude-opus-4-6",
        max_tokens: 1024,
        system: createMascotSystemPrompt(resolvedMode),
        messages: messages.map(({ role, content }) => ({ role, content })),
      });
    } catch (error) {
      console.error("[chat/route:init]", error);
      return textResponse(
        buildMascotFallbackReply(lastUserMessage, resolvedMode, "th"),
      );
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[chat/route]", err);
    return textResponse(buildMascotFallbackReply("", "assistant", "th"));
  }
}
