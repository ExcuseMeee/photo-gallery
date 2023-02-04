import { createContext, useContext, useState } from "react";
import { db, storage } from "../firebaseConfig";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
  const photosColRef = collection(db, "photos");
  const usersColRef = collection(db, "users");

  const [photoDocuments, setPhotoDocuments] = useState(null);

  async function pullPhotoDocuments() {
    try {
      const data = await getDocs(photosColRef);
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
    const photoDocRef = await addDoc(photosColRef, {
      title: title,
      imageUrl: downloadUrl,
      postedBy: postedBy,
    });
  }

  async function deletePhoto(photoDocId, imageUrl) {
    // first, remove photo from all users
    try {
      // query all users who liked this photo
      const likedPhotoQuery = query(
        usersColRef,
        where("likedPhotos", "array-contains", photoDocId)
      );
      const queriedUsers = await getDocs(likedPhotoQuery);
      // delete the photo from likedPhotos field for all queried users
      queriedUsers.forEach((userDoc) => {
        dislikePhoto(photoDocId, userDoc.id);
      });

      // then, delete photo
      try {
        // delete storage file
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        try {
          // delete document
          const photoDocRef = doc(db, "photos", photoDocId);
          await deleteDoc(photoDocRef);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function likePhoto(photoDocId, uid) {
    const userDocRef = doc(db, "users", uid);
    try {
      await updateDoc(userDocRef, {
        likedPhotos: arrayUnion(photoDocId),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function dislikePhoto(photoDocId, uid) {
    const userDocRef = doc(db, "users", uid);
    try {
      await updateDoc(userDocRef, {
        likedPhotos: arrayRemove(photoDocId),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FirestoreContext.Provider
      value={{
        pullPhotoDocuments,
        photoDocuments,
        addPhoto,
        deletePhoto,
        likePhoto,
        dislikePhoto,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
