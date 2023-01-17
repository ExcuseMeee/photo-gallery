import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebaseConfig";
import { useModal } from "../context/ModalContext";
import { addDoc, collection, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirestoreContext";

const AddPhoto = () => {
  const { closeModal } = useModal();
  const { user } = useAuth();
  const { pullPhotoDocuments } = useFirestore();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    console.log("changed ", e);
    let selected = e.target.files[0];
    console.log(selected);
    setFile(selected);
  }

  function submitPhoto(e) {
    e.preventDefault();
    console.log("upload clicked");
    if (!user || !file) {
      alert("Not signed in or no file");
      return;
    }
    console.log("File name to be uploaded: ", file.name);
    uploadFileToStorage();
  }

  function uploadFileToStorage() {
    const imageRef = ref(storage, `photos/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        console.log("Success: ", downloadUrl);
        createDocument(downloadUrl);
        closeModal();
      });
    });
  }

  async function createDocument(downloadUrl) {
    const collectionRef = collection(db, "photos");
    const photoDocRef = await addDoc(collectionRef, {
      title: title,
      imageUrl: downloadUrl,
    });
    pullPhotoDocuments();
    updateUserDocument(photoDocRef);
  }

  function updateUserDocument(photoDocRef) {
    const userDocRef = doc(db, "users", user.uid);
    console.log(user, userDocRef, photoDocRef);
    //TODO: update posts field in user doc
  }

  return (
    <div className="border h-full flex flex-col items-center">
      <div>Add Photo</div>
      <form className="flex flex-col" onSubmit={submitPhoto}>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          required
          type="file"
          onChange={handleChange}
          accept={"image/*"}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AddPhoto;
