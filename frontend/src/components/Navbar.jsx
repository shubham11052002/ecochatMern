import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <NextNavbar maxWidth="full" position="static" className="bg-[#1e1e2e] text-white px-4">
      <NavbarBrand className="gap-2">
        <img src="/logo.png" alt="Ecochat" className="h-8 w-8 object-contain" />
        <span className="font-bold text-xl">Ecochat</span>
      </NavbarBrand>

      <NavbarContent justify="center" className="gap-6 hidden md:flex">
        <NavbarItem>
          <Link to="/about" className="text-white hover:text-primary">About</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/contact" className="text-white hover:text-primary">Contact</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/profile" className="text-white hover:text-primary">Profile</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/settings" className="text-white hover:text-primary">Settings</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Link to="/login" className="text-white transition duration-400 bg-red-600 px-2 py-1 rounded hover:bg-white hover:text-red-600 ">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/signup" className="text-white bg-blue-600 px-2 py-1 rounded transition duration-400 hover:bg-white hover:text-black ">Signup</Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
