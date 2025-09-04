import { CodeXml, Globe, Brain, Terminal } from 'lucide-react';

export const deviconMapping = {
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
  "ChromaDB": "chromadb",
  "Hugging Face": "huggingface",
  "LangChain": "langchain",
  
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

export const skillCategories = [
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

// Check if a skill has a Devicon
export const hasDevicon = (tech) => {
  return deviconMapping[tech] && !["ChromaDB", "Hugging Face", "LangChain"].includes(tech);
};

// Get Devicon class for a skill
export const getDeviconClass = (tech) => {
  return deviconMapping[tech];
};