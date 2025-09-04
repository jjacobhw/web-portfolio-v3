import { useState, useEffect } from 'react';
import { CodeXml, Globe, Brain, Terminal, ChevronDown, ChevronUp, Menu } from 'lucide-react';

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  // Devicon mapping for each skill
  const deviconMapping = {
    // Programming Languages
    "Python": "python",
    "C++": "cplusplus",
    "C": "c",
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "HTML": "html5",
    
    // Web Development
    "React": "react",
    "Next.js": "nextjs",
    "Node.js": "nodejs",
    "Tailwind CSS": "tailwindcss",
    "Vercel": "vercel",
    "Vite": "vite",
    
    // AI & Machine Learning
    "PyTorch": "pytorch",
    "ChromaDB": "chromadb", // Note: ChromaDB may not have a Devicon
    "Hugging Face": "huggingface", // Note: Hugging Face may not have a Devicon
    "LangChain": "langchain", // Note: LangChain may not have a Devicon
    
    // Platforms & Tools
    "Windows": "windows",
    "Linux": "linux",
    "GitHub": "github",
    "Ubuntu": "ubuntu",
    "Visual Studio": "visualstudio",
    "PowerShell": "powershell",
    "Bash": "bash",
    "Git": "git",
    "VIM": "vim"
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "HTML"],
      icon: CodeXml,
      id: "programming"
    },
    {
      title: "Web Development", 
      skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "Vercel", "Vite"],
      icon: Globe,
      id: "web"
    },
    {
      title: "AI & Machine Learning",
      skills: ["PyTorch", "ChromaDB", "Hugging Face", "LangChain"],
      icon: Brain,
      id: "ai"
    },
    {
      title: "Platforms & Tools",
      skills: ["Windows", "Linux", "GitHub" , "Ubuntu", "Visual Studio", "PowerShell", "Bash", "Git",  "VIM"],
      icon: Terminal,
      id: "platforms"
    }
  ];

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
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleAllSkills = () => {
    setShowAllSkills(!showAllSkills);
    if (!showAllSkills) {
      // Expand all categories when showing all skills
      const allExpanded = {};
      skillCategories.forEach(cat => {
        allExpanded[cat.id] = true;
      });
      setExpandedCategories(allExpanded);
    } else {
      // Collapse all when hiding
      setExpandedCategories({});
    }
  };

  const SkillCategory = ({ category, index }) => {
    const isExpanded = expandedCategories[category.id] || showAllSkills;
    const Icon = category.icon;
    
    return (
      <div className={`group bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm 
                      rounded-xl border border-gray-200/20 dark:border-gray-700/30
                      hover:bg-white/10 dark:hover:bg-gray-800/50
                      transition-all duration-500 delay-${(index + 2) * 200}
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      overflow-hidden
                      transform-gpu`}
      >
        
        {/* Category Header - Always visible */}
        <div 
          onClick={() => toggleCategory(category.id)}
          className="flex items-center justify-between p-6 cursor-pointer
                   hover:-translate-y-0.5 transition-transform duration-300"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-[#1DB954] group-hover:animate-bounce transition-transform duration-300" />
            <h3 className={`font-semibold dark:text-white text-gray-900 
                           ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {category.title}
            </h3>
            <span className="bg-[#1DB954]/20 text-[#1DB954] px-2 py-1 rounded-full text-xs font-medium">
              {category.skills.length}
            </span>
          </div>
          
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#1DB954] transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#1DB954] transition-colors duration-300" />
          )}
        </div>

        {/* Skills List - Collapsible with fixed height approach */}
        <div className={`transition-all duration-500 ease-in-out ${
          isExpanded 
            ? 'max-h-[1000px] opacity-100' // Increased max height for larger icons
            : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-6 pb-6">
            {/* Grid with more columns for horizontal shrinking */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-200/10 dark:border-gray-700/20">
              {category.skills.map((tech, skillIndex) => {
                const deviconClass = deviconMapping[tech];
                const hasDevicon = deviconClass && !["ChromaDB", "Hugging Face", "LangChain"].includes(tech);
                
                return (
                  <div 
                    key={skillIndex}
                    style={{ animationDelay: `${skillIndex * 50}ms` }}
                    className={`bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 
                             p-3 rounded-xl text-sm font-medium
                             hover:bg-[#1DB954]/10 hover:text-[#1DB954] dark:hover:bg-[#1DB954]/20
                             hover:shadow-[0_4px_12px_rgba(29,185,84,0.3)]
                             hover:scale-105 transition-all duration-300
                             cursor-pointer border border-transparent 
                             hover:border-[#1DB954]/30
                             flex flex-col items-center justify-center gap-3
                             ${isExpanded ? 'animate-fade-in-up' : ''}
                             h-32`} // Increased height for larger icons
                  >
                    {hasDevicon ? (
                      <>
                        <i className={`devicon-${deviconClass}-plain colored text-4xl md:text-5xl`}></i>
                        <span className="text-center text-xs font-semibold mt-1">{tech}</span>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-[#1DB954]/20 rounded-full flex items-center justify-center">
                          <Terminal className="w-7 h-7 text-[#1DB954]" />
                        </div>
                        <span className="text-center text-xs font-semibold mt-1">{tech}</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="skills"
      className={`min-h-screen flex items-center justify-center 
                 dark:bg-black dark:text-[#1DB954] bg-white text-gray-900
                 ${isMobile ? 'py-20 px-6' : 'py-24 px-8'}
                 transition-all duration-700 ease-out
                 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Add Devicon CSS */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      
      <div className={`max-w-6xl mx-auto w-full ${isMobile ? 'px-4' : 'px-8'}`}>
        {/* Header - Fixed position in layout */}
        <div className={`text-center mb-16 transition-all duration-700 delay-300
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className={`font-bold dark:text-white text-gray-900 mb-8
                         ${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl xl:text-5xl'}`}>
            Skills & Technologies
          </h2>
          
          {/* Fixed Toggle Button */}
          <div className="sticky top-4 z-10 mb-10">
            <button
              onClick={toggleAllSkills}
              className="group bg-[#1DB954]/10 hover:bg-[#1DB954]/20 
                       border border-[#1DB954]/20 hover:border-[#1DB954]/40
                       text-[#1DB954] px-6 py-3 rounded-lg
                       flex items-center gap-3 mx-auto
                       hover:scale-105 transition-all duration-300
                       hover:shadow-[0_4px_12px_rgba(29,185,84,0.2)]
                       cursor-pointer backdrop-blur-sm bg-white/90 dark:bg-black/90
                       text-lg font-semibold"
            >
              <Menu className="w-6 h-6 group-hover:animate-pulse" />
              <span className="font-medium">
                {showAllSkills ? 'Collapse All' : 'Expand All'}
              </span>
              {showAllSkills ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Skills Categories - Using CSS Grid for stable layout */}
        <div className="grid gap-8 grid-cols-1">
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA - Fixed position */}
        <div className={`text-center mt-16 transition-all duration-700 delay-1200
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className={`dark:text-gray-400 text-gray-600
                        ${isMobile ? 'text-sm' : 'text-base'}`}>
            More skills tba :)
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        
        /* Ensure smooth transitions without layout shifts */
        .grid {
          contain: layout;
        }
        
        /* Adjust Devicon alignment */
        .devicon {
          display: inline-block;
          vertical-align: middle;
        }
        
        /* Custom styling for better icon visibility */
        .devicon-python-plain,
        .devicon-cplusplus-plain,
        .devicon-c-plain,
        .devicon-javascript-plain,
        .devicon-typescript-plain,
        .devicon-html5-plain,
        .devicon-react-plain,
        .devicon-nextjs-plain,
        .devicon-nodejs-plain,
        .devicon-tailwindcss-plain,
        .devicon-vercel-plain,
        .devicon-vite-plain,
        .devicon-pytorch-plain,
        .devicon-windows-plain,
        .devicon-linux-plain,
        .devicon-github-plain,
        .devicon-ubuntu-plain,
        .devicon-visualstudio-plain,
        .devicon-powershell-plain,
        .devicon-bash-plain,
        .devicon-git-plain,
        .devicon-vim-plain {
          font-size: 2.5rem !important;
          height: 2.5rem !important;
          width: 2.5rem !important;
        }
      `}</style>
    </section>
  );
};