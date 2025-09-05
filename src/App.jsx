// App.jsx
import { Navbar } from './utilities/Navbar'
import { MobileNav } from './utilities/MobileNav'
import { Home } from './components/Home'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { useState, useRef, useEffect } from 'react';
import './index.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  
  // Check if device is mobile on initial render and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for mobile
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Handle scroll snap with keyboard and wheel events - only for desktop
  useEffect(() => {
    if (isMobile || menuOpen) return;
    
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let touchStartY = 0;
    
    const handleWheel = (e) => {
      if (isScrolling || menuOpen) return;
      
      e.preventDefault();
      isScrolling = true;
      
      if (e.deltaY > 0) {
        // Scroll down
        setActiveSection(prev => Math.min(prev + 1, sectionRefs.length - 1));
      } else {
        // Scroll up
        setActiveSection(prev => Math.max(prev - 1, 0));
      }
      
      setTimeout(() => { isScrolling = false; }, 1000);
    };
    
    const handleKeyDown = (e) => {
      if (isScrolling || menuOpen) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        isScrolling = true;
        setActiveSection(prev => Math.min(prev + 1, sectionRefs.length - 1));
        setTimeout(() => { isScrolling = false; }, 1000);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        isScrolling = true;
        setActiveSection(prev => Math.max(prev - 1, 0));
        setTimeout(() => { isScrolling = false; }, 1000);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveSection(sectionRefs.length - 1);
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, sectionRefs.length, isMobile]);
  
  // Scroll to active section when it changes - only for desktop
  useEffect(() => {
    if (!isMobile && sectionRefs[activeSection]?.current) {
      sectionRefs[activeSection].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection, isMobile]);

  // Update active section based on scroll position - only for desktop
  useEffect(() => {
    if (isMobile) return;
    
    const handleScroll = () => {
      if (menuOpen) return;
      
      const scrollPosition = window.scrollY + 100; // Offset for navbar
      
      for (let i = 0; i < sectionRefs.length; i++) {
        const section = sectionRefs[i].current;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(i);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen, isMobile]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isMobile={isMobile}
      />
      <MobileNav 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {/* Scroll container with conditional snap behavior */}
      <div 
        ref={containerRef}
        className={`${isMobile ? 'overflow-y-auto' : 'snap-container h-screen overflow-y-auto snap-y snap-mandatory'} scroll-smooth`}
        style={{ scrollBehavior: 'smooth' }}
      >
        <section 
          ref={sectionRefs[0]}
          id="home"
          className={`${isMobile ? 'min-h-screen' : 'h-screen snap-start snap-always'} w-full flex items-center justify-center`}
        >
          <Home />
        </section>
        <section 
          ref={sectionRefs[1]}
          id="skills"
          className={`${isMobile ? 'min-h-screen py-8' : 'min-h-screen snap-start snap-always'} w-full flex items-start justify-center`}
        >
          <Skills />
        </section>
        <section 
          ref={sectionRefs[2]}
          id="experience"
          className={`${isMobile ? 'min-h-screen' : 'h-screen snap-start snap-always'} w-full flex items-center justify-center`}
        >
          <Experience />
        </section>
        <section 
          ref={sectionRefs[3]}
          id="projects"
          className={`${isMobile ? 'min-h-screen' : 'h-screen snap-start snap-always'} w-full flex items-center justify-center`}
        >
          <Projects />
        </section>
      </div>
    </div>
  ); 
}

export default App