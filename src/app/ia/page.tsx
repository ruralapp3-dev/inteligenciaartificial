"use client";

import { useState } from "react";

export default function IA() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message) return;

    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history: [] }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-3xl bg-black/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-green-400 mb-2">
          Aurora Agro
        </h1>

        <p className="text-gray-300 mb-6">
          IA estratégica para decisões inteligentes no campo
        </p>

        <input
          type="text"
          placeholder="Converse com a Aurora..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 rounded-xl bg-black/80 text-white border border-gray-700 focus:outline-none focus:border-green-400 mb-4"
        />

        <button
          onClick={sendMessage}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-lg"
        >
          {loading ? "Processando..." : "Ativar Aurora"}
        </button>

        {response && (
          <div className="mt-6 bg-black/60 p-4 rounded-xl text-gray-200">
            <strong>Resposta:</strong>
            <p className="mt-2">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
