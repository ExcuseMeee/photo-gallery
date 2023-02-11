import { useModal } from "../context/ModalContext";
import { useFirestore } from "../context/FirestoreContext";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const ActionBar = () => {
  const { openModal } = useModal();
  const { pullPhotoDocuments } = useFirestore();

  function filter(e){
    const query = e.target.value.toLowerCase().trim()
    const photoComponents = document.querySelectorAll(".photoContainer");
    photoComponents.forEach((photo)=>{
      const title = photo.querySelector(".photoTitle").innerHTML
      if(title.toLowerCase().includes(query)){
        photo.style.display = "flex";
      }else{
        photo.style.display = "none";

      }
    })
    
  }

  return (
    <div className="flex items-center justify-center my-2 space-x-2 sticky top-14 z-20 mx-32 lg:mx-40">
      <div
        className="border border-black h-9 w-9 rounded-full flex justify-center items-center bg-white opacity-75 hover:opacity-100 hover:cursor-pointer hover:shadow-md"
        onClick={pullPhotoDocuments}
      >
        <RefreshIcon />
      </div>

      <div className=" w-full flex justify-center items-center border border-black divide-x-2 divide-black rounded-full hover:shadow-md focus-within:shadow-md">
        <input
          type="text"
          placeholder="Search Bar"
          className="w-3/4 focus:outline-none rounded-l-full h-8 pl-2 flex justify-center items-center opacity-75 hover:opacity-100 focus:opacity-100"
          onChange={filter}
        />

        <div
          className="w-1/4 h-8 flex justify-center items-center bg-white rounded-r-full opacity-75 hover:opacity-100 hover:cursor-pointer space-x-1"
          onClick={() => {
            openModal("add");
          }}
        >
          <AddPhotoAlternateOutlinedIcon />
          <p>Add Photo</p>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
