import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCrvMKUap-Imv7B6XVqWkfjivh02g759pY",
  authDomain: "zoombuddy-cd986.firebaseapp.com",
  databaseURL: "https://zoombuddy-cd986-default-rtdb.firebaseio.com",
  projectId: "zoombuddy-cd986",
  storageBucket: "zoombuddy-cd986.firebaseapp.com",
  messagingSenderId: "937697661478",
  appId: "1:937697661478:web:a5c71a6442e48dea0e4ce7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export { ref, set, get, child, onValue, remove };
