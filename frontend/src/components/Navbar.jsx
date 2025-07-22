import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FiLogOut, FiUser, FiSettings, FiMessageSquare } from "react-icons/fi";
import { Tooltip } from "@nextui-org/react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { logout, authUser } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1e1e2e] border-b border-[#2c2c3b] shadow-md backdrop-blur-md">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white p-2 rounded-md hover:shadow-[0_0_10px_#4c4cff] transition duration-300">
          <FiMessageSquare size={22} />
          <span className="text-lg font-semibold tracking-wide">Ecochat</span>
        </div>

        <div className="flex items-center gap-4 absolute right-4">
          <Tooltip content="Settings" placement="bottom">
            <Link
              to="/settings"
              className="p-2 rounded-md text-white hover:shadow-[0_0_10px_#4c4cff] transition duration-300"
            >
              <FiSettings size={22} />
            </Link>
          </Tooltip>

          {authUser && (
            <>
              <Tooltip content="Profile" placement="bottom">
                <Link
                  to="/profile"
                  className="p-2 rounded-md text-white hover:shadow-[0_0_10px_#4c4cff] transition duration-300"
                >
                  <FiUser size={22} />
                </Link>
              </Tooltip>

              <Tooltip content="Logout" placement="bottom">
                <button
                  onClick={logout}
                  className="p-2 rounded-md text-white hover:shadow-[0_0_10px_#ff4c4c] transition duration-300"
                >
                  <FiLogOut size={22} />
                </button>
              </Tooltip>
            </>
          )}

<Tooltip content="Theme Toggle" placement="bottom">
  <div className="p-2 rounded-md hover:shadow-[0_-4px_10px_white,0_4px_10px_black] transition duration-300">
    <ThemeToggle />
  </div>
</Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
