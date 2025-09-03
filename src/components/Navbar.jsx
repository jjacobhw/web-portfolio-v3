import { useEffect, useState } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <nav
      className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.65)]
      backdrop-blur-lg border-b border-gray shadow-lg"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full 
            bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200
            border border-gray-600/30"
            aria-label="Toggle dark/light mode"
          >
            {isDarkMode ? (
              <svg 
                className="w-5 h-5 text-yellow-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            ) : (
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
            )}
          </button>

          <div
            className="w-7 h-5 relative cursor-pointer md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>
          <div className="hidden md:flex items-center space-x-7 font-Rubik">
            <a href="#Home" className="text-white font-Rubik">
              Home
            </a>
            <a href="#About" className="text-white font-Rubik">
              About
            </a>
            <a href="#Education" className="text-white font-Rubik">
              Education
            </a>
            <a href="#Projects" className="text-white font-Rubik">
              Projects
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};