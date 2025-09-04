import { useEffect, useState } from "react";
import { Mail, Mails } from 'lucide-react';

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.65)]
      backdrop-blur-lg shadow-lg"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop navigation - full width on desktop, hidden on mobile */}
          <div className="hidden md:flex items-center justify-between w-full">
            <a 
              href="mailto:jhwei@ucsc.edu" 
              className="flex items-center space-x-2 bg-transparent border-2 border-[#1DB954] 
                         text-[#1DB954] px-4 py-2 rounded-lg font-Rubik 
                         hover:bg-[#1DB954] hover:text-white transition-all duration-200 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-4 h-4">
                <Mail 
                  className={`w-4 h-4 absolute transition-all duration-300 ${
                    isHovered ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
                  }`}
                />
                <Mails 
                  className={`w-4 h-4 absolute transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'
                  }`}
                />
              </div>
              <span>Contact Me</span>
            </a>
            
            <div className="flex items-center space-x-7 font-Rubik">
              <a href="#Home" className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200">
                Home
              </a>
              <a href="#About" className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200">
                About
              </a>
              <a href="#Education" className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200">
                Education
              </a>
              <a href="#Projects" className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200">
                Projects
              </a>
            </div>
          </div>
          
          {/* Mobile: Empty space for MobileNav component to handle the menu button */}
          <div className="md:hidden w-full"></div>
        </div>
      </div>
    </nav>
  );
};