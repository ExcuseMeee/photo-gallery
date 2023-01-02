import { useState } from "react";

const AddPhoto = () => {

  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');

  function handleChange(e){
    console.log("changed ", e)
  }

  return (
    <div className="border h-full flex flex-col items-center">
      <div>Add Photo</div>
      <form className="flex flex-col">
        <input type="text" placeholder="Title"/>
        <input type="file" onChange={handleChange}/>
      </form>
    </div>
  );
};

export default AddPhoto;
