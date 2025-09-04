import { Menu, X } from "lucide-react";

export const MobileNav = ({ menuOpen, setMenuOpen }) => {
  const links = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Education", label: "Education" },
    { href: "#Projects", label: "Projects" },
  ];

  return (
    <>
      {/* Single toggle button with icon transition */}
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

      {/* Slide-out menu — only on mobile */}
      <div
        className={`fixed top-0 right-0 w-full bg-[rgba(10,10,10,0.65)]
        z-40 flex flex-col items-center justify-center gap-y-6 md:hidden
        transition-all duration-400 ease-in-out overflow-hidden
        ${
          menuOpen
            ? "h-screen opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`font-semibold text-white transform transition-all duration-500 font-Rubik text-lg hover:text-gray-300
              ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
            `}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};