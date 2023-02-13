import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
const storage = getStorage(app);

if(typeof window !== "undefined"){
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6Lc773YkAAAAAHKeMBpns837cGYQhcjuwcb4BQ_w"),
    isTokenAutoRefreshEnabled: true,
  });
}


export { db, auth, storage };
