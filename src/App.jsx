// App.jsx
import { Navbar } from './utilities/Navbar'
import { MobileNav } from './utilities/MobileNav'
import { Home } from './components/Home'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { useState, useRef, useEffect, useCallback } from 'react';
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
  
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const observerRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  
  // Check if device is mobile on initial render and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Setup Intersection Observer for section detection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.1, 0.5, 0.9, 1]
    };
    
    const handleIntersect = (entries) => {
      if (menuOpen || isScrollingRef.current) return;
      
      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let maxSectionIndex = -1;
      
      entries.forEach(entry => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const id = entry.target.id;
          const sectionIndex = ['home', 'skills', 'experience', 'projects'].indexOf(id);
          if (sectionIndex !== -1) {
            maxSectionIndex = sectionIndex;
          }
        }
      });
      
      if (maxSectionIndex !== -1 && maxRatio > 0.1) {
        setActiveSection(maxSectionIndex);
      }
    };
    
    observerRef.current = new IntersectionObserver(handleIntersect, options);
    
    // Observe all sections
    sectionRefs.forEach(ref => {
      if (ref.current) {
        observerRef.current.observe(ref.current);
      }
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [menuOpen]);

  // Navigation function
  const navigateToSection = useCallback((sectionIndex) => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    setActiveSection(sectionIndex);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Scroll to section
    if (sectionRefs[sectionIndex]?.current) {
      sectionRefs[sectionIndex].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Reset scrolling flag
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  // Handle scroll snap with keyboard and wheel events
  useEffect(() => {
    if (isMobile || menuOpen) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const now = Date.now();
      
      // Throttle wheel events to prevent too rapid firing
      if (now - lastScrollTimeRef.current < 150) return;
      
      if (isScrollingRef.current || menuOpen) return;
      
      // Only handle significant wheel movements
      if (Math.abs(e.deltaY) < 30) return;
      
      e.preventDefault();
      lastScrollTimeRef.current = now;
      
      if (e.deltaY > 0) {
        // Scroll down
        const nextSection = Math.min(activeSection + 1, sectionRefs.length - 1);
        if (nextSection !== activeSection) {
          navigateToSection(nextSection);
        }
      } else {
        // Scroll up
        const prevSection = Math.max(activeSection - 1, 0);
        if (prevSection !== activeSection) {
          navigateToSection(prevSection);
        }
      }
    };
    
    const handleKeyDown = (e) => {
      if (isScrollingRef.current || menuOpen) return;
      
      let targetSection = -1;
      
      switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
          targetSection = Math.min(activeSection + 1, sectionRefs.length - 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          targetSection = Math.max(activeSection - 1, 0);
          break;
        case 'Home':
          targetSection = 0;
          break;
        case 'End':
          targetSection = sectionRefs.length - 1;
          break;
        default:
          return;
      }
      
      if (targetSection !== -1 && targetSection !== activeSection) {
        e.preventDefault();
        navigateToSection(targetSection);
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeSection, menuOpen, isMobile, navigateToSection]);

  // Handle navbar navigation
  const handleNavClick = useCallback((sectionIndex) => {
    navigateToSection(sectionIndex);
    setMenuOpen(false); // Close mobile menu if open
  }, [navigateToSection]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeSection={activeSection} 
        setActiveSection={handleNavClick}
        isMobile={isMobile}
      />
      <MobileNav 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeSection={activeSection} 
        setActiveSection={handleNavClick}
      />
      
      {/* Scroll container with conditional snap behavior */}
      <div 
        ref={containerRef}
        className={`${isMobile 
          ? 'overflow-y-auto' 
          : 'snap-container h-screen overflow-y-auto snap-y snap-mandatory'
        } scroll-smooth`}
        style={{ scrollBehavior: 'smooth' }}
      >
        <section 
          ref={sectionRefs[0]}
          id="home"
          className={`${isMobile 
            ? 'min-h-screen' 
            : 'h-screen snap-start snap-always'
          } w-full flex items-center justify-center`}
        >
          <Home />
        </section>
        <section 
          ref={sectionRefs[1]}
          id="skills"
          className={`${isMobile 
            ? 'min-h-screen py-8' 
            : 'min-h-screen snap-start snap-always'
          } w-full flex items-start justify-center`}
        >
          <Skills />
        </section>
        <section 
          ref={sectionRefs[2]}
          id="experience"
          className={`${isMobile 
            ? 'min-h-screen' 
            : 'h-screen snap-start snap-always'
          } w-full flex items-center justify-center`}
        >
          <Experience />
        </section>
        <section 
          ref={sectionRefs[3]}
          id="projects"
          className={`${isMobile 
            ? 'min-h-screen' 
            : 'h-screen snap-start snap-always'
          } w-full flex items-center justify-center`}
        >
          <Projects />
        </section>
      </div>
    </div>
  ); 
}

export default App