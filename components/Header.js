import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-white flex items-center justify-between">
      <div className="border mx-5">
        <Link href={"/"}>Logo</Link>
      </div>
      <div className="flex border justify-around w-1/4">
        <Link href={"/"} >Home</Link>
        <Link href={"/myPhotos"} >My Photos</Link>
        <Link href={"/signIn"} >Sign In</Link>
      </div>

    </header>
  )
}

export default Header