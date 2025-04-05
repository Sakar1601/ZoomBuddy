import { useState } from "react";
import { auth, db, ref, set } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const saveRole = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      role,
    });

    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-purple-50">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">Who are you?</h1>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded-lg p-3 mb-4"
      >
        <option value="student">I am a Student</option>
        <option value="volunteer">I am a Volunteer</option>
      </select>
      <button
        onClick={saveRole}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
      >
        Continue
      </button>
    </div>
  );
}
