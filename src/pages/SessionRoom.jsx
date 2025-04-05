import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db, ref, get } from "../services/firebase";

export default function SessionRoom() {
  const { id } = useParams(); // session ID from URL
  const [loading, setLoading] = useState(true);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const sessionSnap = await get(ref(db, `sessions/${id}`));
      if (!sessionSnap.exists()) {
        setLoading(false);
        return;
      }

      const session = sessionSnap.val();

      const userRole =
        session.studentId === user.uid ? "student" : "volunteer";
      setRole(userRole);

      const url =
        userRole === "volunteer"
          ? session.zoom.start_url
          : session.zoom.join_url;

      setMeetingUrl(url);
      setLoading(false);
    };

    fetchSession();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-blue-800">
        🔄 Loading Zoom session...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-6 text-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">📞 ZoomBuddy Session</h1>
      <p className="text-lg text-gray-700 mb-6">
        You’re logged in as a <strong>{role}</strong>. Click below to join the Zoom session.
      </p>
      <a
        href={meetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Join Zoom Meeting
      </a>
    </div>
  );
}
