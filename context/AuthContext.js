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
      // console.log("onauth ran")
      if (userAuth) {
        console.log("onauth: User signed in: ", userAuth);
        setUser(userAuth);
        watchUserDoc(userAuth);
      } else {
        console.log("onauth: No user");
        setUser(null);
        setUnsubscribe(null);
        setUserData(null);
      }
    });

    return () => {
      console.log("cleanup called");
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
      console.log("sign in success ", result);
      setUserDocument(result.user);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logoutUser() {
    try {
      unsubscribe();
      console.log("unsubbed");
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function watchUserDoc(userAuthInfo) {
    const docRef = doc(db, "users", userAuthInfo.uid);

    const unsub = onSnapshot(
      docRef,
      (doc) => {
        console.log("watcher: doc data", doc.data());
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
      console.log("docsnap does not exist, creating doc");
      await setDoc(docRef, {
        email: userAuthInfo.email,
        name: userAuthInfo.displayName,
      });
      console.log("doc created");
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
