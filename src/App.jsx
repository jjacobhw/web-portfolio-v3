import { Navbar } from './components/Navbar'
import { MobileNav } from './components/MobileNav'
import { Home } from './components/Home'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { useState } from 'react';
import './index.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      
      {/* Single page layout with all sections */}
      <Home />
      <Skills />
      <Experience />
      <Projects />
    </div>
  ); 
}

export default App