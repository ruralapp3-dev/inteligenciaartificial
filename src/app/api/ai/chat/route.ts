import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history = [], userId } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: "Chave GROQ_API_KEY não encontrada.",
      });
    }

    // 🧠 CONTROLE DE HISTÓRICO (evita custo alto e lentidão)
    const limitedHistory = history.slice(-6);

    // 🧠 DETECÇÃO INTELIGENTE (clima / mercado)
    const lower = message.toLowerCase();

    // 🌦️ CLIMA SIMPLES (mock inicial - depois conectamos API real)
    if (lower.includes("clima") || lower.includes("chuva")) {
      return NextResponse.json({
        reply:
          "🌦️ Para análise climática precisa, integrei previsão em breve. Por enquanto, recomendo verificar umidade do solo e radar local antes de qualquer aplicação.",
      });
    }

    // 💰 MERCADO SIMPLES
    if (
      lower.includes("preço") ||
      lower.includes("cotação") ||
      lower.includes("mercado")
    ) {
      return NextResponse.json({
        reply:
          "📊 O mercado agrícola varia diariamente. Para café, soja e milho, recomendo acompanhar CEPEA ou bolsas. Posso integrar cotação automática no sistema se quiser.",
      });
    }

    // 🧠 PROMPT PROFISSIONAL
    const systemPrompt = `
Você é Aurora Agro, uma especialista brasileira em agronegócio de alto nível.

Seu comportamento:
- Pensamento de engenheiro agrônomo experiente
- Foco em produtividade e lucro
- Linguagem simples e prática
- Respostas diretas e acionáveis

Ao responder:
- Sempre que possível:
  • Diga o problema
  • Explique a causa
  • Dê solução prática
  • Sugira prevenção

Contexto do Brasil agrícola.
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
            ...limitedHistory,
            { role: "user", content: message },
          ],
          temperature: 0.6,
          max_tokens: 800,
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
