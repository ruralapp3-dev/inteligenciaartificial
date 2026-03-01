export default function IA() {
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
      {/* Overlay escuro */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      />

      {/* Conteúdo */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px", color: "#22c55e" }}>
          Aurora Agro
        </h1>

        <p style={{ marginBottom: "20px", color: "#ccc" }}>
          IA estratégica para decisões inteligentes no campo
        </p>

        <input
          type="text"
          placeholder="Converse com a Aurora..."
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #555",
            backgroundColor: "#111",
            color: "white",
            marginBottom: "20px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#22c55e",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Ativar Aurora
        </button>
      </div>
    </div>
  );
}
