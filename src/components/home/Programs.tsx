import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

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

  const areasOfFocus = [
    {
      icon: "/areas_of_focus/AOF_peace_color_no_title.png",
      title: "Peace & Conflict Prevention",
      description: "Promoting understanding and building capacity to resolve conflicts and create lasting peace in communities.",
      color: "blue",
      highlights: ["Conflict Resolution Training", "Community Dialogue", "Peace Building"]
    },
    {
      icon: "/areas_of_focus/AOF_disease_color_no_title.png",
      title: "Disease Prevention & Treatment",
      description: "Improving access to healthcare and preventing the spread of life-threatening diseases in our communities.",
      color: "cranberry",
      highlights: ["Health Screenings", "Vaccination Campaigns", "Medical Missions"]
    },
    {
      icon: "/areas_of_focus/AOF_water_color_no_title.png",
      title: "Water, Sanitation & Hygiene",
      description: "Ensuring access to clean water and promoting proper sanitation practices for healthier communities.",
      color: "teal",
      highlights: ["Clean Water Projects", "Sanitation Programs", "Hygiene Education"]
    },
    {
      icon: "/areas_of_focus/AOF_maternal_color_no_title.png",
      title: "Maternal & Child Health",
      description: "Supporting mothers and children through healthcare programs and nutrition initiatives.",
      color: "purple",
      highlights: ["Prenatal Care", "Nutrition Programs", "Child Health Initiatives"]
    },
    {
      icon: "/areas_of_focus/AOF_education_color_no_title.png",
      title: "Basic Education & Literacy",
      description: "Strengthening educational systems and promoting literacy to empower communities through knowledge.",
      color: "orange",
      highlights: ["Literacy Programs", "School Support", "Educational Resources"]
    },
    {
      icon: "/areas_of_focus/AOF_economic_color_no_title.png",
      title: "Economic & Community Development",
      description: "Creating opportunities for economic growth and sustainable community development initiatives.",
      color: "green",
      highlights: ["Microfinance Programs", "Skills Training", "Community Infrastructure"]
    },
    {
      icon: "/areas_of_focus/AOF_environment_color_no_title.png",
      title: "Environment",
      description: "Protecting our planet through environmental conservation and sustainability projects.",
      color: "emerald",
      highlights: ["Environmental Education", "Conservation Projects", "Sustainability Initiatives"]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cranberry: {
        bg: "bg-cranberry-50",
        border: "border-cranberry-200/50",
        iconBg: "bg-cranberry-100",
        accent: "text-cranberry-700",
        hover: "hover:border-cranberry-300"
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200/50", 
        iconBg: "bg-blue-100",
        accent: "text-blue-700",
        hover: "hover:border-blue-300"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200/50",
        iconBg: "bg-purple-100",
        accent: "text-purple-700",
        hover: "hover:border-purple-300"
      },
      teal: {
        bg: "bg-teal-50",
        border: "border-teal-200/50",
        iconBg: "bg-teal-100", 
        accent: "text-teal-700",
        hover: "hover:border-teal-300"
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200/50",
        iconBg: "bg-orange-100",
        accent: "text-orange-700", 
        hover: "hover:border-orange-300"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200/50",
        iconBg: "bg-green-100",
        accent: "text-green-700",
        hover: "hover:border-green-300"
      },
      emerald: {
        bg: "bg-emerald-50",
        border: "border-emerald-200/50",
        iconBg: "bg-emerald-100",
        accent: "text-emerald-700",
        hover: "hover:border-emerald-300"
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
              Areas of Focus
            </span>
          </div>
          
          <h2 className="text-section-title text-slate-900 reveal-on-scroll mb-6">
            Seven Areas of <span className="text-gradient">Impact</span>
            <br />for Lasting Change
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            Through Rotary's seven areas of focus, we address the world's most persistent challenges 
            and create sustainable solutions in our community.
          </p>
        </div>

        {/* Areas of Focus grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center xl:justify-items-stretch">
          {areasOfFocus.map((area, index) => {
            const colorClasses = getColorClasses(area.color);
            return (
              <article 
                key={index}
                className={`modern-card group cursor-pointer hover-lift reveal-on-scroll ${colorClasses.bg} border-2 ${colorClasses.border} ${colorClasses.hover} w-full max-w-sm xl:max-w-none ${index === 6 ? 'xl:col-start-2' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  {/* Icon and header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 ${colorClasses.iconBg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <img 
                        src={area.icon} 
                        alt={`${area.title} icon`}
                        className="h-12 w-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className={`text-card-title ${colorClasses.accent} group-hover:text-slate-900 transition-colors`}>
                      {area.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                      {area.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {area.highlights.map((highlight, idx) => (
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
