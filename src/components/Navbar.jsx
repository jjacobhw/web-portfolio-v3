import { useEffect, useState } from "react";
import { Mail, Mails } from 'lucide-react';

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    // Try both the original case and lowercase to handle mixed casing
    let element = document.getElementById(sectionId);
    if (!element) {
      element = document.getElementById(sectionId.toLowerCase());
    }
    
    if (element) {
      const navbarHeight = 64; // h-16 = 64px
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition), // Ensure we don't scroll past the top
        behavior: 'smooth'
      });
    } else {
      console.warn(`Element with ID "${sectionId}" or "${sectionId.toLowerCase()}" not found`);
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.65)]
      backdrop-blur-lg shadow-lg shadow-[#1DB954]/20"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 8px 25px -5px rgba(29, 185, 84, 0.3)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex items-center justify-between w-full">
            <a 
              href="mailto:jhwei@ucsc.edu" 
              className="border border-gray-300 dark:border-gray-600 
                        hover:border-gray-500 dark:hover:border-gray-400
                        text-[#1DB954] hover:bg-gray-100 dark:hover:bg-gray-800
                        px-4 py-2 rounded-md transition-all duration-500
                        flex items-center gap-2 group
                        hover:animate-pulse
                        transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-4 h-4">
                <Mail 
                  className={`w-4 h-4 absolute transition-all duration-300 group-hover:scale-110 ${
                    isHovered ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
                  }`}
                />
                <Mails 
                  className={`w-4 h-4 absolute transition-all duration-300 group-hover:scale-110 ${
                    isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'
                  }`}
                />
              </div>
              <span>Contact</span>
            </a>
            
            <div className="flex items-center space-x-7 font-Rubik">
              <button 
                onClick={() => scrollToSection('Home')}
                className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200 cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('Experience')}
                className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200 cursor-pointer"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('Skills')}
                className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200 cursor-pointer"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('Projects')}
                className="text-white font-Rubik hover:text-[#1DB954] transition-colors duration-200 cursor-pointer"
              >
                Projects
              </button>             
            </div>
          </div>
          
          <div className="md:hidden w-full"></div>
        </div>
      </div>
    </nav>
  );
};