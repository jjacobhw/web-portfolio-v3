import { Navbar } from './utilities/Navbar'
import { MobileNav } from './utilities/MobileNav'
import { Home } from './components/Home'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Footer } from './components/Footer'
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
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };
    
    const handleIntersect = (entries) => {
      if (menuOpen || isScrollingRef.current) return;
      
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
      
      if (maxSectionIndex !== activeSection && maxRatio > 0.3) {
        setActiveSection(maxSectionIndex);
      }
    };
    
    observerRef.current = new IntersectionObserver(handleIntersect, options);
    
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

  // Fast smooth scroll with shorter duration and optimized easing
  const smoothScrollToSection = (sectionIndex) => {
    const targetElement = sectionRefs[sectionIndex]?.current;
    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop;
    const distance = targetPosition - startPosition;
    // Reduced duration from 1200ms to 600ms for faster navigation
    const duration = 600;
    let start = null;

    // More responsive easing function
    const easeOutQuart = (t) => {
      return 1 - (--t) * t * t * t;
    };

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        isScrollingRef.current = false;
        // Reduced timeout for faster re-enabling of observer
        setTimeout(() => {
          if (observerRef.current) {
            sectionRefs.forEach(ref => {
              if (ref.current) {
                observerRef.current.observe(ref.current);
              }
            });
          }
        }, 100); // Reduced from 200ms to 100ms
      }
    };

    requestAnimationFrame(animation);
  };

  // Alternative instant scroll function for even faster navigation
  const instantScrollToSection = (sectionIndex) => {
    const targetElement = sectionRefs[sectionIndex]?.current;
    if (!targetElement) return;

    // Use native scrollIntoView with smooth behavior (hardware accelerated)
    targetElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });

    // Quick reset for observer
    setTimeout(() => {
      isScrollingRef.current = false;
      if (observerRef.current) {
        sectionRefs.forEach(ref => {
          if (ref.current) {
            observerRef.current.observe(ref.current);
          }
        });
      }
    }, 50);
  };

  // Navigation function with option for instant or smooth scroll
  const navigateToSection = useCallback((sectionIndex, instant = false) => {
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
    
    // Choose scroll method based on preference
    if (instant) {
      instantScrollToSection(sectionIndex);
    } else {
      smoothScrollToSection(sectionIndex);
    }
  }, []);

  // Handle navbar navigation - using native scrollIntoView for fastest performance
  const handleNavClick = useCallback((sectionIndex) => {
    // Using instant scroll option with native scrollIntoView (hardware-accelerated)
    navigateToSection(sectionIndex, true);
    setMenuOpen(false);
  }, [navigateToSection]);

  // Add keyboard navigation for better UX
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (menuOpen) return;
      
      switch(e.key) {
        case '1':
          handleNavClick(0);
          break;
        case '2':
          handleNavClick(1);
          break;
        case '3':
          handleNavClick(2);
          break;
        case '4':
          handleNavClick(3);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNavClick, menuOpen]);

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
      
      {/* Scroll container optimized for performance */}
      <div 
        ref={containerRef}
        className="overflow-y-auto"
        style={{ scrollBehavior: 'auto' }} // Disable CSS scroll-behavior to use JS control
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
        
        <Footer />
      </div>
    </div>
  ); 
}

export default App