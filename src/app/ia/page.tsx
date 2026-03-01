export default function IA() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay escuro para dar contraste */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Conteúdo */}
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
          className="w-full p-4 rounded-xl bg-black/80 text-white border border-gray-700 focus:outline-none focus:border-green-400"
        />

        <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-lg">
          Ativar Aurora
        </button>
      </div>
    </div>
  );
}
