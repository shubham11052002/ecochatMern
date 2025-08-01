import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FiLogOut, FiUser, FiSettings, FiMessageSquare } from "react-icons/fi";
import { Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuth();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#1e1e2e] border-b border-[#2c2c3b] shadow-lg backdrop-blur-md"
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-white p-2 rounded-md transition duration-300 group"
        >
          <FiMessageSquare
            size={22}
            className="transition duration-300 group-hover:text-[#4c4cff]"
          />
          <Link to="/"><span className="text-lg font-semibold tracking-wide transition-all duration-300 group-hover:text-[#4c4cff]">
            EcoChat
          </span></Link>
        </motion.div>

        <div className="flex items-center gap-4 absolute right-4">
          <Tooltip content="Settings" placement="bottom">
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="p-2 rounded-md text-white hover:shadow-[0_0_10px_#4c4cff] transition duration-300"
            >
              <Link to="/settings">
                <FiSettings size={22} />
              </Link>
            </motion.div>
          </Tooltip>

          {authUser && (
            <>
              <Tooltip content="Profile" placement="bottom">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-md text-white hover:shadow-[0_0_10px_#4c4cff] transition duration-300"
                >
                  <Link to="/profile">
                    <FiUser size={22} />
                  </Link>
                </motion.div>
              </Tooltip>

              <Tooltip content="Logout" placement="bottom">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  onClick={logout}
                  className="p-2 rounded-md text-white hover:shadow-[0_0_10px_#ff4c4c] transition duration-300"
                >
                  <FiLogOut size={22} />
                </motion.button>
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
