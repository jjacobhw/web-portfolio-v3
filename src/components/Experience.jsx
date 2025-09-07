import { GraduationCap, Briefcase, Calendar, MapPin, Award } from 'lucide-react';

export const Experience = () => {
  const education = [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      location: "Stanford, CA",
      period: "2020 - 2022",
      gpa: "3.9/4.0",
      highlights: ["Machine Learning Specialization", "Research in AI Ethics", "Dean's List"]
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "UC Berkeley",
      location: "Berkeley, CA",
      period: "2016 - 2020",
      gpa: "3.7/4.0",
      highlights: ["Summa Cum Laude", "President of Coding Club", "Hackathon Winner"]
    }
  ];

  const workExperience = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Led development of scalable web applications serving 1M+ users. Architected microservices infrastructure and mentored junior developers.",
      achievements: [
        "Improved application performance by 40%",
        "Led team of 5 engineers",
        "Reduced deployment time by 60%"
      ],
      technologies: ["React", "Node.js", "AWS", "MongoDB"]
    },
    {
      title: "Software Engineer Intern",
      company: "Google",
      location: "Mountain View, CA",
      period: "Summer 2021",
      description: "Developed features for Google Search using cutting-edge machine learning algorithms. Collaborated with cross-functional teams to improve user experience.",
      achievements: [
        "Implemented ML model with 95% accuracy",
        "Contributed to 3 major product releases",
        "Presented findings to senior leadership"
      ],
      technologies: ["Python", "TensorFlow", "Go", "Kubernetes"]
    },
    {
      title: "Junior Developer",
      company: "StartupXYZ",
      location: "Palo Alto, CA",
      period: "2020 - 2022",
      description: "Built responsive web applications and mobile apps for early-stage startup. Wore multiple hats in fast-paced environment.",
      achievements: [
        "Delivered 15+ client projects",
        "Reduced bug reports by 30%",
        "Implemented CI/CD pipeline"
      ],
      technologies: ["JavaScript", "React Native", "PostgreSQL", "Docker"]
    }
  ];

  return (
    <section id="experience" className="min-h-screen bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 text-[#1DB954]">
          Experience
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#1DB954] rounded-lg">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-3xl font-bold">Education</h3>
            </div>

            {education.map((edu, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-6 top-16 w-px h-24 bg-[#1DB954]"></div>
                )}
                
                <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-[#1DB954] transition-all duration-300 hover:shadow-lg hover:shadow-[#1DB954]/20 relative">
                  <div className="absolute -left-2 top-6 w-4 h-4 bg-[#1DB954] rounded-full border-4 border-black"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <h4 className="text-xl font-bold text-[#1DB954] mb-1">{edu.degree}</h4>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </span>
                  </div>
                  
                  <p className="text-lg font-semibold text-white mb-2">{edu.school}</p>
                  
                  <div className="flex items-center gap-4 text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </span>
                    {edu.gpa && (
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        GPA: {edu.gpa}
                      </span>
                    )}
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

          {/* Work Experience Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#1DB954] rounded-lg">
                <Briefcase className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-3xl font-bold">Work Experience</h3>
            </div>

            {workExperience.map((work, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < workExperience.length - 1 && (
                  <div className="absolute left-6 top-20 w-px h-32 bg-[#1DB954]"></div>
                )}
                
                <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-[#1DB954] transition-all duration-300 hover:shadow-lg hover:shadow-[#1DB954]/20 relative">
                  <div className="absolute -left-2 top-6 w-4 h-4 bg-[#1DB954] rounded-full border-4 border-black"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <h4 className="text-xl font-bold text-[#1DB954] mb-1">{work.title}</h4>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {work.period}
                    </span>
                  </div>
                  
                  <p className="text-lg font-semibold text-white mb-2">{work.company}</p>
                  
                  <p className="text-gray-400 flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4" />
                    {work.location}
                  </p>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{work.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-200 mb-2">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {work.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#1DB954] rounded-full mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {work.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-gray-800 text-[#1DB954] px-3 py-1 rounded-full text-sm border border-[#1DB954]/30">
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