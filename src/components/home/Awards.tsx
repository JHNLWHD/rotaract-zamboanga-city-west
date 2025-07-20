import React, { useEffect, useRef } from 'react';
import { Award, Trophy, Star, Sparkles } from 'lucide-react';

const Awards = () => {
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
              }, 150 * i);
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

  const awards = [
    {
      name: "EON",
      year: "2023",
      icon: <Trophy className="h-12 w-12 text-yellow-500" aria-hidden="true" />,
      description: "Excellence in Outstanding Networks - Recognizing our commitment to building strong community connections and partnerships.",
      gradient: "from-yellow-100 to-amber-50",
      accent: "yellow-500"
    },
    {
      name: "GEAR",
      year: "2022",
      icon: <Award className="h-12 w-12 text-blue-500" aria-hidden="true" />,
      description: "Global Excellence Achievement Recognition - Celebrating our innovative approaches to community service and leadership development.",
      gradient: "from-blue-100 to-sky-50",
      accent: "blue-500"
    },
    {
      name: "ROPA",
      year: "2024",
      icon: <Star className="h-12 w-12 text-purple-500" aria-hidden="true" />,
      description: "Rotaract Outstanding Performance Award - Honoring our exceptional dedication to the Rotaract values and impactful community initiatives.",
      gradient: "from-purple-100 to-violet-50",
      accent: "purple-500"
    }
  ];

  return (
    <section 
      id="awards" 
      ref={sectionRef} 
      className="section-container relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-100/50"
      aria-labelledby="awards-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-64 h-64 bg-cranberry-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="reveal-on-scroll">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-100 text-cranberry-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Recognition & Excellence
            </span>
          </div>
          
          <h2 id="awards-heading" className="text-section-title text-slate-900 reveal-on-scroll mb-6">
            Our <span className="text-gradient">Awards</span> & 
            <br /><span className="text-gradient">Achievements</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            Our dedication to excellence and community impact has been recognized through various prestigious awards, 
            reflecting our commitment to the highest standards of service and leadership.
          </p>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {awards.map((award, index) => (
            <div 
              key={index}
              className="reveal-on-scroll group"
            >
              <div className={`modern-card p-8 text-center h-full bg-gradient-to-br ${award.gradient} border-2 border-transparent hover:border-${award.accent}/20 transition-all duration-300 hover:scale-105 hover:shadow-modern-xl`}>
                {/* Year badge */}
                <div className="flex justify-end mb-4">
                  <span className={`px-3 py-1 bg-white/80 backdrop-blur-sm text-${award.accent} text-sm font-semibold rounded-full border border-${award.accent}/20`}>
                    {award.year}
                  </span>
                </div>

                {/* Award icon */}
                <div className="flex justify-center mb-6">
                  <div className={`p-4 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    {award.icon}
                  </div>
                </div>

                {/* Award name */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-cranberry-600 transition-colors duration-300">
                  {award.name}
                </h3>

                {/* Award description */}
                <p className="text-slate-600 leading-relaxed">
                  {award.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 flex justify-center">
                  <div className={`w-12 h-1 bg-${award.accent} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards; 