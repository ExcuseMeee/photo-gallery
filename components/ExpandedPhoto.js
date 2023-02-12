import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirestoreContext";
import { useModal } from "../context/ModalContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";

const ExpandedPhoto = ({ photoDocument, createToast }) => {
  const { user, userData } = useAuth();
  const { deletePhoto, pullPhotoDocuments, likePhoto, dislikePhoto } = useFirestore();
  const { closeModal } = useModal();

  const [liked, setLiked] = useState(
    userData ? userData.likedPhotos.includes(photoDocument.id) : false
  );

  useEffect(() => {
    if (!user) return;

    setLiked(userData.likedPhotos.includes(photoDocument.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  async function deleteHandler() {
    try {
      await deletePhoto(photoDocument.id, photoDocument.imageUrl);
      await pullPhotoDocuments();
      closeModal();
      createToast("success", "Photo Deleted")
      
    } catch (error) {
      closeModal();
      createToast("error", "Deletion Failed")
    }
  }

  async function likeHandler() {
    if (!user) return;

    if (liked) {
      await dislikePhoto(photoDocument.id, user.uid);
    } else {
      await likePhoto(photoDocument.id, user.uid);
    }
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
          // user logged in AND posted this image
          <div
            className={`flex hover:text-red-600 hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm`}
            onClick={deleteHandler}
          >
            <DeleteIcon />
            <p>Delete</p>
          </div>
        ) : (
          // user logged out OR user did not post this image
          <div
            className={`flex space-x-1 hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm ${
              liked ? "text-blue-500 " : ""
            }`}
            onClick={user ? likeHandler : () => setLiked(!liked)}
          >
            <ThumbUpIcon />
            {liked ? <p>Liked</p> : <p>Like</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedPhoto;
