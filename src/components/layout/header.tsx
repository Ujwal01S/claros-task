import { Hamburger } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="w-full  px-4 z-20 shadow-md bg-white">
      <div className=" h-16 flex items-center justify-between  ">
        <Link to={"/"}>
          <img
            src="/logo.png"
            alt="logo"
            className="h-10"
          />
        </Link>
        <Hamburger />
      </div>
    </header>
  );
};

export default Header;
