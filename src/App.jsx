import { Navbar } from './utilities/Navbar'
import { MobileNav } from './utilities/MobileNav'
import { Home } from './components/Home'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { useState, useRef, useCallback } from 'react';
import './index.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  // Custom smooth scroll function with better performance
  const scrollToSection = useCallback((elementRef) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const element = elementRef.current;
    if (!element) {
      setIsScrolling(false);
      return;
    }

    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(800, Math.max(300, Math.abs(distance) * 0.5));
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition);
        setIsScrolling(false);
      }
    }

    // Easing function for smooth acceleration and deceleration
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }, [isScrolling]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen}
        scrollToHome={() => scrollToSection(homeRef)}
        scrollToSkills={() => scrollToSection(skillsRef)}
        scrollToExperience={() => scrollToSection(experienceRef)}
        scrollToProjects={() => scrollToSection(projectsRef)}
        isScrolling={isScrolling}
      />
      <MobileNav 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen}
        scrollToHome={() => {scrollToSection(homeRef); setMenuOpen(false);}}
        scrollToSkills={() => {scrollToSection(skillsRef); setMenuOpen(false);}}
        scrollToExperience={() => {scrollToSection(experienceRef); setMenuOpen(false);}}
        scrollToProjects={() => {scrollToSection(projectsRef); setMenuOpen(false);}}
      />
      
      {/* Single page layout with all sections with refs */}
      <div ref={homeRef}>
        <Home />
      </div>
      <div ref={skillsRef}>
        <Skills />
      </div>
      <div ref={experienceRef}>
        <Experience />
      </div>
      <div ref={projectsRef}>
        <Projects />
      </div>
    </div>
  ); 
}

export default App