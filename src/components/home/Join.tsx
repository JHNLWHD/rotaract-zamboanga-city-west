
import React, { useEffect, useRef } from 'react';
import { FileText, Users, Handshake, Award, CalendarDays, Briefcase, Link } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Join = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

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
    
    if (processRef.current) {
      observer.observe(processRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (processRef.current) {
        observer.unobserve(processRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      icon: <Briefcase className="h-5 w-5 text-vinta-green" />,
      text: "Lead meaningful projects"
    },
    {
      icon: <Users className="h-5 w-5 text-vinta-green" />,
      text: "Connect with passionate changemakers"
    },
    {
      icon: <Handshake className="h-5 w-5 text-vinta-green" />,
      text: "Build lifelong friendships"
    },
    {
      icon: <CalendarDays className="h-5 w-5 text-vinta-green" />,
      text: "Join trainings, events, and unforgettable experiences"
    }
  ];

  const membershipRequirements = [
    {
      title: "Age",
      description: "Between 18 and 35 years old"
    },
    {
      title: "Commitment",
      description: "Dedication to attend club meetings and participate in service projects"
    },
    {
      title: "Values",
      description: "Uphold the ideals of Rotary: Service, Fellowship, Diversity, Integrity, and Leadership"
    },
    {
      title: "Application Process",
      description: "Complete an application form, interview with club officers, and attend orientation"
    }
  ];

  const membershipLevels = [
    {
      title: "VOLUNTEER MEMBER LEVEL",
      icon: <Users className="h-8 w-8 text-white" />,
      duration: "Duration: 1-6 months",
      description: "New members will engage in volunteer activities"
    },
    {
      title: "ADVOCATE MEMBER LEVEL",
      icon: <Handshake className="h-8 w-8 text-white" />,
      duration: "Duration: 6-12 months",
      description: "Deeper involvement through advocacy and continued commitment"
    },
    {
      title: "GREAT WEST MEMBER LEVEL",
      icon: <Award className="h-8 w-8 text-white" />,
      duration: "Official Member (Inducted)",
      description: "Reward for significant contributions and embodying organizational values"
    }
  ];

  // JSON-LD structured data for organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rotaract Club of Zamboanga City West",
    "description": "Empowering young leaders through fellowship, community service, and professional development in Zamboanga City.",
    "url": "https://rotaract-zambo-city-west.netlify.app/",
    "logo": "https://rotaract-zambo-city-west.netlify.app/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png",
    "sameAs": [
      "https://www.facebook.com/RotaractClubZamboWest",
      "https://www.instagram.com/raczambowest1"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zamboanga City",
      "addressRegion": "Zamboanga Peninsula",
      "addressCountry": "PH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63-967-365-4339",
      "contactType": "Customer Service",
      "email": "raczambowest1@gmail.com"
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <section id="join" ref={sectionRef} className="section-container py-16">
        {/* Top Section - 1 Column */}
        <div className="text-center mb-12 reveal-on-scroll">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-vinta-blue/10 text-vinta-blue mb-3">
            Join Our Community
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Step Into Something <span className="text-rotaract-blue">Greater</span> — Join the Great West!
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mt-4">
            Looking to make a difference, meet inspiring people, and grow as a leader? 
            The Rotaract Club of Zamboanga City West is more than just a club — we're a family driven by purpose, service, and fun!
          </p>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Benefits */}
          <div className="reveal-on-scroll">
            <Card className="h-full glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-rotaract-blue">
                  As a member, you'll get the chance to:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-white/60 p-3 rounded-lg">
                    <div className="p-2 bg-rotaract-blue/10 rounded-full">
                      {benefit.icon}
                    </div>
                    <span className="my-auto">{benefit.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Membership Requirements */}
          <div className="reveal-on-scroll">
            <Card className="h-full glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-rotaract-blue">
                  Membership Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {membershipRequirements.map((req, index) => (
                  <div key={index} className="glass-card p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-rotaract-blue">{req.title}</h4>
                    <p className="text-sm text-foreground/70 mt-1">{req.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Application Process - Enhanced with better visual hierarchy and animations */}
        <div id="application-process" ref={processRef} className="mb-16 reveal-on-scroll relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-wave-pattern opacity-10 z-0"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block px-5 py-1 bg-gradient-to-r from-rotaract-pink/20 via-vinta-yellow/20 to-rotaract-blue/20 rounded-full mb-4">
                <h3 className="text-2xl font-bold tracking-wide">
                  <span className="bg-gradient-to-r from-vinta-yellow to-rotaract-pink bg-clip-text text-transparent">APPLICATION</span>
                  <span className="text-rotaract-blue"> PROCESS</span>
                </h3>
              </div>
              <p className="text-foreground/80 max-w-xl mx-auto">
                Express your desire and purpose of joining the Greater West
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {membershipLevels.map((level, index) => (
                <div 
                  key={index} 
                  className="reveal-on-scroll" 
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card 
                    className="relative overflow-hidden rounded-xl h-full transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rotaract-pink to-rotaract-blue opacity-90 z-0"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    
                    <CardContent className="relative z-10 p-6 text-white h-full flex flex-col items-center text-center">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-inner">
                        {level.icon}
                      </div>
                      
                      <h4 className="font-bold text-lg mb-2">{level.title}</h4>
                      <p className="text-white/80 text-sm font-medium mb-3">{level.duration}</p>
                      
                      <div className="w-12 h-1 bg-white/30 rounded-full my-3"></div>
                      
                      <p className="text-white/90 mt-2">{level.description}</p>
                      
                      <div className="mt-auto pt-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full">
                          {`Level ${index + 1}`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {[0, 1, 2].map((dot) => (
                  <div 
                    key={dot} 
                    className="w-2 h-2 rounded-full bg-rotaract-blue/50"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA - 1 Column Center - Fixed for mobile */}
        <div className="max-w-2xl mx-auto reveal-on-scroll">
          <Card className="border-2 border-rotaract-blue shadow-xl bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">This is your sign to be part of something impactful.</h3>
              <p className="mb-6 text-lg">Ready to grow, serve, and lead with us?</p>
              <Button 
                asChild
                className="py-2 px-6 bg-rotaract-blue hover:bg-rotaract-blue/90 transition-all duration-300 group rounded-full"
              >
                <a 
                  href="https://forms.gle/Q2JUyN6QeeqQkdFv5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apply for Rotaract Club Membership"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Join Now</span>
                  <Link className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Join;
