import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.65)]
      backdrop-blur-lg border-b border-white shadow-lg"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#Home" className="font-bold text-xl text-white font-Rubik">
            Jacob<span className="text-[#50C878]"> Wei</span>
          </a>
          <div
            className="w-7 h-5 relative cursor-pointer md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>
          <div className="hidden md:flex items-center space-x-7 font-Rubik">
            <a href="#Home" className="font-bold text-white font-Rubik">
              Home
            </a>
            <a href="#About" className="font-bold text-white font-Rubik">
              About
            </a>
            <a href="#Education" className="font-bold text-white font-Rubik">
              Education
            </a>
            <a href="#Projects" className="font-bold text-white font-Rubik">
              Projects
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
