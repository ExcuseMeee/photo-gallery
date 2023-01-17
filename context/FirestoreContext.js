import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
  const colRef = collection(db, "photos");

  const [photoDocuments, setPhotoDocuments] = useState(null)

  async function pullPhotoDocuments() {
    try {
      const data = await getDocs(colRef);
      const photoDocs = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      // console.log("from context: ", photoDocs)
      setPhotoDocuments(photoDocs)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FirestoreContext.Provider value={{ pullPhotoDocuments, photoDocuments }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
