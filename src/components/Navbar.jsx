import { useEffect } from "react"

export const Navbar = ({menuOpen, setMenuOpen}) => {

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,0.65)]
        backdrop-blur-lg border-b border-white shadow-lg"> 
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#home" className="font-mono text-xl font-bold text-white"> {""}
                        Jacob<span className="text-blue-400"> Wei</span>{""}
                    </a> 
                    <div className="w-7 h-5 relative cursor-pointer x-40 md:hidden" 
                    onClick={() => setMenuOpen((prev)=>!prev)}>
                        &#9776;
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href = "home" className="text-white transition colors">
                            {""}Home{""}
                        </a>
                        <a href = "About" className="text-white transition colors">
                            {""}About{""}
                        </a>
                        <a href = "Education" className="text-white transition colors">
                            {""}Education{""}
                        </a>
                        <a href = "Projects" className="text-white transition colors">
                            {""}Projects{""}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};