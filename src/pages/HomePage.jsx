import { useNavigate } from "react-router-dom";
// import asuLogo from "../assets/asu-logo.png";
// import zoomLogo from "../assets/zoom-logo.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 flex flex-col justify-between px-6 py-8">

      {/* 🔹 Navbar */}
      <header className="flex justify-between items-center mb-10">
        <div className="text-2xl font-bold text-blue-800">
          Zoom<span className="text-purple-700">Buddy+</span>
        </div>
        <nav className="space-x-6 text-gray-700 font-medium hidden md:block">
          <a href="#home" className="hover:text-blue-700">Home</a>
          <a href="#features" className="hover:text-blue-700">Features</a>
        </nav>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </header>

      {/* 🔹 Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          You’re never alone at ASU.
        </h1>
        <p className="text-xl text-gray-700 mb-10">
          Real-time student support. Peer talk. Zoom-powered. ASU-backed.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition"
        >
          Get Started Now
        </button>
      </main>

      {/* 🔹 Partner Logos */}
      <footer className="flex justify-center items-center space-x-8 mt-12">
        {/* <img src={asuLogo} alt="ASU Logo" className="h-10" />
        <img src={zoomLogo} alt="Zoom Logo" className="h-10" /> */}
      </footer>
    </div>
  );
}
