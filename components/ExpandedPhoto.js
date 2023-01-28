import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';

const ExpandedPhoto = ({ title, imageUrl, postedBy }) => {
  const { user } = useAuth();

  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-full h-[10%] flex flex-col justify-center items-center">
        <div className={`font-bold text-lg`}>{title}</div>
        <div className={`text-sm font-medium text-gray-400`}>{postedBy}</div>
      </div>
      <div className="border w-full h-[80%] flex items-center justify-center overflow-clip relative z-0">
        <Image
          src={imageUrl}
          alt=""
          className="lg:px-2 py-2"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="w-full h-[10%] flex justify-center items-center border">
        {user && user.email == postedBy ? (
          <div className="flex hover:text-red-700 hover:cursor-pointer">
            <DeleteIcon />
            <p>Delete</p>
          </div>
        ) : (
          <p>Not posted by user</p>
        )}
      </div>
    </div>
  );
};

export default ExpandedPhoto;
