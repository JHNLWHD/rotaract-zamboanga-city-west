
import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const Join = () => {
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

  const benefits = [
    "Develop leadership skills through hands-on project management",
    "Build a network of passionate young professionals",
    "Make a positive impact in your local community",
    "Connect with Rotaract and Rotary clubs worldwide",
    "Access professional development and mentorship opportunities",
    "Participate in local and international conferences",
    "Develop cross-cultural understanding and global perspective"
  ];

  return (
    <section id="join" ref={sectionRef} className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="max-w-lg space-y-6">
            <div className="reveal-on-scroll">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-vinta-blue/10 text-vinta-blue">
                Join Our Community
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold reveal-on-scroll">
              Become Part of Our <span className="text-rotaract-blue">Journey</span>
            </h2>
            
            <p className="text-foreground/80 reveal-on-scroll">
              Joining the Rotaract Club of Zamboanga City West opens doors to personal growth, professional development, and meaningful community impact.
            </p>
            
            <div className="space-y-3 pt-2 reveal-on-scroll">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-vinta-green mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 reveal-on-scroll">
              <a 
                href="https://forms.gle/Q2JUyN6QeeqQkdFv5"
                target="_blank"
                className="inline-flex items-center px-6 py-3 rounded-full bg-rotaract-blue text-white font-medium hover:bg-rotaract-blue/90 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
              >
                Apply for Membership
              </a>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 reveal-on-scroll">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full bg-vinta-yellow/20 z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-vinta-red/20 z-0"></div>
            
            <div className="relative z-10 glass-card p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-6">Membership Requirements</h3>
              
              <div className="space-y-6">
                <div className="glass-card p-4">
                  <h4 className="font-semibold text-rotaract-blue">Age</h4>
                  <p className="text-sm text-foreground/70 mt-1">Between 18 and 30 years old</p>
                </div>
                
                <div className="glass-card p-4">
                  <h4 className="font-semibold text-rotaract-blue">Commitment</h4>
                  <p className="text-sm text-foreground/70 mt-1">Dedication to attend club meetings and participate in service projects</p>
                </div>
                
                <div className="glass-card p-4">
                  <h4 className="font-semibold text-rotaract-blue">Values</h4>
                  <p className="text-sm text-foreground/70 mt-1">Uphold the ideals of Rotary: Service, Fellowship, Diversity, Integrity, and Leadership</p>
                </div>
                
                <div className="glass-card p-4">
                  <h4 className="font-semibold text-rotaract-blue">Application Process</h4>
                  <p className="text-sm text-foreground/70 mt-1">Complete an application form, interview with club officers, and attend orientation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
