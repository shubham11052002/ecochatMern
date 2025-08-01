import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeSettingCard = ({
  title,
  description,
  icon,
  control
}) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-base-100 border border-base-300 hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-base-content">{title}</h3>
          <p className="text-sm text-base-content/60">{description}</p>
        </div>
      </div>
      {control}
    </div>
  );
};

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setIsDarkMode(initialTheme === "dark");
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-base-200"
    >
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden"
        >
          <div className="p-6 border-b border-base-300">
            <h1 className="text-2xl font-semibold text-base-content">Appearance Settings</h1>
            <p className="text-sm text-base-content/60 mt-1">
              Customize your viewing experience
            </p>
          </div>

          <div className="p-6 space-y-4">
            <ThemeSettingCard
              title="Dark Mode"
              description="Switch between light and dark theme"
              icon={isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={handleToggle}
                  className={`${
                    isDarkMode ? 'bg-primary' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              }
            />

            <div className="pt-4 mt-4 border-t border-base-300">
              <p className="text-sm text-base-content/60">
                Current theme:{" "}
                <span className="font-medium text-base-content">
                  {isDarkMode ? "Dark" : "Light"}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings; 