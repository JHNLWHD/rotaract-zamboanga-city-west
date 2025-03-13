
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
      icon: <Heart className="h-6 w-6 text-vinta-red" />,
      title: "Community Service",
      description: "Humanitarian projects addressing local needs in health, education, and poverty alleviation.",
      color: "bg-vinta-red/10",
      borderColor: "border-vinta-red/30",
      iconBg: "bg-vinta-red/20"
    },
    {
      icon: <Globe className="h-6 w-6 text-vinta-blue" />,
      title: "International Service",
      description: "Collaborations with global Rotaract clubs to address international humanitarian issues.",
      color: "bg-vinta-blue/10",
      borderColor: "border-vinta-blue/30",
      iconBg: "bg-vinta-blue/20"
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
      icon: <Users className="h-6 w-6 text-vinta-purple" />,
      title: "Youth Empowerment",
      description: "Initiatives to develop leadership and entrepreneurial skills among local youth.",
      color: "bg-vinta-purple/10",
      borderColor: "border-vinta-purple/30",
      iconBg: "bg-vinta-purple/20"
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
    <section id="programs" ref={sectionRef} className="section-container bg-gray-50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="reveal-on-scroll">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-rotaract-gold/10 text-rotaract-gold">
            Our Initiatives
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mt-4 reveal-on-scroll">
          Programs That Make a Difference
        </h2>
        
        <p className="text-foreground/80 mt-4 reveal-on-scroll">
          Like the colorful sails of a Vinta navigating toward new horizons, our programs are designed to create meaningful impact across different aspects of community life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programCards.map((program, index) => (
          <div 
            key={index} 
            className={`rounded-xl p-6 border ${program.color} ${program.borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 reveal-on-scroll`}
          >
            <div className={`w-12 h-12 rounded-full ${program.iconBg} flex items-center justify-center mb-4`}>
              {program.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{program.title}</h3>
            <p className="text-foreground/70">{program.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center reveal-on-scroll">
        <a 
          href="#contact" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-rotaract-gold text-white font-medium hover:bg-rotaract-gold/90 transition-colors shadow-md hover:shadow-lg"
        >
          Partner with Us
        </a>
      </div>
    </section>
  );
};

export default Programs;
