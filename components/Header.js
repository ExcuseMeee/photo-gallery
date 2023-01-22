import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Header = () => {

  const router = useRouter()
  const { user, loginUser, logoutUser } = useAuth();

  return (
    <header className="bg-white flex items-center justify-between sticky top-0 shadow-md h-12 divide-x z-50">
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
          className={`flex items-center justify-center h-full w-1/3 hover:bg-gray-100 ${
            !user ? "bg-gray-200 pointer-events-none" : ""
          }`}
        >
          Account
        </Link>
        <button
          className="flex items-center justify-center h-full w-1/3 hover:bg-gray-100"
          onClick={() => {
            console.log("signin clicked");
            if (user) {
              console.log("logging out user");
              logoutUser();
              router.push("/")
            } else {
              console.log("logging in user");
              loginUser();
            }
          }}
        >
          {user ? <p>Logout</p> : <p>Login</p>}
        </button>
      </div>
    </header>
  );
};

export default Header;
