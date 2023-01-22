import { useModal } from "../context/ModalContext";
import { useFirestore } from "../context/FirestoreContext";

const ActionBar = () => {
  const { openModal } = useModal();
  const { pullPhotoDocuments } = useFirestore();

  return (
    <div className="flex items-center justify-center my-2 space-x-2 sticky top-14 z-20 mx-32 lg:mx-40">
      <div
        className="border border-black h-9 w-9 rounded-full flex justify-center items-center bg-white opacity-50 hover:opacity-100 hover:cursor-pointer hover:shadow-md"
        onClick={pullPhotoDocuments}
      >
        R
      </div>

      <div className=" w-full flex justify-center items-center border border-black divide-x-2 divide-black rounded-full hover:shadow-md focus-within:shadow-md">
        <input
          type="text"
          placeholder="Search Bar"
          className="w-3/4 focus:outline-none rounded-l-full h-8 pl-2 flex justify-center items-center opacity-50 hover:opacity-100 focus:opacity-100"
        />

        <div
          className="w-1/4 h-8 flex justify-center items-center bg-white rounded-r-full opacity-50 hover:opacity-100 hover:cursor-pointer"
          onClick={() => {
            openModal("add");
          }}
        >
          Add Photo
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
