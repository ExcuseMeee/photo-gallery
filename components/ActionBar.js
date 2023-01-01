
const ActionBar = () => {
  return (
    <div className="flex justify-center items-center my-4 mx-28 lg:mx-52 border border-black divide-x-2 divide-black rounded-full">
      <div className="w-3/4">
        <input type="text" placeholder="Search Bar" className="w-full focus:outline-none rounded-l-full" />
      </div>

      <div className="w-1/4">
        Add Photo
      </div>

    </div>
  )
}

export default ActionBar