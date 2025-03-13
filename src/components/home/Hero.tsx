
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(47,149,221,0.1) 0%, rgba(217,26,50,0.1) 100%)'
      }}
    >
      {/* Vinta-inspired decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-vinta-blue/10 rounded-full animate-sail" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-vinta-red/10 rounded-full animate-sail" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-vinta-yellow/10 rounded-full animate-sail" style={{ animationDelay: '0.8s' }}></div>
        
        {/* Vinta triangular sails in the background */}
        <div className="absolute top-1/4 left-1/3 w-16 h-20 bg-vinta-red/20 rotate-12 animate-sail" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-32 bg-vinta-blue/20 -rotate-6 animate-sail" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '1.7s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-20 h-28 bg-vinta-yellow/20 rotate-3 animate-sail" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '0.5s' }}></div>
      </div>

      <div className="container px-6 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block opacity-0 animate-on-load">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-sm font-medium text-rotaract-blue shadow-sm">
              Rotaract Club of Zamboanga City West
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold opacity-0 animate-on-load">
            <span className="text-rotaract-blue block">Service Above Self,</span>
            <span className="text-vinta-red block mt-2">Sailing Towards Change</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto opacity-0 animate-on-load">
            Empowering young leaders through friendship, service, and professional development, while celebrating the vibrant culture of Zamboanga City.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-on-load">
            <a href="#join" className="px-6 py-3 rounded-full bg-rotaract-blue text-white font-medium hover:bg-rotaract-blue/90 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform">
              Join Our Club
            </a>
            <a href="#programs" className="px-6 py-3 rounded-full bg-white text-rotaract-blue font-medium hover:bg-white/90 transition-colors shadow hover:shadow-md hover:scale-105 transform transition-transform">
              Our Programs
            </a>
          </div>
        </div>

        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full p-3 bg-white/80 backdrop-blur shadow-md animate-bounce hover:bg-white transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="text-rotaract-blue" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
