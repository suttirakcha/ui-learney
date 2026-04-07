import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `คุณคือผู้ช่วย AI ของแพลตฟอร์ม Learney ซึ่งเป็นแพลตฟอร์มเรียนออนไลน์ภาษาไทย
หน้าที่ของคุณคือช่วยผู้เรียนในเรื่องต่อไปนี้:
- แนะนำคอร์สเรียนที่เหมาะสมกับเป้าหมายและระดับของผู้เรียน
- ตอบคำถามเกี่ยวกับเนื้อหาการเรียน เช่น คณิตศาสตร์, โปรแกรมมิ่ง, ดีไซน์, ภาษา, AI
- ให้คำแนะนำในการพัฒนาทักษะและวางแผนการเรียนรู้
- อธิบายแนวคิดยากๆ ให้เข้าใจง่าย

ตอบเป็นภาษาไทยเสมอ ยกเว้นคำศัพท์เทคนิคที่ควรใช้ภาษาอังกฤษ ตอบกระชับและเป็นประโยชน์`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    const stream = await client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

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
    return new Response("Internal Server Error", { status: 500 });
  }
}
