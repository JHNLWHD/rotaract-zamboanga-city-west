import React, { useEffect, useRef } from 'react';
import { Award, Trophy, Star, Sparkles } from 'lucide-react';
import { fetchAwards } from '../../hooks/landing-page/awardsSection'; 
import { useQuery } from '@tanstack/react-query';  

const iconMap = {
  Award, 
  Trophy, 
  Star, 
  Sparkles
} 

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      gradient: 'from-blue-100 to-blue-50',
      border: 'hover:border-blue-500/20',
      text: 'text-blue-600',
      borderColor: 'border-blue-500/20',
      icon: 'text-blue-500',
      bar: 'bg-blue-500'
    },
    red: {
      gradient: 'from-red-100 to-red-50',
      border: 'hover:border-red-500/20',
      text: 'text-red-600',
      borderColor: 'border-red-500/20',
      icon: 'text-red-500',
      bar: 'bg-red-500'
    },
    green: {
      gradient: 'from-green-100 to-green-50',
      border: 'hover:border-green-500/20',
      text: 'text-green-600',
      borderColor: 'border-green-500/20',
      icon: 'text-green-500',
      bar: 'bg-green-500'
    },
    purple: {
      gradient: 'from-purple-100 to-purple-50',
      border: 'hover:border-purple-500/20',
      text: 'text-purple-600',
      borderColor: 'border-purple-500/20',
      icon: 'text-purple-500',
      bar: 'bg-purple-500'
    },
    yellow: {
      gradient: 'from-yellow-100 to-yellow-50',
      border: 'hover:border-yellow-500/20',
      text: 'text-yellow-600',
      borderColor: 'border-yellow-500/20',
      icon: 'text-yellow-500',
      bar: 'bg-yellow-500'
    },
    indigo: {
      gradient: 'from-indigo-100 to-indigo-50',
      border: 'hover:border-indigo-500/20',
      text: 'text-indigo-600',
      borderColor: 'border-indigo-500/20',
      icon: 'text-indigo-500',
      bar: 'bg-indigo-500'
    },
    pink: {
      gradient: 'from-pink-100 to-pink-50',
      border: 'hover:border-pink-500/20',
      text: 'text-pink-600',
      borderColor: 'border-pink-500/20',
      icon: 'text-pink-500',
      bar: 'bg-pink-500'
    },
    gray: {
      gradient: 'from-gray-100 to-gray-50',
      border: 'hover:border-gray-500/20',
      text: 'text-gray-600',
      borderColor: 'border-gray-500/20',
      icon: 'text-gray-500',
      bar: 'bg-gray-500'
    }
  };
  
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

const DynamicIcon = ({ iconName, className = "h-5 w-5" }: { iconName: string; className?: string }) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Award; 
  return <IconComponent/>
}

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

  const { isLoading, isError, data } = useQuery({
    queryKey: ['AwardData'],
    queryFn: () => fetchAwards(),
  })

  // Quick debug
  console.log('Awards Debug:', {
    loading: isLoading,
    error: isError, 
    dataExists: !!data,
    itemCount: data?.awardCards?.length || 0
  });

  const parseYear = (year) => {
    if (!year) return 0;
    if (year.includes('-')) {
      const parts = year.split('-');
      return parseInt(parts[1]) || parseInt(parts[0]);
    }
    return parseInt(year);
  };

  const awards = [
    {
      name: "ROPA",
      year: "2021",
      icon: <Star className="h-12 w-12 text-purple-500" aria-hidden="true" />,
      description: "Rotaract Outstanding Performance Award - Recognizing excellence in service and leadership.",
      gradient: "from-purple-100 to-violet-50",
      accent: "purple-500"
    },
    {
      name: "EON",
      year: "2020",
      icon: <Trophy className="h-12 w-12 text-yellow-500" aria-hidden="true" />,
      description: "Excellence in Outstanding Networks - For building strong community connections.",
      gradient: "from-yellow-100 to-amber-50",
      accent: "yellow-500"
    },
    {
      name: "ROPA Finalist",
      year: "2019-2020",
      icon: <Star className="h-12 w-12 text-purple-400" aria-hidden="true" />,
      description: "Finalist for the Rotaract Outstanding Performance Award (2019-2020).",
      gradient: "from-purple-50 to-violet-100",
      accent: "purple-400"
    },
    {
      name: "EON Gold Prize",
      year: "2019-2020",
      icon: <Trophy className="h-12 w-12 text-yellow-400" aria-hidden="true" />,
      description: "Gold Prize for Excellence in Outstanding Networks (2019-2020).",
      gradient: "from-yellow-50 to-amber-100",
      accent: "yellow-400"
    },
    {
      name: "ROPA Asia-Pacific Winner",
      year: "2020-2021",
      icon: <Star className="h-12 w-12 text-indigo-500" aria-hidden="true" />,
      description: "Asia-Pacific Winner of the Rotaract Outstanding Performance Award (2020-2021).",
      gradient: "from-indigo-100 to-blue-50",
      accent: "indigo-500"
    },
    {
      name: "Gear Awards - Exemplary Rotaract Club",
      year: "2020-2021",
      icon: <Award className="h-12 w-12 text-blue-500" aria-hidden="true" />,
      description: "Recognized as an Exemplary Rotaract Club in the Gear Awards (Groundbreaking and Exemplary Accomplishments of Rotaractors) for 2020-2021.",
      gradient: "from-blue-100 to-sky-50",
      accent: "blue-500"
    },
    {
      name: "GEAR",
      year: "2021-2025",
      icon: <Award className="h-12 w-12 text-blue-600" aria-hidden="true" />,
      description: "Global Excellence Achievement Recognition (GEAR: Groundbreaking and Exemplary Accomplishments of Rotaractors) for the years 2021-2025.",
      gradient: "from-blue-50 to-sky-100",
      accent: "blue-600"
    }
  ].sort((a, b) => parseYear(b.year) - parseYear(a.year));


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
          {!isLoading && !isError && data?.awardCards && data.awardCards.length > 0 && (
              <>
                {data.awardCards.map((award, index) => {
                  const colors = getColorClasses(award.color);
                  
                  return (
                    <div 
                      key={index}
                      className="reveal-on-scroll group"
                    >
                      <div className={`modern-card p-8 text-center h-full bg-gradient-to-br ${colors.gradient} border-2 border-transparent ${colors.border} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                        {/* Year badge */}
                        <div className="flex justify-end mb-4">
                          <span className={`px-3 py-1 bg-white/80 backdrop-blur-sm ${colors.text} text-sm font-semibold rounded-full border ${colors.borderColor}`}>
                            {award.year}
                          </span>
                        </div>

                        {/* Award icon */}
                        <div className="flex justify-center mb-6">
                          <div className= {`p-4 bg-white ${colors.text} rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                            <DynamicIcon iconName={award.iconName || "Award"} className={`h-12 w-12 ${colors.icon}`} />
                          </div>
                        </div>

                        {/* Award name */}
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-cranberry-600 transition-colors duration-300">
                          {award.title}
                        </h3>

                        {/* Award description */}
                        <p className="text-slate-600 leading-relaxed">
                          {award.shortDes}
                        </p>

                        {/* Decorative element */}
                        <div className="mt-6 flex justify-center">
                          <div className={`w-12 h-1 ${colors.bar} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
        </div> 

      </div>
    </section>
  );
};

export default Awards; 

