import React, { useEffect, useRef } from 'react';
import { Heart, Globe, BookOpen, Cpu, Users, Leaf, ArrowRight, Sparkles } from 'lucide-react';

const Programs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, 100 * i);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const programCards = [
    {
      icon: <Heart className="h-7 w-7" />,
      title: "Community Service",
      description: "Humanitarian projects addressing local needs in health, education, and poverty alleviation.",
      color: "cranberry",
      highlights: ["Healthcare Initiatives", "Educational Support", "Disaster Relief"]
    },
    {
      icon: <Globe className="h-7 w-7" />,
      title: "International Service",
      description: "Collaborations with global Rotaract clubs to address international humanitarian issues.",
      color: "blue",
      highlights: ["Global Partnerships", "Cross-cultural Exchange", "International Projects"]
    },
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: "Professional Development", 
      description: "Workshops, mentorship, and networking opportunities to enhance career skills.",
      color: "purple",
      highlights: ["Skills Training", "Mentorship Programs", "Career Networking"]
    },
    {
      icon: <Cpu className="h-7 w-7" />,
      title: "Digital Literacy",
      description: "Training programs to bridge the digital divide in underserved communities.",
      color: "teal",
      highlights: ["Tech Training", "Digital Access", "Innovation Labs"]
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Youth Empowerment",
      description: "Initiatives to develop leadership and entrepreneurial skills among local youth.",
      color: "orange",
      highlights: ["Leadership Training", "Entrepreneurship", "Youth Development"]
    },
    {
      icon: <Leaf className="h-7 w-7" />,
      title: "Environmental Action",
      description: "Projects promoting sustainability, conservation, and climate awareness.",
      color: "green",
      highlights: ["Sustainability Projects", "Climate Action", "Conservation Efforts"]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cranberry: {
        bg: "bg-cranberry-50",
        border: "border-cranberry-200/50",
        icon: "text-cranberry-600",
        iconBg: "bg-cranberry-100",
        accent: "text-cranberry-700",
        hover: "hover:border-cranberry-300"
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200/50", 
        icon: "text-blue-600",
        iconBg: "bg-blue-100",
        accent: "text-blue-700",
        hover: "hover:border-blue-300"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200/50",
        icon: "text-purple-600", 
        iconBg: "bg-purple-100",
        accent: "text-purple-700",
        hover: "hover:border-purple-300"
      },
      teal: {
        bg: "bg-teal-50",
        border: "border-teal-200/50",
        icon: "text-teal-600",
        iconBg: "bg-teal-100", 
        accent: "text-teal-700",
        hover: "hover:border-teal-300"
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200/50",
        icon: "text-orange-600",
        iconBg: "bg-orange-100",
        accent: "text-orange-700", 
        hover: "hover:border-orange-300"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200/50",
        icon: "text-green-600",
        iconBg: "bg-green-100",
        accent: "text-green-700",
        hover: "hover:border-green-300"
      }
    };
    return colors[color as keyof typeof colors] || colors.cranberry;
  };

  return (
    <section 
      id="programs" 
      ref={sectionRef} 
      className="section-container relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cranberry-50/30"
    >
      {/* Modern background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-cranberry-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-32 w-80 h-80 bg-cranberry-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full geometric-bg opacity-10"></div>
      </div>
      
      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="reveal-on-scroll mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-100 text-cranberry-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Impact Areas
            </span>
          </div>
          
          <h2 className="text-section-title text-slate-900 reveal-on-scroll mb-6">
            Programs That <span className="text-gradient">Transform</span>
            <br />Communities
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            Discover our comprehensive range of initiatives designed to create lasting positive change 
            across multiple sectors of society.
          </p>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {programCards.map((program, index) => {
            const colorClasses = getColorClasses(program.color);
            return (
              <article 
                key={index}
                className={`modern-card group cursor-pointer hover-lift reveal-on-scroll ${colorClasses.bg} border-2 ${colorClasses.border} ${colorClasses.hover}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  {/* Icon and header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 ${colorClasses.iconBg} rounded-2xl ${colorClasses.icon} group-hover:scale-110 transition-transform duration-300`}>
                      {program.icon}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className={`text-card-title ${colorClasses.accent} group-hover:text-slate-900 transition-colors`}>
                      {program.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                      {program.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {program.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 ${colorClasses.iconBg} rounded-full`}></div>
                          <span className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className={`mt-6 h-1 ${colorClasses.iconBg} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20 reveal-on-scroll">
          <div className="modern-card p-12 max-w-4xl mx-auto bg-gradient-to-r from-cranberry-600 to-cranberry-500 text-white rounded-3xl">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Make a <span className="text-cranberry-100">Difference</span>?
            </h3>
            <p className="text-cranberry-100 text-lg mb-8 max-w-2xl mx-auto">
              Join us in our mission to create positive change. Whether you're interested in 
              community service, professional development, or global citizenship, there's a place for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#join" className="bg-white text-cranberry-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl">
                <span>Get Involved</span>
                <ArrowRight className="w-4 h-4 ml-2 inline-block" />
              </a>
              <a 
                href="https://www.facebook.com/RotaractClubZamboWest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-cranberry-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
