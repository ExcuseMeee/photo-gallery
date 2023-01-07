import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebaseConfig";
import { useModal } from "../context/ModalContext";
import { addDoc, collection } from "firebase/firestore";

const AddPhoto = () => {
  const { closeModal } = useModal();

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
    if (!file) return;
    console.log("File name to be uploaded: ", file.name);
    uploadFileToStorage();
  }

  function uploadFileToStorage() {
    const imageRef = ref(storage, `photos/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        console.log("Success: ", downloadUrl);
        createDocument(downloadUrl)
        closeModal();
      });
    });
  }

  function createDocument(downloadUrl){
    const collectionRef = collection(db, 'photos')
    addDoc(collectionRef, {
      title: title,
      imageUrl: downloadUrl
    })
  }


  return (
    <div className="border h-full flex flex-col items-center">
      <div>Add Photo</div>
      <form className="flex flex-col" onSubmit={submitPhoto}>
        <input required type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Title" />
        <input required type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AddPhoto;
