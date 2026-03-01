"use client";

import { useState } from "react";
import Link from "next/link";

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
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.85))",
          backdropFilter: "blur(6px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* NAVBAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <h2 style={{ color: "#6eff9c", cursor: "pointer" }}>
              🌱 Rural App
            </h2>
          </Link>

          <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
            <Link href="/dashboard" style={navStyle}>Dashboard</Link>
            <Link href="/ia" style={{ ...navStyle, color: "#6eff9c" }}>Aurora</Link>
            <Link href="/comunidade" style={navStyle}>Comunidade</Link>
            <Link href="/perfil" style={navStyle}>Perfil</Link>
          </div>
        </div>

        {/* CONTAINER PRINCIPAL */}
        <div
          style={{
            maxWidth: "900px",
            margin: "80px auto 40px",
            padding: "40px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "25px",
            backdropFilter: "blur(30px)",
            boxShadow: "0 0 60px rgba(46,204,113,0.15)",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "10px",
              color: "#6eff9c",
            }}
          >
            Aurora Agro
          </h1>

          <p style={{ color: "#aaa", marginBottom: "30px" }}>
            IA estratégica para decisões inteligentes no campo
          </p>

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
              outline: "none",
              transition: "0.3s",
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
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: loading
                ? "none"
                : "0 0 25px rgba(46,204,113,0.4)",
            }}
          >
            {loading ? "Aurora analisando..." : "Ativar Aurora"}
          </button>

          {response && (
            <div
              style={{
                marginTop: "40px",
                padding: "25px",
                background: "rgba(0,0,0,0.5)",
                borderRadius: "15px",
                borderLeft: "5px solid #2ecc71",
                animation: "fadeIn 0.4s ease-in-out",
              }}
            >
              <strong style={{ color: "#6eff9c" }}>
                Estratégia sugerida:
              </strong>
              <p style={{ marginTop: "10px", lineHeight: "1.7" }}>
                {response}
              </p>
            </div>
          )}
        </div>

        {/* CARDS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
            padding: "30px",
            marginBottom: "80px",
          }}
        >
          {cards.map((card, i) => (
            <div key={i} style={cardStyle}>
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
      </div>
    </div>
  );
}

const navStyle = {
  color: "#aaa",
  textDecoration: "none",
  transition: "0.3s",
};

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "18px",
  minWidth: "200px",
  backdropFilter: "blur(20px)",
  boxShadow: "0 0 20px rgba(46,204,113,0.1)",
  transition: "0.3s",
  cursor: "pointer",
};

const cards = [
  { title: "Cotação Soja", value: "R$ 157,00", extra: "+1.3%" },
  { title: "Previsão Climática", value: "Chuva 20°C", extra: "2h" },
  { title: "Simulação Lucro", value: "R$ 206.500", extra: "+8%" },
  { title: "Alertas", value: "2 pendências", extra: "Verificar" },
];
