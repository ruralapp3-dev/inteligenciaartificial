import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: "Chave GROQ_API_KEY não encontrada.",
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        reply: "Erro da IA: " + JSON.stringify(data),
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sem resposta da IA.";

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({
      reply: "Erro interno: " + error.message,
    });
  }
}
