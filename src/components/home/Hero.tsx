
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadVintaAnimation = () => {
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.animate-on-load');
        
        elements.forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).classList.add('animate-fade-in-up');
            (el as HTMLElement).style.opacity = '1';
          }, 300 * index);
        });
      }
    };

    loadVintaAnimation();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-rotaract-navy via-rotaract-navy to-rotaract-blue/90 geometric-pattern"
    >
      {/* Vinta-inspired decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-10 left-0 w-full h-40">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,321.39,56.44z" 
              fill="#FF8024" 
              fillOpacity="0.2"
            ></path>
          </svg>
        </div>
        
        {/* Vinta sails in the background */}
        <div className="absolute bottom-10 left-10 w-24 h-32 bg-vinta-pink/80 rotate-12 animate-sail" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '1s' }}></div>
        <div className="absolute bottom-16 left-32 w-20 h-24 bg-vinta-orange/80 -rotate-6 animate-sail" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '1.7s' }}></div>
        <div className="absolute bottom-6 left-56 w-16 h-20 bg-vinta-yellow/80 rotate-3 animate-sail" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-14 left-80 w-28 h-36 bg-vinta-red/80 rotate-[-8deg] animate-sail" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '1.2s' }}></div>
      </div>

      {/* Circular element inspired by the image */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-rotaract-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-vinta-yellow/10 rounded-full blur-3xl"></div>

      <div className="container px-6 z-10 text-center mt-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white opacity-0 animate-on-load">
            <span className="block mb-2">ROTARACT CLUB OF</span>
            <span className="block">ZAMBOANGA CITY WEST</span>
            <span className="block mt-4 text-xl md:text-2xl font-normal text-white/80">SPONSORED BY ROTARY CLUB OF ZAMBOANGA CITY WEST</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto opacity-0 animate-on-load">
            Empowering young leaders through friendship, service, and professional development, while celebrating the vibrant culture of Zamboanga City.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-on-load">
            <a href="#join" className="px-6 py-3 rounded-full bg-rotaract-pink text-white font-medium hover:bg-rotaract-pink/90 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform">
              Join Our Club
            </a>
            <a href="#programs" className="px-6 py-3 rounded-full bg-white text-rotaract-pink font-medium hover:bg-white/90 transition-colors shadow hover:shadow-md hover:scale-105 transform transition-transform">
              Our Programs
            </a>
          </div>
        </div>

        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full p-3 bg-white/80 backdrop-blur shadow-md animate-bounce hover:bg-white transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="text-rotaract-pink" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
