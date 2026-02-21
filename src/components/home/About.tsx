import React, { useEffect, useRef } from 'react';
import { Sparkles, Ribbon } from 'lucide-react';
import Markdown from 'react-markdown';
import { fetchAboutCommunity } from '../../hooks/landing-page/aboutCommunity';
import { useQuery } from '@tanstack/react-query';
import DynamicIcon from '../IconChanger';
import { cacheConfig } from '../../config/cache';

const About = () => {
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
              }, 100 * i);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: () => fetchAboutCommunity(),
    ...cacheConfig.yearly,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cranberry-50/30"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-cranberry-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-cranberry-300/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-20">
          <div className="reveal-on-scroll">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-100 text-cranberry-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              About Our Community
            </span>
          </div>

          <h2
            id="about-heading"
            className="text-section-title text-slate-900 reveal-on-scroll mb-6"
          >
            Driven by <span className="text-gradient">Purpose</span>,
            <br />
            United by <span className="text-gradient">Impact</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            The Rotaract Club of Zamboanga City West exemplifies the principles
            of hope and transformation, where passionate young leaders come
            together to create meaningful change in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="reveal-on-scroll">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-modern-xl">
                <img
                  src={
                    data?.image?.url ||
                    '/lovable-uploads/77e591d9-27b0-4497-b290-8fa95806ace4.png'
                  }
                  alt={
                    data?.image?.description ||
                    'Rotaract Club of Zamboanga City West members gathered for a community event'
                  }
                  className="w-full h-auto"
                  loading="lazy"
                  width="500"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cranberry-900/20 to-transparent"></div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-modern-lg p-6 border border-cranberry-100/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cranberry-100 rounded-xl">
                    <Ribbon className="h-6 w-6 text-cranberry-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      2010
                    </div>
                    <div className="text-sm text-slate-500">Established</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="reveal-on-scroll">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Our <span className="text-cranberry-600">Story</span>
              </h3>

              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed text-justify">
                {isLoading ? (
                  <p>Loading...</p>
                ) : isError ? (
                  <p>Error loading content.</p>
                ) : (
                  <Markdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-6 last:mb-0">{children}</p>
                      ),
                      em: ({ children }) => (
                        <em className="text-cranberry-600 font-semibold not-italic">
                          {children}
                        </em>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-cranberry-600 font-semibold">
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {data?.ourStory ?? `Data not found`}
                  </Markdown>
                )}
              </div>
            </div>

            {!isLoading && !isError && data?.stats && data.stats.length > 0 && (
              <div
                className={`grid ${
                  data.stats.length === 2
                    ? 'grid-cols-2'
                    : data.stats.length >= 4
                      ? 'grid-cols-2'
                      : 'grid-cols-1'
                } gap-4 reveal-on-scroll`}
              >
                {data.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="modern-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-cranberry-100 rounded-lg text-cranberry-600 group-hover:bg-cranberry-600 group-hover:text-white transition-colors">
                        <DynamicIcon iconName={stat.icon || 'none'} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
