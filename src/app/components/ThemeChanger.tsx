import React from "react";
import { FaMoon, FaSun, FaRegMoon } from "react-icons/fa";

/**
 * Theme changer component
 * @param {boolean} theme Theme - True or False
 * @param {void} handleTheme Function to set theme
 */
function ThemeChanger({
  theme,
  handleTheme,
}: {
  theme: boolean;
  handleTheme: () => void;
}) {
  return (
    <span onClick={handleTheme}>
      {theme ? (
        <>
          <FaMoon className="text-warning" />
          <FaSun />
        </>
      ) : (
        <>
          <FaRegMoon />
          <FaSun className="text-warning" />
        </>
      )}
    </span>
  );
}

export default ThemeChanger;
