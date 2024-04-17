import { useState, useEffect } from "react";

const DarkLightToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-md bg-gray-800 text-white"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkLightToggle;
