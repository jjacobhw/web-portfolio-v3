import { useEffect } from "react";

export const MobileNav = ({ menuOpen, setMenuOpen }) => {
  const links = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Education", label: "Education" },
    { href: "#Projects", label: "Projects" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[rgba(10,10,10,0.65)]
      z-40 flex flex-col items-center justify-center gap-y-6
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

      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          onClick={() => setMenuOpen(false)}
          className={`font-semibold text-white transform transition-all duration-500 font-Rubik
            ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};
