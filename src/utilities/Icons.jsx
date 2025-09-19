export const SkillIcon = ({ tech, className = "w-10 h-10 md:w-12 md:h-12" }) => {
  const getDeviconClass = (technology) => {
    switch(technology) {
      // Programming Languages
      case "Python":
        return "devicon-python-plain";
      case "C++":
        return "devicon-cplusplus-plain";
      case "C":
        return "devicon-c-plain";
      case "JavaScript":
        return "devicon-javascript-plain";
      case "TypeScript":
        return "devicon-typescript-plain";
      case "SQL":
        return "devicon-azuresqldatabase-plain";
      case "HTML":
        return "devicon-html5-plain";
      case "CSS":
        return "devicon-css3-plain";
      
      // Web Development
      case "React":
        return "devicon-react-original";
      case "Next.js":
        return "devicon-nextjs-plain";
      case "Node.js":
        return "devicon-nodejs-plain-wordmark";
      case "Tailwind CSS":
        return "devicon-tailwindcss-plain";
      case "FastAPI":
        return "devicon-fastapi-plain";
      case "Figma":
        return "devicon-figma-plain";
      
      // AI & Machine Learning
      case "PyTorch":
        return "devicon-pytorch-original";
      case "TensorFlow":
        return "devicon-tensorflow-original"
      case "NumPy":
        return "devicon-numpy-plain";
      case "Pandas":
        return "devicon-pandas-plain";
      case "Streamlit":
        return "devicon-streamlit-plain";
      case "Scikit-learn":
        return "devicon-scikitlearn-plain";
      
      // Platforms & Tools
      case "Windows":
        return "devicon-windows11-original";
      case "Linux":
        return "devicon-linux-plain";
      case "MacOS":
        return "devicon-apple-original";
      case "Ubuntu":
        return "devicon-ubuntu-plain";
      case "Bash":
        return "devicon-bash-plain";
      case "Git":
        return "devicon-git-plain";
      case "VS Code":
        return "devicon-vscode-plain";
      case "Unix":
        return "devicon-unix-original";
      case "Vim":
        return "devicon-vim-plain";
      case "GitHub":
        return "devicon-github-original";
      case "Zsh":
        return "devicon-zsh-plain";

      // Cloud & DevOps
      case "Docker":
        return "devicon-docker-plain";
      case "Firebase":
        return "devicon-firebase-plain";
      case "Supabase":
        return "devicon-supabase-plain";
      
      default:
        return "devicon-devicon-plain";
    }
  };

  const deviconClass = getDeviconClass(tech);
  return (
    <i className={`${deviconClass} text-4xl md:text-5xl skill-icon`} />
  );
};

export const DevIconStyles = () => (
  <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/devicon.min.css" />
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