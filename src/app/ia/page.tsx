"use client";

import { useState, useRef, useEffect } from "react";

export default function IA() {
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
    <div
      className="min-h-screen flex flex-col bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Container principal */}
      <div className="relative z-10 flex flex-col h-screen max-w-4xl w-full mx-auto">

        {/* Header */}
        <header className="p-6 border-b border-green-500/30">
          <h1 className="text-3xl font-bold text-green-400">
            Aurora Agro
          </h1>
          <p className="text-gray-400 text-sm">
            Inteligência estratégica para o campo
          </p>
        </header>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] p-4 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-green-500 text-black ml-auto"
                  : "bg-gray-800 text-white"
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

        {/* Input fixo */}
        <div className="p-6 border-t border-green-500/30 bg-black/50 backdrop-blur-md">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Digite sua pergunta sobre o campo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-4 rounded-xl bg-black/80 text-white border border-gray-700 focus:outline-none focus:border-green-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 rounded-xl transition-all duration-300"
            >
              Enviar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
