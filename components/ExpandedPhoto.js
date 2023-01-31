import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirestoreContext";
import { useModal } from "../context/ModalContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const ExpandedPhoto = ({ photoDocument }) => {
  const { user } = useAuth();
  const { deletePhoto, pullPhotoDocuments } = useFirestore();
  const { closeModal } = useModal();

  async function deleteHandler() {
    console.log("delete btn clicked");
    await deletePhoto(photoDocument.id, photoDocument.imageUrl);
    await pullPhotoDocuments();
    closeModal();
  }

  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-full h-[10%] flex flex-col justify-center items-center">
        <div className={`font-bold text-lg`}>{photoDocument.title}</div>
        <div className={`text-sm font-medium text-gray-400`}>
          {photoDocument.postedBy}
        </div>
      </div>
      <div className="border w-full h-[80%] flex items-center justify-center overflow-clip relative z-0">
        <Image
          src={photoDocument.imageUrl}
          alt={photoDocument.title}
          className="lg:px-2 py-2"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="w-full h-[10%] flex justify-center items-center">
        {user && user.email == photoDocument.postedBy ? (
          <div
            className="flex hover:text-red-600 hover:cursor-pointer"
            onClick={deleteHandler}
          >
            <DeleteIcon />
            <p>Delete</p>
          </div>
        ) : (
          <div className={`flex space-x-1 hover:text-blue-500 hover:cursor-pointer `}>
            <ThumbUpIcon />
            <p>Like</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedPhoto;
