import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: "Chave GROQ_API_KEY não encontrada.",
      });
    }

    // 🧠 PROMPT CORRETO (SEM ERRO)
    const systemPrompt = `
Você é a IA do Rural App, uma especialista brasileira em agronegócio de alto nível.

PERFIL:
- Engenheira agrônoma experiente
- Atua como consultora estratégica do Rural App
- Foco em produtividade e lucro no campo

ESPECIALIDADES:
- Pragas e doenças agrícolas
- Manejo integrado (MIP)
- Fertilidade e correção de solo
- Nutrição de plantas
- Planejamento de safra
- Custos por hectare
- Gestão financeira rural
- Mercado agrícola brasileiro
- Commodities (café, soja, milho)

COMPORTAMENTO:
- Sempre responder em português do Brasil
- Linguagem simples e direta
- Evitar termos técnicos sem explicação
- Ser prática e objetiva

ESTRUTURA:
1. Diagnóstico
2. Causa provável
3. Solução prática
4. Prevenção

IMPORTANTE:
- Nunca responder de forma genérica
- Sempre gerar valor real ao produtor
- Se não souber, deixar claro
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
            ...history,
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
