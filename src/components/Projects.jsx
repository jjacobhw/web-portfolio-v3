const projects = [
  {
    id: 1,
    title: "Student Recruiter Chatbot",
    description: "",
    image: "",
    tags: [],
    github: "",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "",
    image: "",
    tags: [],
    github: "",
  },
  {
    id: 3,
    title: "Customer Database",
    description: "",
    image: "",
    tags: [],
    github: "",
  }
]

export const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {""}
          <span className="text-primary">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project,key) => (
            <div key={key} 
            className="group bc-card rounded-lg overflow-hidden shadow-xs card-hover"
          >
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};