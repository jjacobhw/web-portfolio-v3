import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Student Recruiter Chatbot",
    description: "An AI-powered chatbot designed to assist with student recruitment processes, providing automated responses and information to prospective students.",
    image: "", // Add your actual image path
    tags: ["Python", "LangChain", "Ollama", "ChromaDB"],
    github: "https://github.com/yourusername/student-recruiter-chatbot", // Add your actual GitHub URL
    demo: "", // Optional: add demo URL if available
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and styled with Tailwind CSS, showcasing projects and skills with smooth animations.",
    image: "", // Add your actual image path
    tags: ["React", "Tailwind CSS", "JavaScript", "Vercel", "Vite"],
    github: "https://github.com/jjacobhw/web-portfolio-v3", // Add your actual GitHub URL
    demo: "", // Optional: add live site URL
  },
  {
    id: 3,
    title: "Customer Database",
    description: "A comprehensive customer relationship management system with data visualization and analytics capabilities for business operations.",
    image: "", // Add your actual image path
    tags: ["C", "Hash Tables", "Linux"], // Add appropriate tags
    github: "https://github.com/yourusername/customer-database", // Add your actual GitHub URL
    demo: "", // Optional: add demo URL if available
  }
];

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasAnimated = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  useEffect(() => {
    if (!hasAnimated.current) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        hasAnimated.current = true;
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, []);

  // Infinite scroll functions
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
  };

  // Get project with circular indexing
  const getProject = (offset) => {
    const index = (currentIndex + offset + projects.length) % projects.length;
    return { ...projects[index], displayIndex: index };
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      nextProject();
    }
    if (touchEndX.current - touchStartX.current > 75) {
      prevProject();
    }
  };

  // Get the three visible projects (left, center, right)
  const leftProject = getProject(-1);
  const centerProject = getProject(0);
  const rightProject = getProject(1);

  const ProjectCard = ({ project, position, onClick }) => {
    const isCenter = position === 'center';
    const isLeft = position === 'left';
    const isRight = position === 'right';

    return (
      <div
        className={`flex-shrink-0 transition-all duration-500 ease-out cursor-pointer
                   ${isMobile 
                     ? (isCenter ? 'w-full max-w-sm opacity-100 scale-100 z-20' : 'hidden')
                     : (isCenter 
                       ? 'w-64 md:w-72 lg:w-80 opacity-100 scale-100 z-30 mx-[-20px]' 
                       : (isLeft 
                         ? 'w-52 md:w-60 lg:w-72 opacity-35 scale-80 z-20 mr-[-60px]' 
                         : 'w-52 md:w-60 lg:w-72 opacity-35 scale-80 z-20 ml-[-60px]'
                       )
                     )
                   }
                   transform ${isCenter ? 'hover:scale-[1.005]' : 'hover:scale-[1.005]'}`}
        onClick={onClick}
      >
        {/* Project Card */}
        <div className={`bg-black/90 backdrop-blur-sm rounded-xl md:rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col
                        ${isCenter 
                          ? 'border-[#1DB954]/60 shadow-2xl shadow-[#1DB954]/25' 
                          : 'border-[#1DB954] hover:border-[#1DB954]/40'
                        }
                        ${isMobile 
                          ? 'min-h-[480px] max-h-[580px]' 
                          : (isCenter ? 'h-[500px] md:h-[540px]' : 'h-[480px] md:h-[520px]')
                        }`}>
          
          {/* Project Image - Fixed height */}
          <div className={`relative overflow-hidden flex-shrink-0
                          ${isMobile ? 'h-40' : (isCenter ? 'h-40 md:h-44' : 'h-36 md:h-40')}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/1a1a1a/666666?text=Project+Image';
              }}
            />
            {/* Center project glow effect */}
            {isCenter && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/15 via-transparent to-transparent"></div>
            )}
          </div>

          {/* Project Content - Flexible height with proper spacing */}
          <div className={`flex flex-col flex-1 p-4 md:p-5 lg:p-6`}>
            {/* Title Section - Fixed space */}
            <div className="flex-shrink-0 mb-3">
              <h3 className={`font-bold text-[#1DB954] relative group transition-all duration-300 leading-tight
                             ${isCenter ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
                <span className="block line-clamp-3">
                  {project.title}
                </span>
              </h3>
            </div>

            {/* Description Section - Now always visible with proper spacing */}
            <div className={`flex-shrink-0 transition-all duration-500 ease-out mb-4
                           ${(isCenter || isMobile) ? 'opacity-100' : 'opacity-0 max-h-0 mb-0'}`}>
              <p className={`text-white leading-relaxed text-sm
                            ${isMobile ? '' : ''}`}>
                {project.description}
              </p>
            </div>

            {/* Tags Section - Only show for center project */}
            {(isCenter || isMobile) && (
              <div className="flex-1 min-h-0 mb-4">
                <div className="flex flex-wrap gap-1.5 md:gap-2 items-start">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`inline-block px-2.5 md:px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap
                               ${(isCenter || isMobile)
                                 ? 'bg-[#1DB954]/15 text-white border border-[#1DB954]/30 hover:bg-[#1DB954]/25' 
                                 : 'bg-[#1DB954]/10 text-white/80 border border-[#1DB954]/20'
                               }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons Section - Fixed at bottom */}
            <div className={`flex-shrink-0 transition-all duration-500 ease-out
                           ${(isCenter || isMobile)
                             ? 'opacity-100 translate-y-0' 
                             : 'opacity-0 translate-y-4 max-h-0 overflow-hidden'
                           }`}>
              <div className="flex gap-2 md:gap-3">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-semibold 
                             text-white bg-[#1DB954]/10 border-2 border-[#1DB954]/30 rounded-lg 
                             hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                             transform hover:scale-105 transition-all duration-200 backdrop-blur-sm min-w-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3 h-3 md:w-4 md:h-4 mr-1.5 flex-shrink-0 text-[#1DB954]" />
                    <span className="truncate">Source Code</span>
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-semibold 
                             text-white bg-[#1DB954]/10 border-2 border-[#1DB954]/30 rounded-lg 
                             hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                             transform hover:scale-105 transition-all duration-300 backdrop-blur-sm min-w-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1.5 flex-shrink-0" />
                    <span className="truncate">Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 bg-black overflow-hidden">
      <div className={`max-w-5xl mx-auto px-4 md:px-6 lg:px-8 w-full flex flex-col`}>
        {/* Header */}
        <div className={`mb-6 md:mb-8 transition-all duration-700 delay-300
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className={`font-bold text-white mb-3
                        ${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl md:text-4xl'}
                        text-left`}>
            Projects
          </h2>
        </div>

        {/* Carousel Container */}
        <div className={`relative flex items-center justify-center ${isMobile ? 'px-0' : ''}`}>
          {!isMobile && (
            <>
              {/* Left Navigation Button */}
              <button
                onClick={prevProject}
                className="absolute left-0 z-40 p-2 md:p-2.5 rounded-full
                        bg-[#1DB954]/10 border-2 border-[#1DB954]/30
                        text-[#1DB954] hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                        shadow-lg hover:shadow-xl backdrop-blur-sm
                        transform hover:scale-110 transition-all duration-300
                        -translate-x-2 md:-translate-x-2 lg:-translate-x-3
                        cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Right Navigation Button */}
              <button
                onClick={nextProject}
                className="absolute right-0 z-40 p-2 md:p-2.5 rounded-full
                        bg-[#1DB954]/10 border-2 border-[#1DB954]/30
                        text-[#1DB954] hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                        shadow-lg hover:shadow-xl backdrop-blur-sm
                        transform hover:scale-110 transition-all duration-300
                        translate-x-2 md:translate-x-2 lg:translate-x-3
                        cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div 
            className={`flex items-center justify-center w-full
                       ${isMobile 
                         ? 'px-4' 
                         : 'px-6 md:px-8 lg:px-10'
                       }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isMobile ? (
              // Mobile: Show only center project
              <ProjectCard 
                project={centerProject} 
                position="center"
                onClick={() => {}}
              />
            ) : (
              // Desktop: Show all three projects with overlapping
              <>
                {/* Left Project */}
                <ProjectCard 
                  project={leftProject} 
                  position="left"
                  onClick={prevProject}
                />

                {/* Center Project (Active) */}
                <ProjectCard 
                  project={centerProject} 
                  position="center"
                  onClick={() => {}}
                />

                {/* Right Project */}
                <ProjectCard 
                  project={rightProject} 
                  position="right"
                  onClick={nextProject}
                />
              </>
            )}
          </div>

          {/* Mobile Navigation Buttons - Positioned on sides */}
          {isMobile && (
            <div className="absolute inset-0 flex items-center justify-between w-full px-2 z-30">
              <button
                onClick={prevProject}
                className="p-2.5 rounded-full bg-[#1DB954]/10 border-2 border-[#1DB954]/30
                         text-[#1DB954] hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                         shadow-lg hover:shadow-xl backdrop-blur-sm
                         transform hover:scale-110 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                className="p-2.5 rounded-full bg-[#1DB954]/10 border-2 border-[#1DB954]/30
                         text-[#1DB954] hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                         shadow-lg hover:shadow-xl backdrop-blur-sm
                         transform hover:scale-110 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Dot Indicators - Moved closer to project card */}
        <div className={`flex justify-center mt-6 md:mt-6 gap-1.5 md:gap-2 transition-all duration-700 delay-600
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 
                         ${index === currentIndex 
                           ? 'bg-[#1DB954] scale-125 shadow-lg shadow-[#1DB954]/50' 
                           : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                         }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};