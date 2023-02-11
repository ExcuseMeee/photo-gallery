import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirestoreContext";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

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
      <div className="flex items-center justify-center w-full h-[10%]">
        <p className="font-bold text-lg ">Add Photo</p>
      </div>
      <form
        className="flex flex-col w-full h-[80%] items-center space-y-3"
        onSubmit={submitPhoto}
      >
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border w-1/2"
        />
        <input
          required
          type="file"
          onChange={handleChange}
          accept={"image/*"}
          className="border w-1/2"
        />
        <button type="submit" className="border ">
          Upload
        </button>
      </form>
      <div className="w-full h-[10%] flex justify-center items-center">
        <div className="flex space-x-1 hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm hover:text-red-600" onClick={closeModal}>
          <CancelRoundedIcon />
          <p>Cancel</p>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
