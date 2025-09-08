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
        setIsMobile(window.innerWidth < 1024);
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
      }, 50);

      return () => clearInterval(typingInterval);
    }, 300);

    return () => clearTimeout(startDelay);
  }, []);

  const ActionButton = ({ href, icon: Icon, children, isMobileLayout = false }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-black/70 backdrop-blur-sm border border-[#1DB954]/30
                text-white hover:text-[#1DB954]
                ${isMobileLayout ? 'px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base' : 'px-5 py-3'}
                rounded-lg transition-all duration-500
                flex items-center gap-2 group
                transform hover:scale-105 whitespace-nowrap`}
    >
      <Icon className={`${isMobileLayout ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} 
                        animate-bounce transition-transform duration-300 text-[#1DB954]`} />
      {children}
    </a>
  );

  const TextContent = ({ isMobileLayout = false }) => (
    <div className={isMobileLayout ? 'w-full max-w-lg' : 'w-full min-w-0 flex-1'}>
      <div className={`relative ${isMobileLayout ? 'h-16 sm:h-20 mb-6' : 'h-20 xl:h-24 mb-8'}`}>
        <h1 className={`font-bold absolute w-full whitespace-nowrap ${
          isMobileLayout 
            ? 'text-4xl sm:text-5xl md:text-6xl'
            : 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'
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
        </h1>
      </div>
      
      <h2 className={`text-[#1DB954] font-medium whitespace-nowrap ${
        isMobileLayout 
          ? 'text-xl sm:text-2xl mb-7'
          : 'text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-8'
      } transition-all duration-700 delay-300
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        AI/ML Engineer & Full Stack Developer
      </h2>
      
      <h3 className={`text-white/90 whitespace-nowrap ${
        isMobileLayout 
          ? 'text-lg sm:text-xl flex items-center justify-center gap-1.5 mb-7'
          : 'text-base lg:text-lg xl:text-xl flex items-center gap-1.5 mb-8'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <MapPin className="w-5 h-5 text-[#1DB954] flex-shrink-0" />
        Irvine, California
      </h3>

      <h4 className={`text-white/90 leading-relaxed ${
        isMobileLayout 
          ? 'text-base sm:text-lg mb-7'
          : 'text-sm lg:text-base xl:text-lg mb-8 max-w-2xl'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        I’m a Computer Science undergraduate specializing in machine learning, AI engineering, 
        and full-stack development. With experience in fine-tuning LLMs, building RAG pipelines, and deploying 
        automation solutions, I focus on creating practical, scalable solutions that deliver real-world impact.
      </h4>
      
      <h5 className={`text-white/90 ${
        isMobileLayout 
          ? 'text-base sm:text-lg mb-7'
          : 'text-sm lg:text-base xl:text-lg mb-8 max-w-2xl'
      } transition-all duration-700 delay-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Feel free to contact me for any inquiries!
      </h5>
      
      <div className={`flex ${isMobileLayout ? 'flex-wrap justify-center gap-4 sm:gap-5' : 'flex-wrap gap-3 lg:gap-4 xl:gap-5'}
                      transition-all duration-700 delay-700
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <ActionButton 
          href="/media/Jacob's Resume.pdf" 
          icon={FileText} 
          isMobileLayout={isMobileLayout}
        >
          Resume
        </ActionButton>
        
        <ActionButton 
          href="https://github.com/jjacobhw" 
          icon={Github} 
          isMobileLayout={isMobileLayout}
        >
          GitHub
        </ActionButton>
        
        <ActionButton 
          href="https://www.linkedin.com/in/jacob-wei/" 
          icon={Linkedin} 
          isMobileLayout={isMobileLayout}
        >
          LinkedIn
        </ActionButton>
      </div>
    </div>
  );

  const ProfilePicture = ({ isMobileLayout = false }) => (
    <div className={`${isMobileLayout ? '' : 'flex-shrink-0'} 
                    transition-all duration-700 ${isMobileLayout ? 'delay-300' : 'delay-900'}
                    ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${isMobileLayout ? 'translate-y-8' : 'translate-x-8'}`}`}>
      <div className="relative">
        <img
          src="/media/profile-photo.jpg"
          alt="Jacob Wei"
          className={`${
            isMobileLayout 
              ? 'w-52 h-64 sm:w-60 sm:h-72 md:w-72 md:h-80 mx-auto'
              : 'w-56 h-64 lg:w-64 lg:h-80 xl:w-72 xl:h-80 2xl:w-80 2xl:h-96' 
          } rounded-xl object-cover object-top  
          shadow-[0_0_15px_rgba(29,185,84,0.4)]`}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black text-white py-8 pt-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className={`${isMobile ? 'hidden' : 'flex'} items-center justify-between gap-8 lg:gap-10 xl:gap-12 min-w-0`}>
          <div className="flex-1 min-w-0">
            <TextContent />
          </div>
          <ProfilePicture />
        </div>
        <div className={`${isMobile ? 'flex' : 'hidden'} flex-col items-center text-center gap-10 py-8`}>
          <ProfilePicture isMobileLayout={true} />
          <TextContent isMobileLayout={true} />
        </div>
      </div>
    </div>
  );
};