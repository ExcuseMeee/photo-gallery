import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARQimdLVW3SNmdrbaSz9law0HnQxlWugs",
  authDomain: "photo-gallery-e3990.firebaseapp.com",
  projectId: "photo-gallery-e3990",
  storageBucket: "photo-gallery-e3990.appspot.com",
  messagingSenderId: "57177872599",
  appId: "1:57177872599:web:e261eae674912b24e93892",
  measurementId: "G-HFYSJV41F9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
