import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta",
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

    console.log("HF RESPONSE:", data);

    if (!response.ok) {
      return NextResponse.json({
        reply: "Erro da IA: " + JSON.stringify(data),
      });
    }

    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : JSON.stringify(data);

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({
      reply: "Erro interno no servidor.",
    });
  }
}
