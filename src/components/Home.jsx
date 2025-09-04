import { FileText, Github, Linkedin, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fullText = "Hi, I'm Jacob Wei";
  const emoji = " 👋";
  
  useEffect(() => {
    setIsVisible(true);
    const startDelay = setTimeout(() => {
      setDisplayedText('');
      setIsTypingComplete(false);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);
        }
      }, 150);

      return () => clearInterval(typingInterval);
    }, 300);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-start relative 
                 dark:bg-black dark:text-gray-100 bg-white text-gray-900 
                 transition-all duration-700 ease-out
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-3xl h-full">
        <div className="flex items-center justify-between h-full">
          <div className="text-left space-y-6 flex-1 pr-8">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-4xl font-semibold">
                <span className="text-white dark:text-white">
                  {displayedText.slice(0, 8)} {/* "Hi, I'm " */}
                </span>
                {displayedText.length > 8 && (
                  <span className="text-[#1DB954]">
                    {displayedText.slice(8)} {/* "Jacob Wei" */}
                  </span>
                )}
                {isTypingComplete && (
                  <span className="text-white dark:text-white">{emoji}</span>
                )}
                {!isTypingComplete && displayedText.length > 0 && (
                  <span className="animate-pulse text-white dark:text-white">|</span>
                )}
              </h1>
              <h2 className={`dark:text-gray-300 text-gray-600 text-md md:text-md
                           transition-all duration-700 delay-300
                           ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                AI/ML Engineer, Software/Full Stack Developer
              </h2>
              <h3 className={`dark:text-gray-300 text-gray-600 text-base flex items-center gap-1
                           transition-all duration-700 delay-500
                           ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <MapPin className="w-4 h-4" />
                Irvine, California
              </h3>
            </div>
            
            <div className={`flex flex-wrap gap-4 pt-2
                          transition-all duration-700 delay-700
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a
                href="media\Jacob's Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border dark:border-gray-600 border-gray-300 
                          dark:hover:border-gray-400 hover:border-gray-500
                          text-[#1DB954] dark:hover:bg-gray-800 hover:bg-gray-100
                          px-4 py-2 rounded-md transition-all duration-500
                          flex items-center gap-2 group
                          hover:animate-pulse
                          transform hover:rotateY-180 hover:scale-105
                          perspective-1000 preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotateY(180deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
                }}
              >
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Resume
              </a>
              <a
                href="https://github.com/jjacobhw"
                target="_blank"
                rel="noopener noreferrer"
                className="border dark:border-gray-600 border-gray-300 
                          dark:hover:border-gray-400 hover:border-gray-500
                          text-[#1DB954] dark:hover:bg-gray-800 hover:bg-gray-100
                          px-4 py-2 rounded-md transition-all duration-500
                          flex items-center gap-2 group
                          hover:animate-pulse
                          transform hover:rotateY-180 hover:scale-105
                          perspective-1000 preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotateY(180deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
                }}
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/jacob-wei"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 
                          hover:border-gray-500 dark:hover:border-gray-400
                          text-[#1DB954] hover:bg-gray-100 dark:hover:bg-gray-800
                          px-4 py-2 rounded-md transition-all duration-500
                          flex items-center gap-2 group
                          hover:animate-pulse
                          transform hover:rotateY-180 hover:scale-105
                          perspective-1000 preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotateY(180deg) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
                }}
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Profile Picture - Right Side */}
          <div className={`flex-shrink-0 hidden md:block
                          transition-all duration-700 delay-900
                          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative group">
              <img
                src="/media/profile-photo.jpg" // Replace with your actual image path
                alt="Jacob Wei"
                className="relative w-45 h-45 md:w-50 md:h-50 lg:w-55 lg:h-55
                          rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700
                          transform transition-all duration-500 
                          group-hover:scale-105
                          shadow-lg"
              />
              {/* Optional: Add a subtle overlay effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t 
                            from-black/10 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
        
        {/* Mobile Profile Picture - Below text on smaller screens */}
        <div className={`md:hidden mt-8 flex justify-center
                        transition-all duration-700 delay-900
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative group">
            <img
              src="/path/to/your/profile-picture.jpg" // Replace with your actual image path
              alt="Jacob Wei"
              className="relative w-48 h-48 rounded-lg object-cover 
                        border-2 border-gray-200 dark:border-gray-700 transform transition-all duration-500 
                        group-hover:scale-105 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};