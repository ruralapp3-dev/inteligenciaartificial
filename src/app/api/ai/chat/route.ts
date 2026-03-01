import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json({
        reply: "Chave HUGGINGFACE_API_KEY não encontrada.",
      });
    }

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "HuggingFaceH4/zephyr-7b-beta",
          messages: [
            { role: "user", content: message }
          ],
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
      data?.choices?.[0]?.message?.content || "Sem resposta da IA.";

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({
      reply: "Erro interno no servidor: " + String(error),
    });
  }
}
