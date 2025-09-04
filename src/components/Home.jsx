import { FileText, Github, Linkedin, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fullText = "Hi, I'm Jacob Wei";
  const emoji = " 👋";
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024); // 1024px is typically the lg breakpoint
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

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

  // Reusable text content component
  const TextContent = ({ isMobileLayout = false }) => (
    <div className={isMobileLayout ? 'w-full max-w-lg' : ''}>
      {/* Main heading */}
      <h1 className={`font-semibold ${
        isMobileLayout 
          ? 'text-2xl sm:text-3xl md:text-4xl mb-2' 
          : 'text-3xl xl:text-5xl mb-6'
      }`}>
        <span className="text-white dark:text-white">
          {displayedText.slice(0, 8)} {/* "Hi, I'm " */}
        </span>
        {displayedText.length > 8 && (
          <span className="text-[#1DB954]">
            {displayedText.slice(8)} {/* "Jacob Wei" */}
          </span>
        )}
        {isTypingComplete && (
          <span className="animate-wave text-white dark:text-white">{emoji}</span>
        )}
        {!isTypingComplete && displayedText.length > 0 && (
          <span className="animate-pulse text-white dark:text-white">|</span>
        )}
      </h1>
      
      {/* Job title */}
      <h2 className={`dark:text-[#1DB954] text-gray-600 ${
        isMobileLayout 
          ? 'text-base sm:text-lg md:text-xl mb-3' 
          : 'text-lg xl:text-xl mb-6'
      } transition-all duration-700 delay-300
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        AI/ML Engineer and Full Stack Developer
      </h2>
      
      {/* Description */}
      <h3 className={`dark:text-white text-gray-600 ${
        isMobileLayout 
          ? 'text-sm sm:text-base mb-3' 
          : 'text-base md:text-lg mb-4'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        A Computer Science undergraduate developing expertise in RAG, NLP, LLM fine-tuning, deep learning,
        software engineering and web development. I'm passionate about building intelligent and practical systems 
        to solve real-world problems. Outside of development, I enjoy golf, snowboarding, tennis, cooking and pc assembly.
        Feel free to contact me for any inquiries!
      </h3>
      
      {/* Location */}
      <h4 className={`dark:text-white text-gray-600 ${
        isMobileLayout 
          ? 'text-sm sm:text-base flex items-center justify-center gap-1 mb-6' 
          : 'text-base flex items-center gap-1 mb-6'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <MapPin className="w-4 h-4" />
        Irvine, California
      </h4>
      
      {/* Buttons */}
      <div className={`flex ${isMobileLayout ? 'flex-wrap justify-center gap-3 sm:gap-4' : 'flex-wrap gap-4'}
                      transition-all duration-700 delay-700
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <a
          href="media\Jacob's Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`border dark:border-gray-600 border-gray-300 
                    dark:hover:border-gray-400 hover:border-gray-500
                    text-[#1DB954] dark:hover:bg-gray-800 hover:bg-gray-100
                    ${isMobileLayout ? 'px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base' : 'px-4 py-2'}
                    rounded-md transition-all duration-500
                    flex items-center gap-2 group
                    hover:animate-pulse
                    transform hover:scale-105`}
        >
          <FileText className={`${isMobileLayout ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} 
                              group-hover:animate-bounce transition-transform duration-300`} />
          Resume
        </a>
        <a
          href="https://github.com/jjacobhw"
          target="_blank"
          rel="noopener noreferrer"
          className={`border dark:border-gray-600 border-gray-300 
                    dark:hover:border-gray-400 hover:border-gray-500
                    text-[#1DB954] dark:hover:bg-gray-800 hover:bg-gray-100
                    ${isMobileLayout ? 'px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base' : 'px-4 py-2'}
                    rounded-md transition-all duration-500
                    flex items-center gap-2 group
                    hover:animate-pulse
                    transform hover:scale-105`}
        >
          <Github className={`${isMobileLayout ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} 
                            group-hover:animate-bounce transition-transform duration-300`} />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/jacob-wei"
          target="_blank"
          rel="noopener noreferrer"
          className={`border border-gray-300 dark:border-gray-600 
                    hover:border-gray-500 dark:hover:border-gray-400
                    text-[#1DB954] hover:bg-gray-100 dark:hover:bg-gray-800
                    ${isMobileLayout ? 'px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base' : 'px-4 py-2'}
                    rounded-md transition-all duration-500
                    flex items-center gap-2 group
                    hover:animate-pulse
                    transform hover:scale-105`}
        >
          <Linkedin className={`${isMobileLayout ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} 
                              group-hover:animate-bounce transition-transform duration-300`} />
          LinkedIn
        </a>
      </div>
    </div>
  );

  // Reusable profile picture component
  const ProfilePicture = ({ isMobileLayout = false }) => (
    <div className={`${isMobileLayout ? '' : 'flex-shrink-0'} 
                    transition-all duration-700 ${isMobileLayout ? 'delay-300' : 'delay-900'}
                    ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${isMobileLayout ? 'translate-y-8' : 'translate-x-8'}`}`}>
      <div className="relative group">
        <img
          src="/media/profile-photo.jpg"
          alt="Jacob Wei"
          className={`${
            isMobileLayout 
              ? 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto' 
              : 'w-64 h-64 xl:w-72 xl:h-72'
          } rounded-lg object-cover 
          border-2 border-gray-200 dark:border-gray-700
          transform transition-all duration-500 
          group-hover:scale-105 shadow-lg`}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t 
                      from-black/10 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );

  return (
    <section
      id="Home"
      className={`min-h-screen flex items-start justify-center relative pt-16
                dark:bg-black dark:text-gray-100 bg-white text-gray-900 
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-8 max-w-4xl pt-16 md:pt-2">
        {/* Desktop Layout - side by side */}
        <div className={`${isMobile ? 'hidden' : 'flex'} items-center justify-between min-h-[60vh]`}>
          <div className="flex-1 pr-12">
            <TextContent />
          </div>
          <ProfilePicture />
        </div>
        
        {/* Mobile Layout - stacked vertically */}
        <div className={`${isMobile ? 'flex' : 'hidden'} flex-col items-center text-center space-y-8 py-12`}>
          <ProfilePicture isMobileLayout={true} />
          <TextContent isMobileLayout={true} />
        </div>
      </div>
    </section>
  );
};