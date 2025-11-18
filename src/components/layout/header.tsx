import { Hamburger } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-4 z-20 bg-white shadow-md">
      <img
        src="/logo.png"
        alt="logo"
        className="h-10"
      />
      <Hamburger />
    </header>
  );
};

export default Header;
