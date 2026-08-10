import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHeroContent } from '../../hooks/landing-page/heroSection';
import { ArrowDown, Sparkles, Users, Target } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cacheConfig } from '../../config/cache';

const ROTARY_SPONSOR_URL = 'https://rotaryzcwest.org/';
const FALLBACK_STATS = [
  { value: '14', description: 'Years of Impact' },
  { value: '50', description: 'Active Members' },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadModernAnimation = () => {
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.animate-on-load');
        elements.forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).classList.add('animate-fade-in-up');
            (el as HTMLElement).style.opacity = '1';
          }, 200 * index);
        });
      }
    };
    loadModernAnimation();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['heroContent'],
    queryFn: () => fetchHeroContent(),
    ...cacheConfig.yearly,
  });

  const stats =
    data?.stats && data.stats.length >= 2
      ? data.stats.slice(0, 2)
      : FALLBACK_STATS;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/zamboanga-city-hall.jpg)' }}
        role="img"
        aria-label="Zamboanga City Hall background"
      ></div>

      <div className="absolute inset-0 bg-slate-900/75"></div>
      <div className="absolute inset-0 geometric-bg opacity-20"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-cranberry-500/20 rounded-full blur-xl floating-element"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-cranberry-400/30 rounded-lg blur-lg floating-element rotate-45"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-cranberry-300/25 rounded-full blur-md floating-element"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-20 h-20 bg-cranberry-600/20 rounded-lg blur-lg floating-element -rotate-12"
          style={{ animationDelay: '1.5s' }}
        ></div>

        <div
          className="absolute top-1/3 left-20 text-cranberry-400/30 floating-element"
          style={{ animationDelay: '0.5s' }}
        >
          <Sparkles size={32} />
        </div>
        <div
          className="absolute bottom-1/3 right-16 text-cranberry-300/30 floating-element"
          style={{ animationDelay: '1.8s' }}
        >
          <Users size={28} />
        </div>
        <div
          className="absolute top-2/3 right-1/4 text-cranberry-500/30 floating-element"
          style={{ animationDelay: '2.2s' }}
        >
          <Target size={24} />
        </div>
      </div>

      <div className="container px-6 z-10 text-center mt-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="opacity-0 animate-on-load">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-500/10 backdrop-blur-sm border border-cranberry-300/20 text-cranberry-200 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              {isLoading
                ? 'Loading...'
                : (data?.badgeText ?? 'Empowering Young Leaders Since 2010')}
            </span>
          </div>

          <h1 className="text-hero text-white opacity-0 animate-on-load leading-none">
            <span className="block mb-4">
              <span className="text-gradient font-extrabold">
                {' '}
                Rotaract Club{' '}
              </span>
            </span>
            <span className="block text-white/90 font-bold">
              Zamboanga City West
            </span>
          </h1>

          <a
            href={ROTARY_SPONSOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm md:text-base text-white/90 underline decoration-cranberry-300 underline-offset-4 hover:text-white"
          >
            Sponsored by Rotary Club of Zamboanga City West
          </a>

          <div className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto opacity-0 animate-on-load leading-relaxed prose prose-invert">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-2xl md:text-2xl font-medium text-white/90 leading-snug text-center max-w-4xl mx-auto">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-[#F7ABC9] font-semibold">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="text-[#F7ABC9] font-semibold not-italic">
                    {children}
                  </em>
                ),
              }}
            >
              {data?.subTitle ??
                'Where **fellowship**, **service**, and **leadership** unite to create lasting impact in our community.'}
            </ReactMarkdown>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-on-load">
            <a href="#credentials" className="primary-button group">
              Get to Know Great West
              <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
            <a href="/projects" className="secondary-button group">
              View Our Projects
              <Users className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mt-16 py-4 animate-fade-in-up italic">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-900/90 backdrop-blur-xl border border-cranberry-400/30 rounded-2xl p-6 text-center shadow-xl"
                >
                  <div className="text-3xl font-bold text-cranberry-400 mb-2">
                    {stat.value.replace(/\+$/, '')} <span>+</span>
                  </div>
                  <div className="text-white/90 text-sm font-medium">
                    {stat.description}
                  </div>
                </div>
              ))}
              <p className="md:col-span-2 text-xs text-white/70 not-italic">
                Figures as of 2026.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
