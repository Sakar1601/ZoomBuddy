import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  db,
  ref,
  set,
  get,
  remove,
  onValue,
} from "../services/firebase";
import { createZoomMeeting } from "../services/zoomApi";

export default function BuddyMatch() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Authenticating...");
  const [matchedWith, setMatchedWith] = useState(null);
  const navigate = useNavigate();

  // Step 1: Wait for auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log("Authenticated:", firebaseUser.email);
        setUser(firebaseUser);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Step 2: Matchmaking logic
  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}`);
    get(userRef).then((snapshot) => {
      if (!snapshot.exists()) {
        console.warn("User role not found in database.");
        setStatus("Unable to determine role.");
        return;
      }

      const role = snapshot.val().role;
      const oppositeRole = role === "student" ? "volunteer" : "student";
      const queueRef = ref(db, `queue/${role}s/${user.uid}`);
      const oppQueueRef = ref(db, `queue/${oppositeRole}s`);

      console.log(`Adding to /queue/${role}s/`);
      set(queueRef, {
        email: user.email,
        timestamp: Date.now(),
      }).then(() => {
        setStatus("Searching for a match...");
      });

      const unsubscribe = onValue(oppQueueRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        const oppUID = Object.keys(data)[0];
        const opp = data[oppUID];
        const sessionId = `${user.uid}_${oppUID}`;
        const altSessionId = `${oppUID}_${user.uid}`;
        const sessionRef = ref(db, `sessions/${sessionId}`);
        const altSessionRef = ref(db, `sessions/${altSessionId}`);

        // Check if session already exists (from other user's perspective)
        get(sessionRef).then((existingSession) => {
          if (existingSession.exists()) {
            const session = existingSession.val();
            setMatchedWith(opp.email);
            setStatus("🎉 Match found! Redirecting...");
            setTimeout(() => {
              navigate(`/session/${sessionId}`);
            }, 3000);
            return;
          }

          get(altSessionRef).then((altSession) => {
            if (altSession.exists()) {
              const session = altSession.val();
              setMatchedWith(opp.email);
              setStatus("🎉 Match found! Redirecting...");
              setTimeout(() => {
                navigate(`/session/${altSessionId}`);
              }, 3000);
              return;
            }

            // If no session exists, create a new Zoom meeting
            const hostEmail = role === "volunteer" ? user.email : opp.email;
            createZoomMeeting()
              .then((zoomData) => {
                set(sessionRef, {
                  studentId: role === "student" ? user.uid : oppUID,
                  volunteerId: role === "volunteer" ? user.uid : oppUID,
                  startedAt: Date.now(),
                  zoom: {
                    join_url: zoomData.join_url,
                    start_url: zoomData.start_url,
                    meeting_id: zoomData.id,
                  },
                });

                // Clean queues
                remove(ref(db, `queue/students/${role === "student" ? user.uid : oppUID}`));
                remove(ref(db, `queue/volunteers/${role === "volunteer" ? user.uid : oppUID}`));

                setMatchedWith(opp.email);
                setStatus("🎉 Match found! Redirecting...");
                setTimeout(() => {
                  navigate(`/session/${sessionId}`);
                }, 3000);
              })
              .catch((err) => {
                console.error(" Zoom API Error:", err);
                setStatus("Failed to create Zoom meeting.");
              });
          });
        });
      });

      // Cleanup on unmount
      return () => {
        unsubscribe();
        remove(queueRef);
      };
    });
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 px-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">🤝 ZoomBuddy Match</h1>
      <p className="text-blue-800 text-lg">{status}</p>
      {matchedWith && (
        <p className="text-sm text-blue-600 mt-2">
          Connected with <strong>{matchedWith}</strong>
        </p>
      )}
    </div>
  );
}
