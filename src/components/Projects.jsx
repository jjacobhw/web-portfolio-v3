import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Student Recruiter",
    description: "A RAG chatbot powered by Ollama 3.2 designed to assist with student recruitment, providing automated responses and information about personal documents such as Resumes, transcripts, etc.",
    image: "", 
    tags: ["Python", "LangChain", "Ollama", "ChromaDB"],
    github: "https://github.com/jjacobhw/Student-Recruiter-Agent", 
    demo: "", 
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React, JavaScript, and styled with Tailwind CSS, initialized with Vite and deployed through Vercel.",
    image: "", 
    tags: ["React", "JavaScript", "Tailwind CSS", "Vercel", "Vite"],
    github: "https://github.com/jjacobhw/web-portfolio-v3", 
    demo: "", 
  },
  {
    id: 3,
    title: "Customer Database",
    description: "A UNIX-style database with custom hashing for effecient lookup, retrieval and deletion operations. Modified for lightweight distribution across Linux platforms.",
    image: "", 
    tags: ["C", "Hash Tables", "Linux", "Bash"],
    github: "https://github.com/jjacobhw/Customer-Database",
    demo: "", 
  },
  {
    id: 4,
    title: "Decaf",
    description: "Coming soon :)",
    image: "", 
    tags: ["Python", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Docker", "FastAPI", "Sup abase", "LangChain", "Ollama 3.2 8B"],
    github: "https://github.com/jjacobhw/Decaf",
    demo: "", 
  },
  {
    id: 5,
    title: "Palate",
    description: "In development...",
    image: "", 
    tags: ["MCP", "Python", "Docker", "Claude", "FastAPI", "Notion API", "Supabase"],
    github: "",
    demo: "", 
  },

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

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
  };

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
                    ? (isCenter ? 'w-full max-w-md opacity-100 scale-100 z-20' : 'hidden')
                    : (isCenter 
                      ? 'w-96 md:w-[32rem] lg:w-[32rem] opacity-100 scale-100 z-30 mx-[-30px]' // Increased width
                      : (isLeft 
                        ? 'w-64 md:w-72 lg:w-80 opacity-35 scale-80 z-20 mr-[-80px]' // Adjusted margin
                        : 'w-64 md:w-72 lg:w-80 opacity-35 scale-80 z-20 ml-[-80px]' // Adjusted margin
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
                          ? 'min-h-[520px] max-h-[620px]' 
                          : (isCenter ? 'h-[600px] md:h-[640px]' : 'h-[520px] md:h-[560px]') // Increased height for center card
                        }`}>
          
          <div className={`relative overflow-hidden flex-shrink-0
                          ${isMobile ? 'h-48' : (isCenter ? 'h-48 md:h-52' : 'h-40 md:h-44')}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/1a1a1a/666666?text=Project+Image';
              }}
            />
            {isCenter && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/15 via-transparent to-transparent"></div>
            )}
          </div>

          <div className={`flex flex-col flex-1 p-5 md:p-6 lg:p-7`}>
            <div className="flex-shrink-0 mb-4">
              <h3 className={`font-bold text-[#1DB954] relative group transition-all duration-300 leading-tight
                             ${isCenter ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                <span className="block line-clamp-3">
                  {project.title}
                </span>
              </h3>
            </div>

            <div className={`flex-shrink-0 transition-all duration-500 ease-out mb-5
                           ${(isCenter || isMobile) ? 'opacity-100' : 'opacity-0 max-h-0 mb-0'}`}>
              <p className={`text-white leading-relaxed 
                            ${isCenter ? 'text-base md:text-md' : 'text-sm md:text-base'}`}>
                {project.description}
              </p>
            </div>

            {(isCenter || isMobile) && (
              <div className="flex-1 min-h-0 mb-5">
                <div className="flex flex-wrap gap-2 md:gap-2.5 items-start">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`inline-block px-3 md:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap
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

            <div className={`flex-shrink-0 transition-all duration-500 ease-out
                           ${(isCenter || isMobile)
                             ? 'opacity-100 translate-y-0' 
                             : 'opacity-0 translate-y-4 max-h-0 overflow-hidden'
                           }`}>
              <div className="flex gap-3 md:gap-4">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base font-semibold 
                             text-white bg-[#1DB954]/10 border-2 border-[#1DB954]/30 rounded-lg 
                             hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                             transform hover:scale-105 transition-all duration-200 backdrop-blur-sm min-w-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 text-[#1DB954]" />
                    <span className="truncate">Source Code</span>
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base font-semibold 
                             text-white bg-[#1DB954]/10 border-2 border-[#1DB954]/30 rounded-lg 
                             hover:bg-[#1DB954]/20 hover:border-[#1DB954]/50
                             transform hover:scale-105 transition-all duration-300 backdrop-blur-sm min-w-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
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
                        ${isMobile ? 'text-5xl sm:text-5xl' : 'text-5xl md:text-5xl'}
                        text-left`}>
            Projects
          </h2>
        </div>

        <div className={`relative flex items-center justify-center ${isMobile ? 'px-0' : ''}`}>
          {!isMobile && (
            <>
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
              <ProjectCard 
                project={centerProject} 
                position="center"
                onClick={() => {}}
              />
            ) : (
              <>
                <ProjectCard 
                  project={leftProject} 
                  position="left"
                  onClick={prevProject}
                />
                <ProjectCard 
                  project={centerProject} 
                  position="center"
                  onClick={() => {}}
                />
                <ProjectCard 
                  project={rightProject} 
                  position="right"
                  onClick={nextProject}
                />
              </>
            )}
          </div>

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