"use client";

export const ThemeToggle = () => {
  const toggleDark = () => {
    const isDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.theme = isDark ? "dark" : "light";
  };

  return (
    <button
      type="button"
      className="inline-flex h-8 w-8 cursor-pointer select-none items-center justify-center transition-colors duration-200 hover:text-accent"
      title="Toggle theme"
      aria-label="Toggle color theme"
      onClick={toggleDark}
    >
      <i className="ri-moon-line dark:hidden" aria-hidden="true" />
      <i className="ri-sun-line hidden dark:inline" aria-hidden="true" />
    </button>
  );
};
