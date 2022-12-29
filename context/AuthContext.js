import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (userAuth)=>{
      console.log("onauth ran")
      if(userAuth){
        console.log("User signed in: ", userAuth)
        setUser(userAuth)
      }else{
        console.log("No user")
        setUser(null)
      }
    })
  }, [])

  async function loginUser() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("sign in success ", result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logoutUser(){
    try {
      await signOut(auth);
      console.log("User signed out")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
