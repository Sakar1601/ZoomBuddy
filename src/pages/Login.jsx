import { useState } from "react";
import { auth, db, set, ref } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.endsWith("@asu.edu")) {
      alert("Only ASU emails are allowed.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
  
      console.log("✅ Firebase Auth success: ", uid);
  
      await set(ref(db, `users/${uid}`), {
        email,
        role,
      });
  
      console.log("✅ Data written to Realtime DB at /users/" + uid);
  
      alert("Registered successfully!");
      navigate("/features");
    } catch (error) {
      console.error("❌ Firebase error:", error.message);
      alert(error.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">ZoomBuddy+ Login</h1>

      <input
        type="email"
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="ASU Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg"
      >
        <option value="student">I'm a Student</option>
        <option value="volunteer">I'm a Volunteer</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
      >
        Register / Login
      </button>
    </div>
  );
}
