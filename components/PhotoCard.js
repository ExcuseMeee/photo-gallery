import Image from "next/image";
import { useModal } from "../context/ModalContext";

const PhotoCard = ({ photoDocument }) => {
  const { openModal } = useModal();

  function handler() {
    openModal("photo", { photoDocument });
  }

  return (
    <div
      className="w-2/3 lg:w-1/4 h-72 flex flex-col items-center justify-evenly bg-white rounded-lg m-2 divide-y hover:shadow-md hover:cursor-pointer photoContainer"
      onClick={handler}
    >
      <div className="w-full flex justify-center h-fit photoTitle">
        {photoDocument.title}
      </div>
      <div className="w-full h-5/6 flex items-center justify-center overflow-clip relative z-0">
        <Image
          src={photoDocument.imageUrl}
          alt={photoDocument.title}
          className="lg:px-2 py-2"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default PhotoCard;
