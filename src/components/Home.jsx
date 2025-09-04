import { FileText, Github, Linkedin, MapPin } from 'lucide-react';

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-start relative 
                 dark:bg-black dark:text-gray-100 bg-white text-gray-900 
                 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-7 max-w-6xl h-full">
        <div className="flex items-center h-full">
          <div className="text-left space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-4xl font-semibold">
                Hi, I'm <span className="text-[#1DB954]">Jacob Wei</span> 👋
              </h1>
              <h2 className="dark:text-gray-300 text-gray-600 text-lg md:text-xl">
                AI/ML Engineer, Software/Full Stack Developer
              </h2>
              <h3 className="dark:text-gray-300 text-gray-600 text-base flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Irvine, CA
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="src\media\Jacob's Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border dark:border-gray-600 border-gray-300 
                          dark:hover:border-gray-400 hover:border-gray-500
                          text-[#1DB954] dark:hover:bg-gray-800 hover:bg-gray-100
                          px-4 py-2 rounded-md transition-all duration-300
                          flex items-center gap-2 group"
              >
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Resume
              </a>
              <a
                href="https://github.com/jjacobhw"
                target="_blank"
                rel="noopener noreferrer"
                className="border dark:border-gray-600 border-gray-300 
                          dark:hover:border-gray-400 hover:border-gray-500
                          text-[#1DB954] dark:hover:bg-gray-800 hover:bg-gray-100
                          px-4 py-2 rounded-md transition-all duration-300
                          flex items-center gap-2 group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/jacob-wei"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 
                          hover:border-gray-500 dark:hover:border-gray-400
                          text-[#1DB954] hover:bg-gray-100 dark:hover:bg-gray-800
                          px-4 py-2 rounded-md transition-all duration-300
                          flex items-center gap-2 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};