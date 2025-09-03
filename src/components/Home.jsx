import { FileText, Github, Linkedin } from 'lucide-react';

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-start relative 
                 bg-black text-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-7 max-w-6xl h-full">
        <div className="flex items-center h-full">
          <div className="text-left">
            <h1 className="text-2xl md:text-4xl font-semibold mb-6">
              Hi, I'm <span className="text-[#1DB954]">Jacob Wei</span> 👋
            </h1>
            <h2 className="text-gray-300 mb-8">
              AI/ML Engineer, Software/Full Stack Developer
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="src\media\Jacob's Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 hover:border-gray-400 text-[#1DB954] 
                          hover:bg-gray-800 px-4 py-2 rounded-md transition-all duration-300
                          flex items-center gap-2 group"
              >
                <FileText className="w-5 h-5 group-hover:scale-120 transition-transform duration-300" />
                Resume
              </a>
              <a
                href="https://github.com/jjacobhw"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 hover:border-gray-400 text-[#1DB954] 
                          hover:bg-gray-800 px-4 py-2 rounded-md transition-all duration-300
                          flex items-center gap-2 group"
              >
                <Github className="w-5 h-5 group-hover:scale-120 transition-transform duration-300" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/jacob-wei"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 hover:border-gray-400 text-[#1DB954]
                          hover:bg-gray-800 px-4 py-2 rounded-md transition-all duration-300
                          flex items-center gap-2 group text-sm"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-120 transition-transform duration-300" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};