"use client";

import { useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    const newDark = !isDark;
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.theme = newDark ? "dark" : "light";
    setIsDark(newDark);
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