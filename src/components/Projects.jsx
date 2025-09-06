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
    github: "https://github.com/yourusername/portfolio-website", // Add your actual GitHub URL
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
        setIsMobile(window.innerWidth < 1024);
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
                   ${isCenter 
                     ? 'w-80 lg:w-96 opacity-100 scale-100 z-20' 
                     : 'w-64 lg:w-80 opacity-70 scale-90 z-10'
                   }
                   transform hover:scale-[1.02]`}
        onClick={onClick}
      >
        {/* Project Card */}
        <div className={`bg-black/90 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-300
                        ${isCenter 
                          ? 'border-[#1DB954]/60 shadow-2xl shadow-[#1DB954]/25 h-[480px]' 
                          : 'border-[#1DB954]/20 hover:border-[#1DB954]/40 h-[440px]'
                        }`}>
          
          {/* Project Image */}
          <div className={`relative overflow-hidden ${isCenter ? 'h-52' : 'h-48'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/1a1a1a/666666?text=Project+Image';
              }}
            />
            {/* Project number indicator */}
            <div className={`absolute top-4 right-4 z-20 rounded-full flex items-center justify-center text-white font-bold
                           ${isCenter 
                             ? 'w-10 h-10 bg-[#1DB954] text-base shadow-lg' 
                             : 'w-8 h-8 bg-[#1DB954]/80 text-sm'
                           }`}>
              {project.displayIndex + 1}
            </div>
            {/* Center project glow effect */}
            {isCenter && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/10 via-transparent to-transparent"></div>
            )}
          </div>

          {/* Project Content */}
          <div className={`p-6 ${isCenter ? 'pb-8' : 'pb-6'}`}>
            {/* Project Title */}
            <h3 className={`font-bold text-white mb-3 relative group transition-all duration-300
                           ${isCenter ? 'text-xl mb-4' : 'text-lg mb-2'}`}>
              {project.title}
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#1DB954] to-green-400 transition-all duration-300
                              ${isCenter ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </h3>

            {/* Description - only show on center card with animation */}
            <div className={`overflow-hidden transition-all duration-500 ease-out
                           ${isCenter 
                             ? 'max-h-32 opacity-100 mb-4' 
                             : 'max-h-0 opacity-0 mb-0'
                           }`}>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, isCenter ? project.tags.length : 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300
                           ${isCenter 
                             ? 'bg-[#1DB954]/15 text-[#1DB954] border border-[#1DB954]/30 hover:bg-[#1DB954]/25' 
                             : 'bg-[#1DB954]/10 text-[#1DB954]/80 border border-[#1DB954]/20'
                           }`}
                >
                  {tag}
                </span>
              ))}
              {!isCenter && project.tags.length > 2 && (
                <span className="px-3 py-1 text-xs font-medium rounded-full 
                               bg-gray-800/60 text-gray-400 border border-gray-700/50">
                  +{project.tags.length - 2}
                </span>
              )}
            </div>

            {/* Buttons - only show on center card with slide animation */}
            <div className={`transition-all duration-500 ease-out overflow-hidden
                           ${isCenter 
                             ? 'max-h-20 opacity-100 translate-y-0' 
                             : 'max-h-0 opacity-0 translate-y-4'
                           }`}>
              <div className="flex space-x-3">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold 
                             text-white bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-lg 
                             hover:from-[#1ed760] hover:to-[#1DB954] transform hover:scale-105 
                             transition-all duration-300 shadow-lg hover:shadow-[#1DB954]/30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold 
                             text-[#1DB954] border-2 border-[#1DB954]/50 rounded-lg 
                             hover:bg-[#1DB954] hover:text-white hover:border-[#1DB954]
                             transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
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
    <div className="w-full h-full flex items-start justify-center pt-24 pb-16 bg-black">
      <div className={`max-w-7xl mx-auto px-4 w-full flex flex-col`}>
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 delay-300
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className={`font-bold text-[#1DB954] mb-4
                         ${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl xl:text-5xl'}`}>
            Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest work and projects • Infinite scroll enabled
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Navigation Button */}
          <button
            onClick={prevProject}
            className="absolute left-0 z-30 p-3 rounded-full
                     bg-[#1DB954]/90 hover:bg-[#1DB954] 
                     text-white shadow-lg hover:shadow-xl
                     transform hover:scale-110 transition-all duration-300
                     -translate-x-6 lg:-translate-x-12"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div 
            className="flex items-center justify-center gap-6 lg:gap-8 px-8 lg:px-16 w-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
              onClick={() => {}} // No action needed for center card
            />

            {/* Right Project */}
            <ProjectCard 
              project={rightProject} 
              position="right"
              onClick={nextProject}
            />
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={nextProject}
            className="absolute right-0 z-30 p-3 rounded-full
                     bg-[#1DB954]/90 hover:bg-[#1DB954] 
                     text-white shadow-lg hover:shadow-xl
                     transform hover:scale-110 transition-all duration-300
                     translate-x-6 lg:translate-x-12"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className={`flex justify-center mt-8 gap-3 transition-all duration-700 delay-600
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                         ${index === currentIndex 
                           ? 'bg-[#1DB954] scale-125 shadow-lg shadow-[#1DB954]/50' 
                           : 'bg-[#1DB954]/30 hover:bg-[#1DB954]/60 hover:scale-110'
                         }`}
            />
          ))}
        </div>

        {/* Helper Text */}
        <div className={`text-center mt-6 transition-all duration-700 delay-800
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className={`text-gray-500
                        ${isMobile ? 'text-sm' : 'text-base'}`}>
            {isMobile ? 'Swipe to navigate • Tap side cards to focus' : 'Navigate with buttons or dots • Click side cards to focus'}
          </p>
        </div>
      </div>
    </div>
  );
};