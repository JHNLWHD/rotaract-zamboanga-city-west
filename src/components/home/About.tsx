
import React, { useEffect, useRef } from 'react';
import { Users, Globe, Handshake } from 'lucide-react';

const About = () => {
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

  const valueCards = [
    {
      icon: <Users className="h-8 w-8 text-rotaract-blue" />,
      title: "Fellowship",
      description: "Building lasting friendships and connections among diverse young leaders."
    },
    {
      icon: <Globe className="h-8 w-8 text-rotaract-pink" />,
      title: "Service",
      description: "Addressing community needs through impactful humanitarian projects."
    },
    {
      icon: <Handshake className="h-8 w-8 text-rotaract-blue" />,
      title: "Leadership",
      description: "Developing professional skills and ethical leadership qualities."
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="section-container"
      style={{
        background: "linear-gradient(to bottom, rgba(245,247,250,1) 0%, rgba(240,242,245,1) 100%)"
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        <div className="absolute inset-0 opacity-5 wave-bg pointer-events-none"></div>
        
        <div className="order-2 lg:order-1 relative z-10">
          <div className="space-y-6">
            <div className="reveal-on-scroll">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-rotaract-pink/10 text-rotaract-pink">
                About Us
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold reveal-on-scroll">
              The Spirit of <span className="text-rotaract-pink">Rotaract</span>
            </h2>
            
            <p className="text-foreground/80 reveal-on-scroll">
              The Rotaract Club of Zamboanga City West embodies the global mission of Rotaract while celebrating the vibrant local culture of Zamboanga City.
            </p>
            
            <p className="text-foreground/80 reveal-on-scroll">
              Our club navigates through community challenges with the diverse talents and perspectives of our members, all united in service and fellowship.
            </p>

            <div className="pt-4 reveal-on-scroll">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-1 bg-rotaract-pink"></div>
                <div className="w-16 h-1 bg-rotaract-blue"></div>
                <div className="w-16 h-1 bg-rotaract-navy"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center reveal-on-scroll">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-rotaract-blue/10 absolute top-0 right-0 z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/77e591d9-27b0-4497-b290-8fa95806ace4.png" 
                alt="Rotaract Club of Zamboanga City West members" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 relative z-10">
        <h3 className="text-2xl font-bold text-center mb-12 reveal-on-scroll">Our Core Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueCards.map((card, index) => (
            <div 
              key={index}
              className="glass-card p-8 text-center hover-lift reveal-on-scroll"
            >
              <div className="rounded-full bg-white/50 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                {card.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{card.title}</h4>
              <p className="text-foreground/80">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
