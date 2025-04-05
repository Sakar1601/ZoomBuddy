import { useNavigate } from "react-router-dom";

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 mt-6">
        Welcome to ZoomBuddy+
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Choose how you'd like to connect today. Whether you need a peer to talk
        to, a space to share, or immediate help — we’ve got you covered.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Option 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition cursor-pointer" onClick={() => navigate("/buddy")}>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">💬 I want to talk</h2>
          <p className="text-gray-600">
            Get matched 1-on-1 with a trained peer to talk privately in real time.
          </p>
        </div>

        {/* Option 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition cursor-pointer" onClick={() => navigate("/groups")}>
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">🧑‍🤝‍🧑 Join a Discussion Room</h2>
          <p className="text-gray-600">
            Enter an open Zoom room to chat with others about shared struggles.
          </p>
        </div>

        {/* Option 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition cursor-pointer" onClick={() => navigate("/guardian")}>
          <h2 className="text-2xl font-semibold text-red-600 mb-2">🚨 Urgent Help</h2>
          <p className="text-gray-600">
            Get escalated to ASU crisis support or emergency response immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
