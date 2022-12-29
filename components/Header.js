import Link from "next/link";
import { handleSignIn } from "../util/firebaseAuth";

const Header = () => {
  return (
    <header className="bg-white flex items-center justify-between sticky top-0 shadow-md h-12 divide-x">
      <div className="hidden lg:flex items-center mx-5 h-full">
        <Link href={"/"} className="flex items-center h-full">
          Logo
        </Link>
      </div>
      <div className="flex justify-evenly w-1/3 h-full items-center divide-x">
        <Link
          href={"/"}
          className="flex items-center justify-center h-full w-1/3 hover:bg-gray-100"
        >
          Home
        </Link>
        <Link
          href={"/account"}
          className="flex items-center justify-center h-full w-1/3 hover:bg-gray-100"
        >
          Account
        </Link>
        <button
          className="flex items-center justify-center h-full w-1/3 hover:bg-gray-100"
          onClick={() => {
            console.log("signin clicked");
            handleSignIn();
          }}
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
