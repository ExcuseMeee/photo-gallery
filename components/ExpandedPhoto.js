import Image from "next/image";

const ExpandedPhoto = ({ title, imageUrl }) => {
  return (
    <div className="border border-black h-full flex flex-col items-center">
      <div className="border w-full h-[10%] flex justify-center items-center">
        {title}
      </div>
      <div className="border w-full h-[85%] flex items-center justify-center overflow-clip relative z-0">
        <Image
          src={imageUrl}
          alt=""
          className="lg:px-2 py-2"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="border w-full h-[5%]">Bottom</div>
    </div>
  );
};

export default ExpandedPhoto;
