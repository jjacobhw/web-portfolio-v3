import { Menu, X, Mail, Mails, Home, CodeXml, Computer, Folders } from "lucide-react";
import { useState } from "react";
import { Link } from 'react-router-dom'; // Add this import

export const MobileNav = ({ menuOpen, setMenuOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const links = [
    { path: "/", label: "Home", icon: Home },
    { path: "/skills", label: "Skills", icon: CodeXml },
    { path: "/experience", label: "Experience", icon: Computer },
    { path: "/projects", label: "Projects", icon: Folders },
  ];

  const handleEmailClick = () => {
    setMenuOpen(false);
    window.location.href = "mailto:your.email@example.com";
  };

  return (
    <>
      {/* Toggle button remains the same */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 right-4 text-white z-50 cursor-pointer w-10 h-10 flex items-center justify-center md:hidden"
        aria-label="Toggle Menu"
      >
        <div className="relative w-7 h-7 flex items-center justify-center">
          <Menu 
            size={28} 
            className={`absolute transition-all duration-300 ease-in-out ${
              menuOpen 
                ? 'opacity-0 rotate-90 scale-75' 
                : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X 
            size={28} 
            className={`absolute transition-all duration-300 ease-in-out ${
              menuOpen 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 rotate-90 scale-75'
            }`}
          />
        </div>
      </button>

      {/* Slide-out menu */}
      <div
        className={`fixed top-0 right-0 w-full bg-[rgba(10,10,10,0.95)]
        z-40 flex flex-col items-center justify-center gap-y-6 md:hidden
        transition-all duration-400 ease-in-out overflow-hidden
        ${
          menuOpen
            ? "h-screen opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Contact Button */}
        <button
          onClick={handleEmailClick}
          className={`group flex items-center gap-3 font-semibold text-white transform transition-all duration-500 font-Rubik text-lg hover:text-gray-300 cursor-pointer
            ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
          style={{ transitionDelay: `0ms` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-5 h-5">
            <Mail 
              className={`w-5 h-5 absolute transition-all duration-300 grozup-hover:scale-110 ${
                isHovered ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
              }`}
            />
            <Mails 
              className={`w-5 h-5 absolute transition-all duration-300 group-hover:scale-110 ${
                isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'
              }`}
            />
          </div>
          <span>Contact</span>
        </button>
        
        {/* Navigation links */}
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`group flex items-center gap-3 font-semibold text-white transform transition-all duration-500 font-Rubik text-lg hover:text-gray-300 cursor-pointer
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <IconComponent className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};