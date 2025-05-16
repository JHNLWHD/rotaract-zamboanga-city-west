
import React, { useEffect, useRef } from 'react';
import { Heart, Globe, BookOpen, Cpu, Users, Leaf } from 'lucide-react';

const Programs = () => {
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

  const programCards = [
    {
      icon: <Heart className="h-6 w-6 text-vinta-pink" />,
      title: "Community Service",
      description: "Humanitarian projects addressing local needs in health, education, and poverty alleviation.",
      color: "bg-vinta-pink/10",
      borderColor: "border-vinta-pink/30",
      iconBg: "bg-vinta-pink/20"
    },
    {
      icon: <Globe className="h-6 w-6 text-rotaract-blue" />,
      title: "International Service",
      description: "Collaborations with global Rotaract clubs to address international humanitarian issues.",
      color: "bg-rotaract-blue/10",
      borderColor: "border-rotaract-blue/30",
      iconBg: "bg-rotaract-blue/20"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-vinta-yellow" />,
      title: "Professional Development",
      description: "Workshops, mentorship, and networking opportunities to enhance career skills.",
      color: "bg-vinta-yellow/10",
      borderColor: "border-vinta-yellow/30",
      iconBg: "bg-vinta-yellow/20"
    },
    {
      icon: <Cpu className="h-6 w-6 text-vinta-green" />,
      title: "Digital Literacy",
      description: "Training programs to bridge the digital divide in underserved communities.",
      color: "bg-vinta-green/10",
      borderColor: "border-vinta-green/30",
      iconBg: "bg-vinta-green/20"
    },
    {
      icon: <Users className="h-6 w-6 text-vinta-teal" />,
      title: "Youth Empowerment",
      description: "Initiatives to develop leadership and entrepreneurial skills among local youth.",
      color: "bg-vinta-teal/10",
      borderColor: "border-vinta-teal/30",
      iconBg: "bg-vinta-teal/20"
    },
    {
      icon: <Leaf className="h-6 w-6 text-vinta-green" />,
      title: "Environmental Action",
      description: "Projects promoting sustainability, conservation, and climate awareness.",
      color: "bg-vinta-green/10",
      borderColor: "border-vinta-green/30",
      iconBg: "bg-vinta-green/20"
    }
  ];

  return (
    <section 
      id="programs" 
      ref={sectionRef} 
      className="section-container relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, rgba(30,32,44,0.98), rgba(30,32,44,0.95))",
      }}
    >
      {/* Decorative elements inspired by the image */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full geometric-pattern"></div>
      </div>
      
      {/* Colored blurred circles */}
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-vinta-pink/20 blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-rotaract-blue/20 blur-3xl opacity-20"></div>
      
      {/* Decorative Vintas at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '40px' }}>
        <div className="absolute -bottom-5 left-10 w-16 h-20 bg-vinta-pink/70 rotate-12" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute -bottom-3 left-32 w-12 h-16 bg-vinta-orange/70 -rotate-6" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute -bottom-6 left-48 w-14 h-18 bg-vinta-yellow/70 rotate-3" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute -bottom-4 left-72 w-20 h-24 bg-vinta-green/70 rotate-[-8deg]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="reveal-on-scroll">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-vinta-yellow/20 text-vinta-yellow">
            Our Initiatives
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mt-4 reveal-on-scroll text-white">
          Programs That Make a Difference
        </h2>
        
        <p className="text-white/80 mt-4 reveal-on-scroll">
          Like the colorful sails of a Vinta navigating toward new horizons, our programs are designed to create meaningful impact across different aspects of community life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {programCards.map((program, index) => (
          <div 
            key={index} 
            className="dark-glass-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 reveal-on-scroll"
          >
            <div className={`w-12 h-12 rounded-full ${program.iconBg} flex items-center justify-center mb-4`}>
              {program.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{program.title}</h3>
            <p className="text-white/70">{program.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center reveal-on-scroll relative z-10">
        <a 
          href="https://www.facebook.com/RotaractClubZamboWest"
          target="_blank"
          className="inline-flex items-center px-6 py-3 rounded-full bg-vinta-yellow text-gray-800 font-medium hover:bg-vinta-yellow/90 transition-colors shadow-md hover:shadow-lg"
        >
          Partner with Us
        </a>
      </div>
    </section>
  );
};

export default Programs;
