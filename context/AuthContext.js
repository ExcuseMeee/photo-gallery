import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        watchUserDoc(userAuth);
      } else {
        setUser(null);
        setUnsubscribe(null);
        setUserData(null);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loginUser() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUserDocument(result.user);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async function logoutUser() {
    try {
      unsubscribe();
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async function watchUserDoc(userAuthInfo) {
    const docRef = doc(db, "users", userAuthInfo.uid);

    const unsub = onSnapshot(
      docRef,
      (doc) => {
        setUserData(doc.data());
      },
      (error) => {
        console.log(error.message);
      }
    );
    setUnsubscribe(() => unsub);
  }

  async function setUserDocument(userAuthInfo) {
    const docRef = doc(db, "users", userAuthInfo.uid);
    const docSnap = await getDoc(docRef);
    //if dne then create doc
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        email: userAuthInfo.email,
        name: userAuthInfo.displayName,
        likedPhotos: [],
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
