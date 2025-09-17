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
  const isManualNavigationRef = useRef(false);
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
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };
    
    const handleIntersect = (entries) => {
      if (menuOpen || isScrollingRef.current || isManualNavigationRef.current) return;
      
      let mostVisibleSection = null;
      let maxVisibility = 0;
      
      entries.forEach(entry => {
        const sectionIndex = ['home', 'skills', 'experience', 'projects'].indexOf(entry.target.id);
        if (sectionIndex === -1) return;
        
        const intersectionRatio = entry.intersectionRatio;
        
        if (intersectionRatio > maxVisibility) {
          maxVisibility = intersectionRatio;
          mostVisibleSection = sectionIndex;
        }
      });
      
      if (mostVisibleSection !== null && maxVisibility > 0.3 && mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
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

  const smoothScrollToSection = (sectionIndex) => {
    const targetElement = sectionRefs[sectionIndex]?.current;
    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop;
    const distance = targetPosition - startPosition;
    const duration = 600;
    let start = null;

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
        isManualNavigationRef.current = false;
        setTimeout(() => {
          if (observerRef.current) {
            sectionRefs.forEach(ref => {
              if (ref.current) {
                observerRef.current.observe(ref.current);
              }
            });
          }
        }, 100);
      }
    };

    requestAnimationFrame(animation);
  };

  const instantScrollToSection = (sectionIndex) => {
    const targetElement = sectionRefs[sectionIndex]?.current;
    if (!targetElement) return;

    targetElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });

    setTimeout(() => {
      isScrollingRef.current = false;
      isManualNavigationRef.current = false;
      if (observerRef.current) {
        sectionRefs.forEach(ref => {
          if (ref.current) {
            observerRef.current.observe(ref.current);
          }
        });
      }
    }, 50);
  };

  const navigateToSection = useCallback((sectionIndex, instant = false) => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    isManualNavigationRef.current = true;
    setActiveSection(sectionIndex);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    if (instant) {
      instantScrollToSection(sectionIndex);
    } else {
      smoothScrollToSection(sectionIndex);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      isManualNavigationRef.current = false;
      if (observerRef.current) {
        sectionRefs.forEach(ref => {
          if (ref.current) {
            observerRef.current.observe(ref.current);
          }
        });
      }
    }, 600);
  }, []);

  const handleNavClick = useCallback((sectionIndex) => {
    navigateToSection(sectionIndex, true);
    setMenuOpen(false);
  }, [navigateToSection]);

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        if (!isScrollingRef.current && !isManualNavigationRef.current) {
          const scrollPosition = window.scrollY + window.innerHeight / 3;
          
          let closestSection = 0;
          let minDistance = Infinity;
          
          sectionRefs.forEach((ref, index) => {
            if (ref.current) {
              const sectionTop = ref.current.offsetTop;
              const sectionBottom = sectionTop + ref.current.offsetHeight;
              const distance = Math.abs(scrollPosition - (sectionTop + sectionBottom) / 2);
              
              if (distance < minDistance) {
                minDistance = distance;
                closestSection = index;
              }
            }
          });
          
          if (closestSection !== activeSection) {
            setActiveSection(closestSection);
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [activeSection]);

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
      <div 
        ref={containerRef}
        className="overflow-y-auto"
        style={{ scrollBehavior: 'auto' }}
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