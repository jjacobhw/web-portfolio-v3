import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'
import { MobileNav } from './components/MobileNav'
import { Home } from './components/Home'
import { useState } from 'react';
import './index.css'

function App() {
  const [isLoaded, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoading(true)}/>}
      <div className={`min-h-screen transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } bg-black text-gray-100`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <Home id="Home" className="h-screen flex items-center justify-center text-4xl font-Rubik" />
      </div>
    </>
  ); 
}

export default App