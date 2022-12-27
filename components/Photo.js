import Image from "next/image"

const Photo = ({imgUrl}) => {
  return (
    <div className="w-2/3 lg:w-1/4 h-72 border border-black flex flex-col items-center bg-white rounded-lg m-2">
      <div className="border border-black w-full flex justify-center h-fit">
        Title
      </div>
      <div className="w-full h-5/6 border border-black flex items-center justify-center">
        <Image src={imgUrl} alt='' width={350} height={350} /> 

      </div>
      <div className="w-full border border-black">
        EEE
      </div>

    </div>
  )
}

export default Photo