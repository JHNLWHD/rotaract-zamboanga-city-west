
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
      icon: <Users className="h-8 w-8 text-vinta-blue" />,
      title: "Fellowship",
      description: "Building lasting friendships and connections among diverse young leaders."
    },
    {
      icon: <Globe className="h-8 w-8 text-vinta-red" />,
      title: "Service",
      description: "Addressing community needs through impactful humanitarian projects."
    },
    {
      icon: <Handshake className="h-8 w-8 text-vinta-yellow" />,
      title: "Leadership",
      description: "Developing professional skills and ethical leadership qualities."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="space-y-6">
            <div className="reveal-on-scroll">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-rotaract-blue/10 text-rotaract-blue">
                About Us
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold reveal-on-scroll">
              The Spirit of Rotaract and <span className="text-vinta-red">Vinta</span>
            </h2>
            
            <p className="text-foreground/80 reveal-on-scroll">
              The Rotaract Club of Zamboanga City West brings together the global mission of Rotaract with the vibrant local culture of Zamboanga City, symbolized by the colorful Vinta sailboats.
            </p>
            
            <p className="text-foreground/80 reveal-on-scroll">
              Just as the Vinta navigates waters with its distinctive colorful sails, our club navigates through community challenges with the diverse talents and perspectives of our members.
            </p>

            <div className="pt-4 reveal-on-scroll">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-1 bg-vinta-red"></div>
                <div className="w-16 h-1 bg-vinta-yellow"></div>
                <div className="w-16 h-1 bg-vinta-blue"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center reveal-on-scroll">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-vinta-blue/10 absolute top-0 right-0 z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="Rotaract members in action" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
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
