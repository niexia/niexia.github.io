"use client"

import { useEffect, useState } from "react";

function ScrollToTop() {
  const [showToTop, setShowToTop] = useState(false);

  const toTop = () => {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const checkScrollable = () => document.documentElement.scrollHeight > window.innerHeight;
    const onScroll = () => {
      const scrolledDown = window.scrollY > 100; // only show after user scrolled a bit
      setShowToTop(checkScrollable() && scrolledDown);
    };
    const onResize = () => {
      if (!checkScrollable()) setShowToTop(false);
      else onScroll();
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    // initial check
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
  <>
    {showToTop && (
      <button title="scroll to top"
        className="hidden xl:block fixed bottom-8 right-6 rounded-full p-1 hover:cursor-pointer shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-200"
        onClick={toTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5l-3-3-3 3" />
        </svg>
      </button>
    )}
  </>
  )
}

export { ScrollToTop }
