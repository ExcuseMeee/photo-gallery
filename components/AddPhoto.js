import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirestoreContext";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddPhoto = ({ createToast }) => {
  const { closeModal } = useModal();
  const { user } = useAuth();
  const { pullPhotoDocuments, addPhoto } = useFirestore();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    let selected = e.target.files[0];
    setFile(selected);
  }

  async function submitPhoto(e) {
    e.preventDefault();
    if (!user || !file) {
      createToast("warning", "No User or File")
      return;
    }
    if(title.length > 20){
      createToast("warning", "Title Too Long")
      return;
    }
    try {
      await addPhoto(file, title, user.email);
      pullPhotoDocuments();
      closeModal();
      createToast("success", "Photo Uploaded");
    } catch (error) {
      closeModal();
      createToast("error", "Upload Failed");
    }
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
          maxLength={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border w-1/2 outline-none p-3 rounded-lg bg-gray-50 hover:bg-gray-100 focus:bg-gray-100"
        />
        <label className="border w-1/2 rounded-lg hover:bg-gray-100 flex p-3">
          <input
            required
            type="file"
            onChange={handleChange}
            accept={"image/*"}
            hidden
          />
          {file ? <p>Selected File: {file.name}</p> : <p>File Select</p>}
        </label>

        <button
          type="submit"
          className="flex space-x-1 hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm hover:text-blue-600 "
        >
          <CloudUploadIcon />
          <p>Upload</p>
        </button>
      </form>
      <div className="w-full h-[10%] flex justify-center items-center">
        <div
          className="flex space-x-1 hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm hover:text-red-600"
          onClick={closeModal}
        >
          <CancelRoundedIcon />
          <p>Cancel</p>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
