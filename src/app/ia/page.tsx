"use client";

import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";

export default function IA() {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro ao conectar com a IA." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0B0F0D] text-white flex flex-col">
      {/* HEADER */}
      <header className="w-full px-8 py-5 flex items-center justify-between border-b border-[#1B2A24]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#63D471] to-[#1B5E3B]" />
          <h1 className="text-2xl font-semibold tracking-wide">
            Aurora <span className="text-[#63D471]">Agro</span>
          </h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">

        {/* CHAT CENTRAL */}
        <div className="w-full max-w-3xl bg-[#121816] border border-[#1B2A24] rounded-3xl shadow-2xl flex flex-col h-[70vh]">

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                Converse com a Aurora para começar.
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] p-4 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-[#63D471] text-black ml-auto"
                    : "bg-[#1B2A24] text-white"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm">
                Aurora está analisando...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-[#1B2A24] flex gap-3">
            <input
              type="text"
              placeholder="Digite sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="flex-1 p-3 rounded-xl bg-[#0B0F0D] text-white border border-[#1B2A24] focus:outline-none focus:border-[#63D471]"
            />

            <button
              onClick={sendMessage}
              className="px-6 py-2 rounded-xl bg-[#63D471] text-black font-semibold hover:scale-105 transition"
            >
              Enviar
            </button>
          </div>
        </div>

        {/* VOICE CORE VISUAL (SEM ANIMAÇÃO EXTERNA) */}
        <div className="mt-12 flex flex-col items-center">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
              active ? "border-[#63D471]" : "border-[#1B2A24]"
            }`}
          >
            <Mic size={32} className="text-[#63D471]" />
          </div>

          <button
            onClick={() => setActive(!active)}
            className="mt-4 text-sm text-gray-400 hover:text-[#63D471] transition"
          >
            {active ? "Desativar voz" : "Ativar modo voz"}
          </button>
        </div>
      </main>
    </div>
  );
}
