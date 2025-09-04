import { Navbar } from './components/Navbar'
import { MobileNav } from './components/MobileNav'
import { Home } from './components/Home'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience' // You'll need to create this
import { Projects } from './components/Projects' // You'll need to create this
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        
        <Routes>
          <Route path="/" element={
            <>
              <Home id="Home" className="h-screen flex items-center justify-center text-4xl font-Rubik" />
              <Skills id="Skills"/>
            </>
          } />
          <Route path="/skills" element={<Skills id="Skills"/>} />
          <Route path="/experience" element={<Experience id="Experience"/>} />
          <Route path="/projects" element={<Projects id="Projects"/>} />
        </Routes>
      </div>
    </Router>
  ); 
}

export default App