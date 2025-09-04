export const Skills = () => { 
    const programmingLanguages = ["Python", "C++", "C", "JavaScript", "TypeScript", "HTML", "CSS"];
    const webDev = ["React", "Next.js", "Node.js", "Tailwind CSS", "Vercel", "Vite"];
    const aiMachineLearning = ["PyTorch", "Hugging Face", "LangChain", "ChromaDB", "Ollama"];
    const platforms = ["Windows", "Linux", "Bash", "Git", "Visual Studio", "PowerShell", "VIM"];
    return (
        <section id="Skills" className="min-h-screen flex items-center justify-center py-20 px-20">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">{""}
                    Skills
                </h2>
                <div className="glass rounded-xl p-8 border-white/10 border hover:-translate-y-1 trasition-all">
                    <p className="text-white mb-6">
                        Hi, I'm Jacob Wei, a Computer Science B.S. student at the University of California, Santa Cruz,
                        with a passion for 
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-xl p6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
                            <div className="flex flex-wrap gap-2">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
