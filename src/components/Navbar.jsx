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
      backdrop-blur-lg shadow-lg"
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
                        transform hover:rotateY-180 hover:scale-105
                        perspective-1000 preserve-3d"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), background-color 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => {
                setIsHovered(true);
                e.currentTarget.style.transform = 'rotateY(180deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                setIsHovered(false);
                e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
              }}
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
              <span>Contact Me</span>
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