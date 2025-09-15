import { GraduationCap, Briefcase, Calendar, MapPin, Award } from 'lucide-react';

export const Experience = () => {
  const education = [
    {
      degree: "Bachelor of Science, Computer Science",
      school: "University of California, Santa Cruz",
      location: "Santa Cruz, CA",
      period: "September 2023 - June 2027",
      gpa: "3.85/4.00",
      highlights: []
    }
  ];

  const workExperience = [
    {
      title: "Machine Learning Engineer",
      company: "Inference.ai",
      location: "Palo Alto, CA",
      period: "June 2025 - September 2025",
      description: "",
      achievements: [
        "Developed RAG pipelines for comprehensive data analysis, reducing response hallucinations",
        "Integrated LLMs with MCP, enhancing API usage across various platforms while reducing model complexity",
        "Fine-tuned pre-trained models to adapt to foreign behaviors, improving overall response time and accuracy"
      ],
      technologies: ["Python", "Supervised Fine-Tuning", "RAG Architecture", "Vector Databases", "MCPs", "LLMs", "OCR",]
    },
    {
      title: "Robotic Processing Automation Intern",
      company: "Healthcare Practice IT",
      location: "Orange County, CA",
      period: "June 2024 - September 2024", 
      description: "Leveraged RPA to transform repetitive, manual tasks into automated workflows, boosting team productivity and enabling the company to allocate resources towards higher priority tasks.",
      achievements: [
        "Developed an email address validator with a 93% accurate detection rate",
        "Worked with accountants to deploy tax calculators, eliminating dedicated days for filing taxes",
        "RPA pipelines saved 25-30 man-hours of labor every month"
      ],
      technologies: ["Python", "UiPath", "Visual Basic", "RPA", "Bash", "Regular Expressions"]
    },
  ];

  return (
    <section id="experience" className="min-h-screen bg-black text-white py-30">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-16 text-white text-left">
          Experience
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-[#1DB954]" />
              <h3 className="text-2xl font-semibold text-white">Education</h3>
            </div>
            {education.map((edu, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-4 top-16 w-px h-24 bg-[#1DB954]"></div>
                )}
                
                <div className="bg-black border border-[#1DB954]/30 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1DB954]/30 relative transform-gpu cursor-pointer">
                  <div className="absolute -left-2 top-6 w-4 h-4 bg-[#1DB954] rounded-full border-4 border-black"></div>
                  <h4 className="text-xl font-bold text-[#1DB954] mb-1">{edu.school}</h4>
                  <p className="text-lg font-semibold text-white mb-2">{edu.degree}</p>
                  <div className="flex flex-wrap items-center gap-4 text-white mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#1DB954]" />
                      <span>{edu.location}</span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-[#1DB954]" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-white mb-4">
                    <Calendar className="w-4 h-4 text-[#1DB954]" />
                    <span>{edu.period}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight, idx) => (
                      <span key={idx} className="bg-[#1DB954]/20 text-[#1DB954] px-3 py-1 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-[#1DB954]" />
              <h3 className="text-2xl font-semibold text-white">Professional</h3>
            </div>

            {workExperience.map((work, index) => (
              <div key={index} className="relative">
                {index < workExperience.length - 1 && (
                  <div className="absolute left-4 top-20 w-px h-32 bg-[#1DB954]"></div>
                )}
                
                <div className="bg-black border border-[#1DB954]/30 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1DB954]/30 relative transform-gpu cursor-pointer">
                  <div className="absolute -left-2 top-6 w-4 h-4 bg-[#1DB954] rounded-full border-4 border-black"></div>
                  <h4 className="text-xl font-bold text-[#1DB954] mb-1">{work.title}</h4>
                  <p className="text-lg font-semibold text-white mb-2">{work.company}</p>
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-white mb-1">
                      <MapPin className="w-4 h-4 text-[#1DB954]" />
                      <span>{work.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <Calendar className="w-4 h-4 text-[#1DB954]" />
                      <span>{work.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-white mb-4 leading-relaxed">{work.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-[#1DB954] mb-2">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {work.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-white text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#1DB954] rounded-full mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 md:gap-2 items-start">
                    {work.technologies.map((tech, idx) => (
                      <span key={idx} className="inline-block px-2.5 md:px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap
                                   bg-[#1DB954]/15 text-white border border-[#1DB954]/30 hover:bg-[#1DB954]/25">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};