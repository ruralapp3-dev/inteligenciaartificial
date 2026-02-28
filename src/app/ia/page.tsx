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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        width: "100%",
        maxWidth: "800px",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        <h1 style={{
          fontSize: "28px",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          🤖 Inteligência Artificial Rural
        </h1>

        <textarea
          placeholder="Digite sua pergunta..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "none",
            background: "#2c5364",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          {loading ? "Pensando..." : "Enviar Pergunta"}
        </button>

        {response && (
          <div style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f4f4f4",
            borderRadius: "10px"
          }}>
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
