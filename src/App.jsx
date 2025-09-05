// App.jsx
import { Navbar } from './utilities/Navbar'
import { MobileNav } from './utilities/MobileNav'
import { Home } from './components/Home'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Footer } from './components/Footer' // Add this import
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
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };
    
    const handleIntersect = (entries) => {
      if (menuOpen || isScrollingRef.current) return;
      
      // Find the section with the highest intersection ratio
      let maxRatio = 0.1;
      let maxSectionIndex = activeSection;
      
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
      
      // Only update if we have a clear winner and it's different from current
      if (maxSectionIndex !== activeSection && maxRatio > 0.3) {
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
  }, [menuOpen, activeSection]);

  // Smooth scroll function
  const smoothScrollToSection = (sectionIndex) => {
    const targetElement = sectionRefs[sectionIndex]?.current;
    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    let start = null;

    // Custom easing function for smoother animation
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        // Animation complete
        isScrollingRef.current = false;
        
        // Re-enable observer after a short delay
        setTimeout(() => {
          if (observerRef.current) {
            sectionRefs.forEach(ref => {
              if (ref.current) {
                observerRef.current.observe(ref.current);
              }
            });
          }
        }, 200);
      }
    };

    requestAnimationFrame(animation);
  };

  // Navigation function - MODIFIED to always scroll to section top
  const navigateToSection = useCallback((sectionIndex) => {
    // Remove the condition that prevents scrolling to the same section
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    setActiveSection(sectionIndex);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Temporarily disconnect observer to prevent interference
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Use custom smooth scroll
    smoothScrollToSection(sectionIndex);
  }, []); // Remove activeSection from dependencies since we always want to scroll

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
      
      {/* Scroll container without snap behavior */}
      <div 
        ref={containerRef}
        className="overflow-y-auto"
      >
        <section 
          ref={sectionRefs[0]}
          id="home"
          className="min-h-screen w-full flex items-center justify-center"
        >
          <Home />
        </section>
        <section 
          ref={sectionRefs[1]}
          id="skills"
          className="min-h-screen py-8 w-full flex items-start justify-center"
        >
          <Skills />
        </section>
        <section 
          ref={sectionRefs[2]}
          id="experience"
          className="min-h-screen w-full flex items-center justify-center"
        >
          <Experience />
        </section>
        <section 
          ref={sectionRefs[3]}
          id="projects"
          className="min-h-screen w-full flex items-center justify-center"
        >
          <Projects />
        </section>
        
        {/* Footer placed after all sections */}
        <Footer />
      </div>
    </div>
  ); 
}

export default App