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
  const hasAnimated = useRef(false); // Track if animations have run
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

  // Simple entrance animation - only runs once when component mounts
  useEffect(() => {
    if (!hasAnimated.current) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        hasAnimated.current = true;
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // If already animated, show immediately
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

  // Touch handlers for mobile swipe
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

  const ProjectCard = ({ project, index }) => {
    const isActive = index === currentIndex;
    
    return (
      <div 
        className={`group bg-black/90 backdrop-blur-sm 
                    rounded-xl border border-[#1DB954]/30
                    hover:bg-black
                    transition-all duration-500
                    ${isActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'}
                    overflow-hidden
                    transform-gpu shadow-md dark:shadow-none
                    ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: isActive ? 10 : 1
        }}
      >
        <div className="p-6">
          {/* Project Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-[#1DB954] rounded transition-transform duration-300" />
            <h3 className={`font-semibold text-white
                           ${isMobile ? 'text-xl' : 'text-2xl'} relative`}
            >
              {project.title}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#1DB954] to-green-400 transition-all duration-300 group-hover:w-full"></span>
            </h3>
          </div>

          {/* Project Image */}
          <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/1a1a1a/666666?text=Project+Image';
              }}
            />
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <div
                key={tagIndex}
                style={{ animationDelay: `${tagIndex * 50}ms` }}
                className={`group bg-black/70 backdrop-blur-sm border border-[#1DB954]/30
                         shadow-[0_0_4px_rgba(29,185,84,0.15),inset_0_0_4px_rgba(29,185,84,0.02)] 
                         hover:shadow-[0_0_4px_rgba(29,185,84,0.15),inset_0_0_4px_rgba(29,185,84,0.02)]
                         text-white
                         px-3 py-2 rounded-lg transition-all duration-500
                         flex items-center justify-center
                         transform hover:scale-105
                         cursor-pointer text-sm font-medium`}
              >
                <span className="text-center text-xs font-semibold">{tag}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-xl hover:from-[#1ed760] hover:to-[#1DB954] focus:ring-4 focus:ring-[#1DB954]/30 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#1DB954]/25"
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
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-[#1DB954] border-2 border-[#1DB954]/50 rounded-xl hover:bg-[#1DB954] hover:text-white hover:border-[#1DB954] focus:ring-4 focus:ring-[#1DB954]/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-24 pb-16 bg-black">
      <div className={`max-w-5xl mx-auto px-4 w-full flex flex-col`}>
        {/* Header with title on left and navigation on right */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 delay-300
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Projects Title - Left Side */}
          <h2 className={`font-bold text-[#1DB954]
                         ${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl xl:text-5xl'}`}>
            Projects
          </h2>
          
          {/* Navigation Controls - Right Side */}
          <div className="flex items-center gap-3">
            {/* Project Counter */}
            <div className="text-white text-sm font-medium px-3 py-2 bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg backdrop-blur-sm">
              {currentIndex + 1} / {projects.length}
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="group bg-[#1DB954]/10 hover:bg-[#1DB954]/20 
                       border border-[#1DB954]/20 hover:border-[#1DB954]/40
                       text-white p-3 rounded-lg
                       hover:scale-105 transition-all duration-300
                       hover:shadow-[0_4px_12px_rgba(29,185,84,0.2)]
                       cursor-pointer backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-[#1DB954] group-hover:animate-pulse" />
            </button>
            
            <button
              onClick={nextProject}
              className="group bg-[#1DB954]/10 hover:bg-[#1DB954]/20 
                       border border-[#1DB954]/20 hover:border-[#1DB954]/40
                       text-white p-3 rounded-lg
                       hover:scale-105 transition-all duration-300
                       hover:shadow-[0_4px_12px_rgba(29,185,84,0.2)]
                       cursor-pointer backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 text-[#1DB954] group-hover:animate-pulse" />
            </button>
          </div>
        </div>

        {/* Projects carousel */}
        <div className="flex-1 min-h-0">
          <div 
            className="relative h-full min-h-[600px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Dot indicators */}
          <div className={`flex justify-center mt-8 gap-2 transition-all duration-700 delay-1200
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                           ${index === currentIndex 
                             ? 'bg-[#1DB954] scale-125' 
                             : 'bg-[#1DB954]/30 hover:bg-[#1DB954]/50'
                           }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};