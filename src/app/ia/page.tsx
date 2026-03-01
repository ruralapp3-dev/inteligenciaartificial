"use client";

import { useState } from "react";

export default function Aurora() {
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
        headers: { "Content-Type": "application/json" },
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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0b0f0c, #0f1f14, #07110a)",
      color: "white",
      fontFamily: "sans-serif"
    }}>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <h2 style={{ color: "#6eff9c" }}>🌱 Rural App</h2>
        <div style={{ display: "flex", gap: "30px", color: "#aaa" }}>
          <span>Dashboard</span>
          <span style={{ color: "#6eff9c" }}>Aurora</span>
          <span>Comunidade</span>
          <span>Perfil</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px 30px"
      }}>
        <h1 style={{
          fontSize: "56px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #6eff9c, #2ecc71)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          Aurora Agro
        </h1>

        <p style={{ color: "#aaa", marginTop: "15px" }}>
          IA Estratégica para decisões inteligentes no campo
        </p>
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        flexWrap: "wrap",
        padding: "30px"
      }}>
        {[
          { title: "Cotação Soja", value: "R$ 157,00", extra: "+1.3%" },
          { title: "Previsão Climática", value: "Chuva 20°C", extra: "2h" },
          { title: "Simulação Lucro", value: "R$ 206.500", extra: "+8%" },
          { title: "Alertas", value: "2 pendências", extra: "Verificar" }
        ].map((card, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.05)",
            padding: "25px",
            borderRadius: "18px",
            minWidth: "200px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 20px rgba(46,204,113,0.1)"
          }}>
            <h4 style={{ color: "#aaa" }}>{card.title}</h4>
            <h2 style={{ margin: "10px 0", color: "#6eff9c" }}>
              {card.value}
            </h2>
            <span style={{ fontSize: "14px", color: "#aaa" }}>
              {card.extra}
            </span>
          </div>
        ))}
      </div>

      {/* IA CENTRAL */}
      <div style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "40px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "25px",
        backdropFilter: "blur(30px)",
        boxShadow: "0 0 60px rgba(46,204,113,0.15)"
      }}>
        <textarea
          placeholder="Converse com a Aurora..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.4)",
            color: "white",
            fontSize: "16px",
            resize: "none",
            outline: "none"
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "18px",
            borderRadius: "15px",
            border: "none",
            background: loading
              ? "#444"
              : "linear-gradient(90deg, #2ecc71, #27ae60)",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Aurora analisando..." : "Ativar Aurora"}
        </button>

        {response && (
          <div style={{
            marginTop: "40px",
            padding: "25px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "15px",
            borderLeft: "5px solid #2ecc71"
          }}>
            <strong style={{ color: "#6eff9c" }}>
              Estratégia sugerida:
            </strong>
            <p style={{ marginTop: "10px", lineHeight: "1.7" }}>
              {response}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
