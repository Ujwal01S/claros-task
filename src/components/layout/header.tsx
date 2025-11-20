import { useAppSelector } from "@/hooks/use-redux";
import { selectTotalItems } from "@/store/slices/cart-slice";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";

const Header = () => {
  const totalCartItems = useAppSelector(selectTotalItems);

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
        <Link
          to="/cart"
          className="relative pr-4"
        >
          <ShoppingCart />
          <Badge className="absolute -top-2 -right-1">{totalCartItems}</Badge>
        </Link>
      </div>
    </header>
  );
};

export default Header;
