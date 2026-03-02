"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function IA() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        history: messages,
      }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.reply },
    ]);

    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-3xl bg-black/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl flex flex-col h-[80vh]">
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Aurora Agro
        </h1>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-green-500 text-black self-end ml-auto"
                  : "bg-gray-800 text-white self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="text-gray-400">Aurora está pensando...</div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Converse com a Aurora..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-black/80 text-white border border-gray-700 focus:outline-none focus:border-green-400"
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
  );
}
