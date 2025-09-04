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
          ? 'text-3xl sm:text-4xl md:text-5xl mb-6' 
          : 'text-4xl xl:text-5xl mb-6'
      }`}>
        <span className="text-white">
          {displayedText.slice(0, 8)} {/* "Hi, I'm " */}
        </span>
        {displayedText.length > 8 && (
          <span className="text-[#1DB954]">
            {displayedText.slice(8)} {/* "Jacob Wei" */}
          </span>
        )}
        {isTypingComplete && (
          <span className="animate-wave text-white">{emoji}</span>
        )}
        {!isTypingComplete && displayedText.length > 0 && (
          <span className="animate-pulse text-white">|</span>
        )}
      </h1>
      
      {/* Job title */}
      <h2 className={`text-[#1DB954] ${
        isMobileLayout 
          ? 'text-base sm:text-lg md:text-xl mb-3' 
          : 'text-lg xl:text-xl mb-6'
      } transition-all duration-700 delay-300
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        AI/ML Engineer and Full Stack Developer
      </h2>
      
      {/* Description */}
      <h3 className={`text-white ${
        isMobileLayout 
          ? 'text-xs sm:text-base mb-3' 
          : 'text-base md:text-lg mb-4'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        I'm a Computer Science undergraduate exploring RAG, NLP, LLM fine-tuning, and deep learning.
        With a foundation in software engineering and web development, I enjoy building intelligent,
        practical systems that address real-world challenges.
      </h3>
      
      {/* Outro */}
      <h4 className={`text-white ${
        isMobileLayout 
          ? 'text-sm sm:text-base mb-3' 
          : 'text-base md:text-lg mb-4'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Feel free to contact me for any inquiries!
      </h4>

      {/* Location */}
      <h5 className={`text-white ${
        isMobileLayout 
          ? 'text-sm sm:text-base flex items-center justify-center gap-1 mb-6' 
          : 'text-base flex items-center gap-1 mb-6'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <MapPin className="w-4 h-4 text-[#1DB954]" />
        Irvine, California
      </h5>
      
      {/* Buttons */}
      <div className={`flex ${isMobileLayout ? 'flex-wrap justify-center gap-3 sm:gap-4' : 'flex-wrap gap-4'}
                      transition-all duration-700 delay-700
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <a
          href="media\Jacob's Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-black/70 backdrop-blur-sm border border-[#1DB954]/30
                    shadow-[0_0_20px_rgba(29,185,84,0.5),inset_0_0_20px_rgba(29,185,84,0.1)] 
                    hover:shadow-[0_0_40px_rgba(29,185,84,0.8),0_0_60px_rgba(29,185,84,0.4),inset_0_0_30px_rgba(29,185,84,0.2)]
                    text-white hover:text-[#1DB954]
                    ${isMobileLayout ? 'px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base' : 'px-4 py-2'}
                    rounded-md transition-all duration-500
                    flex items-center gap-2 group
                    transform hover:scale-105`}
        >
          <FileText className={`${isMobileLayout ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} 
                              group-hover:animate-bounce transition-transform duration-300 text-[#1DB954]`} />
          Resume
        </a>
        <a
          href="https://github.com/jjacobhw"
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-black/70 backdrop-blur-sm border border-[#1DB954]/30
                    shadow-[0_0_20px_rgba(29,185,84,0.5),inset_0_0_20px_rgba(29,185,84,0.1)] 
                    hover:shadow-[0_0_40px_rgba(29,185,84,0.8),0_0_60px_rgba(29,185,84,0.4),inset_0_0_30px_rgba(29,185,84,0.2)]
                    text-white hover:text-[#1DB954]
                    ${isMobileLayout ? 'px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base' : 'px-4 py-2'}
                    rounded-md transition-all duration-500
                    flex items-center gap-2 group
                    transform hover:scale-105`}
        >
          <Github className={`${isMobileLayout ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} 
                              group-hover:animate-bounce transition-transform duration-300 text-[#1DB954]`} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/jacob-wei/"
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-black/70 backdrop-blur-sm border border-[#1DB954]/30
                    shadow-[0_0_20px_rgba(29,185,84,0.5),inset_0_0_20px_rgba(29,185,84,0.1)] 
                    hover:shadow-[0_0_40px_rgba(29,185,84,0.8),0_0_60px_rgba(29,185,84,0.4),inset_0_0_30px_rgba(29,185,84,0.2)]
                    text-white hover:text-[#1DB954]
                    ${isMobileLayout ? 'px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base' : 'px-4 py-2'}
                    rounded-md transition-all duration-500
                    flex items-center gap-2 group
                    transform hover:scale-105`}
        >
          <Linkedin className={`${isMobileLayout ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} 
                              group-hover:animate-bounce transition-transform duration-300 text-[#1DB954]`} />
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
          shadow-[0_0_15px_rgba(29,185,84,0.4)] 
          hover:shadow-[0_0_30px_rgba(29,185,84,0.8),0_0_45px_rgba(29,185,84,0.4)]
          transform transition-all duration-500 
          group-hover:scale-105`}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t 
                      from-black/10 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );

  return (
    <section
      id="home" // Changed from "Home" to "home" to match navigation
      className={`min-h-screen flex items-start justify-center relative pt-24
                bg-black text-white 
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