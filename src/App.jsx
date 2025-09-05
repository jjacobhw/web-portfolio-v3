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
  const containerRef = useRef(null);
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  
  // Handle scroll snap with keyboard and wheel events
  useEffect(() => {
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
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      if (isScrolling || menuOpen) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Minimum swipe distance to trigger section change
      if (Math.abs(diff) > 50) {
        isScrolling = true;
        
        if (diff > 0) {
          // Swipe up - go to next section
          setActiveSection(prev => Math.min(prev + 1, sectionRefs.length - 1));
        } else {
          // Swipe down - go to previous section
          setActiveSection(prev => Math.max(prev - 1, 0));
        }
        
        setTimeout(() => { isScrolling = false; }, 1000);
      }
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
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, sectionRefs.length]);
  
  // Scroll to active section when it changes
  useEffect(() => {
    if (sectionRefs[activeSection]?.current) {
      sectionRefs[activeSection].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  // Update active section based on scroll position
  useEffect(() => {
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
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden">
      <Navbar 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <MobileNav 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {/* Scroll container with snap sections */}
      <div 
        ref={containerRef}
        className="snap-container h-screen overflow-y-auto snap-y snap-mandatory"
      >
        <section 
          ref={sectionRefs[0]}
          id="home"
          className="h-screen snap-start snap-always"
        >
          <Home />
        </section>
        <section 
          ref={sectionRefs[1]}
          id="skills"
          className="h-screen snap-start snap-always"
        >
          <Skills />
        </section>
        <section 
          ref={sectionRefs[2]}
          id="experience"
          className="h-screen snap-start snap-always"
        >
          <Experience />
        </section>
        <section 
          ref={sectionRefs[3]}
          id="projects"
          className="h-screen snap-start snap-always"
        >
          <Projects />
        </section>
      </div>
    </div>
  ); 
}

export default App