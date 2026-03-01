"use client";
import { useState } from "react";

export default function IA() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {
    if (!message) return;

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history: [] }),
    });

    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "10px", color: "#22c55e" }}>
          Aurora Agro
        </h1>

        <p style={{ marginBottom: "20px" }}>
          IA estratégica para decisões inteligentes no campo
        </p>

        <input
          type="text"
          placeholder="Converse com a Aurora..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #444",
            marginBottom: "15px",
            backgroundColor: "#111",
            color: "white",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#22c55e",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>

        {response && (
          <div style={{ marginTop: "20px", color: "#ddd" }}>
            <strong>Resposta:</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
