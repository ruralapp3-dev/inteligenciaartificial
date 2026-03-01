import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: "Chave GROQ_API_KEY não encontrada.",
      });
    }

    const systemPrompt = `
Você é Aurora Agro, uma especialista brasileira em agronegócio.

REGRAS:
- Sempre responder em Português do Brasil.
- Foco total em agronegócio.
- Especialista em:
  * Pragas agrícolas
  * Manejo integrado
  * Controle químico e biológico
  * Planejamento de safra
  * Custos por hectare
  * Fluxo de caixa rural
  * Precificação de commodities
  * Mercado agrícola brasileiro
  * Gestão estratégica rural
- Dar respostas técnicas, claras e aplicáveis.
- Sempre sugerir ação prática quando possível.
- Falar de forma profissional, mas próxima do produtor.
`;

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
            { role: "system", content: systemPrompt },
            ...(history || []),
            { role: "user", content: message }
          ],
          temperature: 0.6,
          max_tokens: 800
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
