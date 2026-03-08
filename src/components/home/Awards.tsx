import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { fetchAwards } from '../../hooks/landing-page/awardsSection';
import { useQuery } from '@tanstack/react-query';
import DynamicIcon from '../IconChanger';
import { cacheConfig } from '../../config/cache';

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      gradient: 'from-blue-100 to-blue-50',
      border: 'hover:border-blue-500/20',
      text: 'text-blue-600',
      borderColor: 'border-blue-500/20',
      icon: 'text-blue-500',
      bar: 'bg-blue-500',
    },
    red: {
      gradient: 'from-red-100 to-red-50',
      border: 'hover:border-red-500/20',
      text: 'text-red-600',
      borderColor: 'border-red-500/20',
      icon: 'text-red-500',
      bar: 'bg-red-500',
    },
    green: {
      gradient: 'from-green-100 to-green-50',
      border: 'hover:border-green-500/20',
      text: 'text-green-600',
      borderColor: 'border-green-500/20',
      icon: 'text-green-500',
      bar: 'bg-green-500',
    },
    purple: {
      gradient: 'from-purple-100 to-purple-50',
      border: 'hover:border-purple-500/20',
      text: 'text-purple-600',
      borderColor: 'border-purple-500/20',
      icon: 'text-purple-500',
      bar: 'bg-purple-500',
    },
    yellow: {
      gradient: 'from-yellow-100 to-yellow-50',
      border: 'hover:border-yellow-500/20',
      text: 'text-yellow-600',
      borderColor: 'border-yellow-500/20',
      icon: 'text-yellow-500',
      bar: 'bg-yellow-500',
    },
    indigo: {
      gradient: 'from-indigo-100 to-indigo-50',
      border: 'hover:border-indigo-500/20',
      text: 'text-indigo-600',
      borderColor: 'border-indigo-500/20',
      icon: 'text-indigo-500',
      bar: 'bg-indigo-500',
    },
    pink: {
      gradient: 'from-pink-100 to-pink-50',
      border: 'hover:border-pink-500/20',
      text: 'text-pink-600',
      borderColor: 'border-pink-500/20',
      icon: 'text-pink-500',
      bar: 'bg-pink-500',
    },
    gray: {
      gradient: 'from-gray-100 to-gray-50',
      border: 'hover:border-gray-500/20',
      text: 'text-gray-600',
      borderColor: 'border-gray-500/20',
      icon: 'text-gray-500',
      bar: 'bg-gray-500',
    },
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

const Awards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['AwardData'],
    queryFn: () => fetchAwards(),
    ...cacheConfig.yearly,
  });

  const filteredAwards =
    data?.awards
      ?.filter(award => award.isFeatured)
      .sort(
        (a, b) =>
          new Date(a.dateReceived).getTime() -
          new Date(b.dateReceived).getTime()
      )
      .slice(0, 6) || [];

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="section-container relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-100/50"
      aria-labelledby="awards-heading"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-64 h-64 bg-cranberry-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-20">
          <div className="reveal-on-scroll">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-100 text-cranberry-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Recognition & Excellence
            </span>
          </div>

          <h2
            id="awards-heading"
            className="text-section-title text-slate-900 reveal-on-scroll mb-6"
          >
            Our <span className="text-gradient">Awards</span> &
            <br />
            <span className="text-gradient">Achievements</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            Our dedication to excellence and community impact has been
            recognized through various prestigious awards, reflecting our
            commitment to the highest standards of service and leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {!isLoading && !isError && filteredAwards.length > 0 && (
            <>
              {filteredAwards.map((award, index) => {
                const colors = getColorClasses(award.color);
                return (
                  <div key={index} className="reveal-on-scroll group">
                    <div
                      className={`modern-card p-8 text-center h-full bg-gradient-to-br ${colors.gradient} border-2 border-transparent ${colors.border} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    >
                      <div className="flex justify-end mb-4">
                        <span
                          className={`px-3 py-1 bg-white/80 backdrop-blur-sm ${colors.text} text-sm font-semibold rounded-full border ${colors.borderColor}`}
                        >
                          {award.yearReceived}
                        </span>
                      </div>

                      <div className="flex justify-center mb-6">
                        <div
                          className={`p-4 bg-white ${colors.text} rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        >
                          <DynamicIcon
                            iconName={award.icon || 'Award'}
                            className={`h-12 w-12 ${colors.icon}`}
                          />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-cranberry-600 transition-colors duration-300">
                        {award.name}
                      </h3>

                      <p className="text-slate-600 leading-relaxed">
                        {award.shortDescription}
                      </p>

                      <div className="mt-6 flex justify-center">
                        <div
                          className={`w-12 h-1 ${colors.bar} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                        ></div>
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
