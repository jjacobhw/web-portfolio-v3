import { useEffect, useState } from "react";
import { Mail, Mails, Home, Computer, CodeXml, Folders } from 'lucide-react';

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    // Try both lowercase and capitalized versions
    let element = document.getElementById(sectionId);
    if (!element) {
      // Try capitalized version
      const capitalizedId = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
      element = document.getElementById(capitalizedId);
    }
    
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    } else {
      console.warn(`Element with ID "${sectionId}" not found`);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'skills', label: 'Skills', icon: CodeXml },
    { id: 'experience', label: 'Experience', icon: Computer },
    { id: 'projects', label: 'Projects', icon: Folders },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.65)] backdrop-blur-lg shadow-lg shadow-[#1DB954]/20"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 8px 25px -5px rgba(29, 185, 84, 0.3)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex items-center justify-between w-full">
            <a 
              href="mailto:jhwei@ucsc.edu" 
              className="text-[#1DB954] hover:bg-gray-100 dark:hover:bg-gray-800
                        px-4 py-2 rounded-md transition-all duration-500
                        flex items-center gap-2 group
                        hover:animate-pulse
                        transform hover:scale-105 cursor-pointer"
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
            
            <div className="flex items-center space-x-3 font-Rubik">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white hover:bg-gray-100 dark:hover:bg-gray-800
                              px-3 py-2 rounded-md transition-all duration-500
                              flex items-center gap-2 group relative
                              hover:animate-pulse
                              transform hover:scale-105 cursor-pointer"
                    onMouseEnter={() => setHoveredButton(item.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div className="relative w-4 h-4">
                      <IconComponent 
                        className={`w-4 h-4 absolute transition-all duration-300 group-hover:scale-110 ${
                          hoveredButton === item.id ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
                        }`}
                      />
                      <IconComponent 
                        className={`w-4 h-4 absolute transition-all duration-300 group-hover:scale-110 text-[#1DB954] ${
                          hoveredButton === item.id ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'
                        }`}
                      />
                    </div>
                    <span className="text-white group-hover:text-[#1DB954] transition-colors duration-200">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="md:hidden w-full"></div>
        </div>
      </div>
    </nav>
  );
};