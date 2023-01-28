import { createContext, useContext, useState } from "react";
import { db, storage } from "../firebaseConfig";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
  const colRef = collection(db, "photos");

  const [photoDocuments, setPhotoDocuments] = useState(null);

  async function pullPhotoDocuments() {
    try {
      const data = await getDocs(colRef);
      const photoDocs = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      // console.log("from context: ", photoDocs)
      setPhotoDocuments(photoDocs);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPhoto(imageFile, title, postedBy) {
    //upload file to storage
    const imageRef = ref(storage, `photos/${imageFile.name}`);
    const uploadResult = await uploadBytes(imageRef, imageFile);
    const downloadUrl = await getDownloadURL(uploadResult.ref);

    //create photodoc
    const photoDocRef = await addDoc(colRef, {
      title: title,
      imageUrl: downloadUrl,
      postedBy: postedBy,
    })
  }

  return (
    <FirestoreContext.Provider
      value={{ pullPhotoDocuments, photoDocuments, addPhoto }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
