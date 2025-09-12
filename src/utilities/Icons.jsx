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
  "Streamlit": "streamlit",
  "Scikit-learn": "scikitlearn",
  
  // Platforms & Tools
  "Windows": "windows8",
  "Linux": "linux",
  "GitHub": "github",
  "Ubuntu": "ubuntu",
  "Bash": "bash",
  "Git": "git",

  // Cloud & DevOps
  "Docker": "docker", 
  "Firebase": "firebase", 
  "Supabase": "supabase"
};

export const getSkillIcon = (tech) => {
  const deviconClass = deviconMapping[tech];
  return { type: 'devicon', class: deviconClass };
};

export const SkillIcon = ({ tech, className = "w-10 h-10 md:w-12 md:h-12" }) => {
  const skillIcon = getSkillIcon(tech);
    return (
      <i 
        className={`devicon-${skillIcon.class}-plain text-4xl md:text-5xl skill-icon`}
      />
    );
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