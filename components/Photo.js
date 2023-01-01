import Image from "next/image"

const Photo = ({imgUrl, title}) => {
  return (
    <div className="w-2/3 lg:w-1/4 h-72 flex flex-col items-center justify-evenly bg-white rounded-lg m-2 divide-y hover:shadow-md">
      <div className="w-full flex justify-center h-fit">
        {title}
      </div>
      <div className="w-full h-5/6 flex items-center justify-center">
        <Image src={imgUrl} alt='' width={350} height={350} className='lg:px-2' /> 

      </div>

    </div>
  )
}

export default Photo