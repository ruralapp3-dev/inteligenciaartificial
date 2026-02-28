"use client";

import { useState } from "react";

export default function IA() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.reply || "Sem resposta da IA.");
    } catch (error) {
      setResponse("Erro ao conectar com a IA.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>🤖 Inteligência Artificial</h1>

      <textarea
        placeholder="Digite sua pergunta..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Pensando..." : "Enviar"}
      </button>

      {response && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f4f4f4",
            borderRadius: "8px",
          }}
        >
          <strong>Resposta da IA:</strong>
          <p style={{ marginTop: "10px" }}>{response}</p>
        </div>
      )}
    </main>
  );
}
