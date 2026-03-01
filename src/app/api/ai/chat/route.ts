import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({
        reply: "Erro da IA: " + data.error,
      });
    }

    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : "Sem resposta da IA.";

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({
      reply: "Erro interno no servidor.",
    });
  }
}
