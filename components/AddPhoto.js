import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebaseConfig";

const AddPhoto = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    console.log("changed ", e);
    let selected = e.target.files[0];
    console.log(selected);
    setFile(selected);
  }

  function handleSubmit(e) {
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
      });
    });
  }

  return (
    <div className="border h-full flex flex-col items-center">
      <div>Add Photo</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" />
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AddPhoto;
