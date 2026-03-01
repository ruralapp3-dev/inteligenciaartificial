"use client";

import { useState } from "react";

export default function IA() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;

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
    setMessage("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "800px",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          🌱 Aurora IA Agro
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#555",
          }}
        >
          Assistente inteligente para decisões rurais
        </p>

        <textarea
          placeholder="Digite sua pergunta... (Enter para enviar)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
            resize: "none",
            outline: "none",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            background: loading ? "#999" : "#2c5364",
            color: "white",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s",
          }}
        >
          {loading ? "🤖 Pensando..." : "Enviar Pergunta"}
        </button>

        {response && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "#f4f6f8",
              borderRadius: "15px",
              borderLeft: "5px solid #2c5364",
            }}
          >
            <strong>Resposta da IA:</strong>
            <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
