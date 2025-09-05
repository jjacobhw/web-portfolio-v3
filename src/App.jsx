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
  
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const observerRef = useRef(null);
  const isNavigatingRef = useRef(false); // Flag for navigation clicks
  
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
    if (isMobile) return;
    
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // 40% from top and bottom
      threshold: 0
    };
    
    const handleIntersect = (entries) => {
      if (menuOpen || isScrollingRef.current || isNavigatingRef.current) return;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const sectionIndex = ['home', 'skills', 'experience', 'projects'].indexOf(id);
          if (sectionIndex !== -1) {
            setActiveSection(sectionIndex);
          }
        }
      });
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
  }, [isMobile, menuOpen]);
  
  // Scroll to active section when it changes
  useEffect(() => {
    if (sectionRefs[activeSection]?.current) {
      // Set scrolling flags
      isScrollingRef.current = true;
      if (!isMobile) {
        isNavigatingRef.current = true;
      }
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        if (isMobile) {
          // For mobile, use regular smooth scrolling
          sectionRefs[activeSection].current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // For desktop, use smooth scrolling but with snap behavior
          sectionRefs[activeSection].current.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      // Reset flags after scrolling completes
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        isNavigatingRef.current = false;
      }, 1000); // Increased timeout for navigation
    }
  }, [activeSection, isMobile]);

  // Handle scroll snap with keyboard and wheel events - only for desktop
  useEffect(() => {
    if (isMobile || menuOpen) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (isScrollingRef.current || isNavigatingRef.current || menuOpen) return;
      
      e.preventDefault();
      isScrollingRef.current = true;
      
      if (e.deltaY > 50) {
        // Scroll down
        setActiveSection(prev => Math.min(prev + 1, sectionRefs.length - 1));
      } else if (e.deltaY < -50) {
        // Scroll up
        setActiveSection(prev => Math.max(prev - 1, 0));
      }
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set new timeout
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };
    
    const handleKeyDown = (e) => {
      if (isScrollingRef.current || isNavigatingRef.current || menuOpen) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        isScrollingRef.current = true;
        setActiveSection(prev => Math.min(prev + 1, sectionRefs.length - 1));
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        isScrollingRef.current = true;
        setActiveSection(prev => Math.max(prev - 1, 0));
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
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
      
      // Clean up timeout on unmount
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [menuOpen, sectionRefs.length, isMobile]);

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