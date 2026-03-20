"use client";

import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";

export default function IA() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<any>(null);

  // 🎤 VOZ
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "pt-BR";

      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        sendMessage(text);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // 🔊 RESPOSTA EM ÁUDIO
  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    speechSynthesis.speak(utterance);
  }

  // 💬 CHAT
  async function sendMessage(text?: string) {
    const msg = text || input;
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: msg,
        history: messages,
        userId: "user-1",
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);

    speak(data.reply);
    setLoading(false);
  }

  // 📸 IMAGEM
  async function handleImage(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/ai/vision", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.analysis },
    ]);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-xl mb-4">Aurora Agro 🌱</h1>

      {/* BOTÕES INTELIGENTES */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setInput("Como está o clima hoje?")}>🌦️ Clima</button>
        <button onClick={() => setInput("Preço do café hoje")}>☕ Café</button>
      </div>

      {/* CHAT */}
      <div className="mb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <div className="bg-gray-800 p-2 rounded m-1 inline-block">
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {loading && <p>🌱 Pensando...</p>}

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 text-black"
        />

        <button onClick={() => sendMessage()}>Enviar</button>

        {/* 📸 */}
        <input type="file" id="img" hidden onChange={handleImage} />
        <label htmlFor="img" className="cursor-pointer">📷</label>

        {/* 🎤 */}
        <button onClick={() => recognitionRef.current?.start()}>
          <Mic />
        </button>
      </div>
    </div>
  );
}
