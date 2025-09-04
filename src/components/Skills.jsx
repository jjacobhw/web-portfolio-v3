import { useState, useEffect } from 'react';
import { Code, Globe, Brain, Terminal, ChevronDown, ChevronUp, Menu } from 'lucide-react';

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "HTML"],
      icon: Code,
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
      skills: ["Windows", "Linux", "Bash", "Git", "Visual Studio", "PowerShell", "VIM", "Ubuntu"],
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
                      transform-gpu`} // Added transform-gpu for better performance
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
            ? 'max-h-[200px] opacity-100' // Fixed max height instead of auto
            : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200/10 dark:border-gray-700/20">
              {category.skills.map((tech, skillIndex) => (
                <span 
                  key={skillIndex}
                  style={{ animationDelay: `${skillIndex * 50}ms` }}
                  className={`bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 
                           px-4 py-2 rounded-full text-sm font-medium
                           hover:bg-[#1DB954]/10 hover:text-[#1DB954] dark:hover:bg-[#1DB954]/20
                           hover:shadow-[0_2px_8px_rgba(29,185,84,0.2)]
                           hover:scale-105 transition-all duration-300
                           cursor-pointer border border-transparent 
                           hover:border-[#1DB954]/20
                           ${isExpanded ? 'animate-fade-in-up' : ''}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="Skills" 
      className={`min-h-screen flex items-center justify-center 
                 dark:bg-black dark:text-[#1DB954] bg-white text-gray-900
                 ${isMobile ? 'py-20 px-6' : 'py-24 px-8'}
                 transition-all duration-700 ease-out
                 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`max-w-4xl mx-auto w-full ${isMobile ? 'px-4' : 'px-8'}`}>
        {/* Header - Fixed position in layout */}
        <div className={`text-center mb-16 transition-all duration-700 delay-300
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className={`font-bold dark:text-white text-gray-900 mb-8
                         ${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl xl:text-5xl'}`}>
            Skills
          </h2>
          
          {/* Fixed Toggle Button */}
          <div className="sticky top-4 z-10 mb-10"> {/* Made sticky to keep it visible */}
            <button
              onClick={toggleAllSkills}
              className="group bg-[#1DB954]/10 hover:bg-[#1DB954]/20 
                       border border-[#1DB954]/20 hover:border-[#1DB954]/40
                       text-[#1DB954] px-6 py-3 rounded-lg
                       flex items-center gap-3 mx-auto
                       hover:scale-105 transition-all duration-300
                       hover:shadow-[0_4px_12px_rgba(29,185,84,0.2)]
                       cursor-pointer backdrop-blur-sm bg-white/90 dark:bg-black/90"
            >
              <Menu className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-medium">
                {showAllSkills ? 'Hide All' : 'Show All'}
              </span>
              {showAllSkills ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Skills Categories - Using CSS Grid for stable layout */}
        <div className="grid gap-6 grid-cols-1">
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
      `}</style>
    </section>
  );
};