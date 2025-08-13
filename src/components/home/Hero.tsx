import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';  
import { fetchHeroContent } from '../../hooks/landingpageContent'; 
import { ArrowDown, Sparkles, Users, Target } from 'lucide-react';

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

  {/* function to get hero Content */} 
  const {data, isLoading, isError } = useQuery({
    queryKey: ['heroContent'], 
    queryFn: () => fetchHeroContent(),  
  }); 


  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
      aria-label="Hero section"
    >
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/zamboanga-city-hall.jpg)' }}
        role="img"
        aria-label="Zamboanga City Hall background"
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-slate-900/75"></div>
      
      {/* Modern geometric overlay */}
      <div className="absolute inset-0 geometric-bg opacity-20"></div>
      
      {/* Floating modern elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Modern floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cranberry-500/20 rounded-full blur-xl floating-element" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cranberry-400/30 rounded-lg blur-lg floating-element rotate-45" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-cranberry-300/25 rounded-full blur-md floating-element" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-cranberry-600/20 rounded-lg blur-lg floating-element -rotate-12" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Modern decorative icons */}
        <div className="absolute top-1/3 left-20 text-cranberry-400/30 floating-element" style={{ animationDelay: '0.5s' }}>
          <Sparkles size={32} />
        </div>
        <div className="absolute bottom-1/3 right-16 text-cranberry-300/30 floating-element" style={{ animationDelay: '1.8s' }}>
          <Users size={28} />
        </div>
        <div className="absolute top-2/3 right-1/4 text-cranberry-500/30 floating-element" style={{ animationDelay: '2.2s' }}>
          <Target size={24} />
        </div>
      </div>

      {/* Main content */}
      <div className="container px-6 z-10 text-center mt-16">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Modern badge */}
          <div className="opacity-0 animate-on-load">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-500/10 backdrop-blur-sm border border-cranberry-300/20 text-cranberry-200 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroButtonMotto} 
            </span>
          </div>

          {/* Hero title with modern typography */}
          <h1 className="text-hero text-white opacity-0 animate-on-load leading-none">
            <span className="block mb-4">
              <span className="text-gradient font-extrabold"> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroTitle} </span>
            </span>
            <span className="block text-white/90 font-bold">
            {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroTitleTwo} 
            </span>
          </h1>

          {/* Subtitle with modern styling */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto opacity-0 animate-on-load leading-relaxed">
            Where <span className="text-cranberry-300 font-semibold"> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.wordHighLightOne} </span>, 
            <span className="text-cranberry-300 font-semibold"> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.wordFillersTwo}</span>, and 
            <span className="text-cranberry-300 font-semibold"> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.wordHighlightThree}</span> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroShortDes}
          </p>

          {/* Modern CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-on-load">
            <a 
              href="#join" 
              className="primary-button group"
            >
              <span> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroButtonOne} </span>
              <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#programs" 
              className="secondary-button group"
            >
              <span> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroButtonTwo} </span>
              <Users className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 opacity-0 animate-on-load py-4">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-cranberry-400/30 rounded-2xl p-6 text-center shadow-xl">
              <div className="text-3xl font-bold text-cranberry-400 mb-2"> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroDivNumberOne} </div>
              <div className="text-white/90 text-sm font-medium"> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroDivDesOne}</div>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-xl border border-cranberry-400/30 rounded-2xl p-6 text-center shadow-xl">
              <div className="text-3xl font-bold text-cranberry-400 mb-2">{isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroDivNumberTwo}</div>
              <div className="text-white/90 text-sm font-medium">{isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroDivDescTwo}</div>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-xl border border-cranberry-400/30 rounded-2xl p-6 text-center shadow-xl">
              <div className="text-3xl font-bold text-cranberry-400 mb-2">{isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroDivNumberThree}</div>
              <div className="text-white/90 text-sm font-medium">{isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.heroDivDesThree}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
