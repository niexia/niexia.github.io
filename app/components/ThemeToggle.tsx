"use client";

import { useEffect, useState } from "react";


export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const currentDarkMode = !isDark;
    document.documentElement.classList.toggle("dark", currentDarkMode);
    localStorage.theme = currentDarkMode ? "dark" : "light";
    setIsDark(currentDarkMode);
  };

  return (
    <a
      className="select-none cursor-pointer"
      title="Toggle Theme"
      onClick={toggleDark}
    >
      <i className={isDark ? "ri-sun-line" : "ri-moon-line"} />
    </a>
  );
};