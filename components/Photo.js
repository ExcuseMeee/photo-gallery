import Image from "next/image";
import { useModal } from "../context/ModalContext";

const Photo = ({ imgUrl, title }) => {
  const { openModal } = useModal();

  function handler() {
    console.log("photo clicked");
    openModal("photo", { imgUrl, title });
  }

  return (
    <div
      className="w-2/3 lg:w-1/4 h-72 flex flex-col items-center justify-evenly bg-white rounded-lg m-2 divide-y hover:shadow-md hover:cursor-pointer"
      onClick={handler}
    >
      <div className="w-full flex justify-center h-fit">{title}</div>
      <div className="w-full h-5/6 flex items-center justify-center overflow-clip relative z-0">
        <Image
          src={imgUrl}
          alt=""
          className="lg:px-2 py-2"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Photo;
