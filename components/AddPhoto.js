import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirestoreContext";

const AddPhoto = () => {
  const { closeModal } = useModal();
  const { user, userData } = useAuth();
  const { pullPhotoDocuments, addPhoto } = useFirestore();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    console.log("changed ", e);
    let selected = e.target.files[0];
    console.log(selected);
    setFile(selected);
  }

  async function submitPhoto(e) {
    e.preventDefault();
    if (!user || !file) {
      alert("Not signed in or no file");
      return;
    }
    console.log("File name to be uploaded: ", file.name);
    await addPhoto(file, title, user.email);
    pullPhotoDocuments();
    closeModal();
  }

  return (
    <div className="h-full flex flex-col items-center">
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
