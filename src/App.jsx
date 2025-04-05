import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Setup from "./pages/Setup";
import HomePage from "./pages/HomePage";
import BuddyMatch from "./pages/BuddyMatch";
import SessionRoom from "./pages/SessionRoom";
import FeaturesPage from "./pages/FeaturesPage";
import GroupRooms from "./pages/GroupRooms";
import GuardianMode from "./pages/GuardianMode";

import ProtectedRoute from "./components/ProtectedRoute"; // (You’ll build this below)

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/setup" element={<ProtectedRoute><Setup /></ProtectedRoute>} />
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/buddy" element={<ProtectedRoute><BuddyMatch /></ProtectedRoute>} />
      <Route path="/guardian" element={<ProtectedRoute><GuardianMode /></ProtectedRoute>} />
      <Route path="/groups" element={<ProtectedRoute><GroupRooms /></ProtectedRoute>} />
      {/* The session ID is passed as a URL parameter */}
      {/* This route should be protected */}
      {/* You’ll build the SessionRoom component in the next step */}
      <Route path="/session/:id" element={<ProtectedRoute><SessionRoom /></ProtectedRoute>} />
      <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      {/* Optional fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
