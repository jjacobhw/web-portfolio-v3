import { useState, useEffect, useRef } from 'react';
import { CodeXml, Globe, BrainCircuit, Terminal, ChevronDown, ChevronUp, Menu , Cloudy} from 'lucide-react';
import { SkillIcon, DevIconStyles } from './Icons';

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const hasAnimated = useRef(false); // Track if animations have run

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "HTML"],
      icon: CodeXml,
      id: "programming"
    },
    {
      title: "Web Development", 
      skills: ["React", "Next.js", "Node.js", "Tailwind CSS"],
      icon: Globe,
      id: "web"
    },
    {
      title: "AI & Machine Learning",
      skills: ["PyTorch", "NumPy", "Pandas", "ChromaDB", "HuggingFace", "LangChain"],
      icon: BrainCircuit,
      id: "ai"
    },
    {
      title: "Platforms & Tools",
      skills: ["Windows", "Linux", "GitHub", "Ubuntu", "Bash", "Git"],
      icon: Terminal,
      id: "platforms"
    },
    {
      title: "Cloud & DevOps",
      skills: ["Coming Soon..."],
      icon: Cloudy,
      id: "cloud"
    }
  ];

  // Derived state - calculate based on actual expanded categories
  const allExpanded = skillCategories.every(cat => expandedCategories[cat.id]);
  const noneExpanded = skillCategories.every(cat => !expandedCategories[cat.id]);

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

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleAllSkills = () => {
    if (allExpanded) {
      // All are expanded, so collapse all
      setExpandedCategories({});
    } else {
      // Some or none expanded, so expand all
      const allExpandedState = {};
      skillCategories.forEach(cat => {
        allExpandedState[cat.id] = true;
      });
      setExpandedCategories(allExpandedState);
    }
  };

  // Get button text based on current state
  const getButtonText = () => {
    if (allExpanded) return 'Collapse All';
    if (noneExpanded) return 'Expand All';
    return 'Expand All'; // Default for mixed states - prioritize expanding
  };

  const SkillCategory = ({ category, index }) => {
    const isExpanded = expandedCategories[category.id];
    const Icon = category.icon;
    
    return (
      <div className={`group bg-black/90 backdrop-blur-sm 
                      rounded-xl border border-[#1DB954]/30
                      hover:bg-black
                      transition-all duration-500 delay-${(index + 2) * 200}
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      overflow-hidden h-full
                      transform-gpu shadow-md dark:shadow-none`}
      >
        <div 
          onClick={() => toggleCategory(category.id)}
          className="flex items-center justify-between p-4 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-[#1DB954] transition-transform duration-300" />
            <h3 className={`font-semibold text-white
                           ${isMobile ? 'text-xl' : 'text-2xl'} relative`}
            >
              {category.title}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#1DB954] to-green-400 transition-all duration-300 group-hover:w-full"></span>
            </h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#1DB954] transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white group-hover:text-[#1DB954] transition-colors duration-300" />
          )}
        </div>

        <div className={`transition-all duration-500 ease-in-out transform origin-top ${
          isExpanded 
            ? 'max-h-[1000px] opacity-100 scale-y-100'
            : 'max-h-0 opacity-0 scale-y-0'
        } overflow-hidden`}>
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-3">
              {category.skills.map((tech, skillIndex) => (
                <div
                  key={skillIndex}
                  style={{ animationDelay: `${skillIndex * 50}ms` }}
                  className={`group bg-black/70 backdrop-blur-sm border border-[#1DB954]/30
                           shadow-[0_0_4px_rgba(29,185,84,0.15),inset_0_0_4px_rgba(29,185,84,0.02)] 
                           hover:shadow-[0_0_4px_rgba(29,185,84,0.15),inset_0_0_4px_rgba(29,185,84,0.02)]
                           text-white
                           px-3 py-2 rounded-lg transition-all duration-500
                           flex flex-col items-center justify-center gap-2
                           transform hover:scale-105
                           cursor-pointer text-sm font-medium h-28`}
                >
                  <SkillIcon tech={tech} className="w-8 h-8 text-[#1DB954] transition-transform duration-300" />
                  <span className="text-center text-xs font-semibold mt-1">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-24 pb-16 bg-black">
      <DevIconStyles />
      
      <div className={`max-w-5xl mx-auto px-4 w-full flex flex-col`}>
        {/* Header with title on left and button on right */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 delay-300
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Skills Title - Left Side */}
          <h2 className={`font-bold text-[#1DB954]
                         ${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl xl:text-5xl'}`}>
            Skills
          </h2>
          
          {/* Expand/Collapse Button - Right Side */}
          <button
            onClick={toggleAllSkills}
            className="group bg-[#1DB954]/10 hover:bg-[#1DB954]/20 
                     border border-[#1DB954]/20 hover:border-[#1DB954]/40
                     text-white px-3 py-3 rounded-lg
                     flex items-center gap-2
                     hover:scale-105 transition-all duration-300
                     hover:shadow-[0_4px_12px_rgba(29,185,84,0.2)]
                     cursor-pointer backdrop-blur-sm
                     text-sm font-semibold"
          >
            <span className={`font-medium ${isMobile ? 'hidden sm:inline' : ''}`}>
              {getButtonText()}
            </span>
            <Menu className="w-5 h-5 text-[#1DB954] group-hover:animate-pulse" />
          </button>
        </div>

        {/* Skills grid - Fixed overflow issues */}
        <div className="flex-1 min-h-0">
          <div className="grid gap-6 grid-cols-1 pb-4 max-h-full">
            {skillCategories.map((category, index) => (
              <SkillCategory 
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>

          <div className={`text-center mt-8 transition-all duration-700 delay-1200
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className={`dark:text-gray-400 text-gray-600
                          ${isMobile ? 'text-sm' : 'text-base'}`}>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};