import { PencilRuler } from 'lucide-react';

export const deviconMapping = {
  // Programming Languages
  "Python": "python",
  "C++": "cplusplus",
  "C": "c",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "SQL": "azuresqldatabase",
  "HTML": "html5",
  "CSS": "css3",
  
  // Web Development
  "React": "react",
  "Next.js": "nextjs",
  "Node.js": "nodejs",
  "Tailwind CSS": "tailwindcss",
  "FastAPI": "fastapi",
  
  // AI & Machine Learning
  "PyTorch": "pytorch",
  "NumPy": "numpy",
  "Pandas": "pandas",
  "ChromaDB": null, // No Devicon available - will use PencilRuler
  "Hugging Face": null, // No Devicon available - will use PencilRuler
  "LangChain": null, // No Devicon available - will use PencilRuler
  
  // Platforms & Tools
  "Windows": "windows8",
  "Linux": "linux",
  "GitHub": "github",
  "Ubuntu": "ubuntu",
  "Bash": "bash",
  "Git": "git",
  "Vim": "vim",

  // Cloud & DevOps
  "Docker": "docker"
};

export const hasValidDevicon = (tech) => {
  const deviconClass = deviconMapping[tech];
  return deviconClass !== null && deviconClass !== undefined;
};

export const getSkillIcon = (tech) => {
  const deviconClass = deviconMapping[tech];
  
  if (deviconClass) {
    return { type: 'devicon', class: deviconClass };
  } else {
    return { type: 'lucide', component: PencilRuler };
  }
};

export const SkillIcon = ({ tech, className = "w-10 h-10 md:w-12 md:h-12" }) => {
  const skillIcon = getSkillIcon(tech);
  
  if (skillIcon.type === 'devicon') {
    return (
      <i 
        className={`devicon-${skillIcon.class}-plain text-4xl md:text-5xl skill-icon`}
      />
    );
  } else {
    const LucideIcon = skillIcon.component;
    return <LucideIcon className={`${className} text-[#1DB954]`} />;
  }
};

export const DevIconStyles = () => (
  <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
    <style jsx>{`
      .skill-icon {
        color: #1DB954 !important;
      }
      /* Add animation for fade-in-up */
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.5s ease-out forwards;
      }
    `}</style>
  </>
);