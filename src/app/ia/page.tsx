"use client";

import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";

export default function IA() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  // 🔊 VOZ MELHORADA
  function speak(text: string) {
    const voices = speechSynthesis.getVoices();

    const voice =
      voices.find((v) => v.lang === "pt-BR") ||
      voices.find((v) => v.lang.includes("pt"));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice || null;
    utterance.lang = "pt-BR";
    utterance.rate = 0.95;

    speechSynthesis.speak(utterance);
  }

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
    <div className="min-h-screen bg-[#0B0F0D] text-white flex flex-col">

      {/* HEADER */}
      <header className="p-4 border-b border-[#1B2A24]">
        <h1 className="text-xl">
          Rural App <span className="text-[#63D471]">Aurora</span>
        </h1>
      </header>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-3 rounded-xl ${
              m.role === "user"
                ? "bg-[#63D471] text-black ml-auto"
                : "bg-[#1B2A24]"
            }`}
          >
            {m.content}
          </div>
        ))}

        {loading && <div className="text-gray-400">🌱 Pensando...</div>}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-[#1B2A24] flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-black border border-[#1B2A24]"
          placeholder="Pergunte algo..."
        />

        {/* 📷 */}
        <input type="file" id="img" hidden onChange={handleImage} />
        <label htmlFor="img" className="cursor-pointer px-3">📷</label>

        <button
          onClick={() => sendMessage()}
          className="bg-[#63D471] px-4 rounded-xl text-black"
        >
          Enviar
        </button>
      </div>

      {/* 🎤 VOZ */}
      <div className="p-4 flex justify-center">
        <button
          onClick={() => recognitionRef.current?.start()}
          className="w-16 h-16 rounded-full border-2 border-[#63D471] flex items-center justify-center"
        >
          <Mic className="text-[#63D471]" />
        </button>
      </div>
    </div>
  );
}
