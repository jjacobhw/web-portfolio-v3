import { useEffect } from "react";

export const MobileNav = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[rgba(10,10,10,0.65)]
      z-40 flex flex-col items-center justify-around
      transition-all duration-300 ease-in-out
      ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>
      <a
        href="#Home"
        onClick={() => setMenuOpen(false)}
        className="font-semibold text-white my-4 transform transition-transform duration-200 font-Rubik"
      >
        Home
      </a>
      <a
        href="#About"
        onClick={() => setMenuOpen(false)}
        className={`font-semibold text-white my-4 transform transition-transform duration-200 font-Rubik ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        About
      </a>
      <a
        href="#Education"
        onClick={() => setMenuOpen(false)}
        className="font-semibold text-white my-4 transform transition-transform duration-200 font-Rubik"
      >
        Education
      </a>
      <a
        href="#Projects"
        onClick={() => setMenuOpen(false)}
        className="font-semibold text-white my-4 transform transition-transform duration-200 font-Rubik"
      >
        Projects
      </a>
    </div>
  );
};
