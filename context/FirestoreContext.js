import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
  const colRef = collection(db, "photos");

  async function getPhotoDocuments() {
    try {
      const data = await getDocs(colRef);
      const photoDocs = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(photoDocs)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FirestoreContext.Provider value={{ getPhotoDocuments }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
