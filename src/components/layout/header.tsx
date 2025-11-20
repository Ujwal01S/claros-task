import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="w-full  px-4  shadow-md bg-white fixed z-20 md:z-[99]">
      <div className=" h-16 flex items-center justify-between  ">
        <Link to={"/"}>
          <img
            src="/logo.png"
            alt="logo"
            className="h-10"
          />
        </Link>
        <ShoppingCart />
      </div>
    </header>
  );
};

export default Header;
