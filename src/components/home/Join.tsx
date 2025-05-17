
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
      icon: <Users className="h-8 w-8 text-rotaract-blue" />,
      duration: "Duration: 1-6 months",
      description: "New members will engage in volunteer activities"
    },
    {
      title: "ADVOCATE MEMBER LEVEL",
      icon: <Handshake className="h-8 w-8 text-rotaract-blue" />,
      duration: "Duration: 6-12 months",
      description: "Deeper involvement through advocacy and continued commitment"
    },
    {
      title: "GREAT WEST MEMBER LEVEL",
      icon: <Award className="h-8 w-8 text-rotaract-blue" />,
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
        
        {/* Application Process - Minimalist version */}
        <div id="application-process" ref={processRef} className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-rotaract-blue">APPLICATION</span> PROCESS
            </h3>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Membership levels in your journey with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {membershipLevels.map((level, index) => (
              <div key={index} className="reveal-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <Card className="h-full hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-rotaract-blue/10 rounded-full mb-4">
                        {level.icon}
                      </div>
                      <h4 className="font-semibold mb-1">{level.title}</h4>
                      <p className="text-sm text-foreground/70 mb-3">{level.duration}</p>
                      <div className="w-12 h-0.5 bg-rotaract-blue/30 rounded-full my-3"></div>
                      <p className="text-sm">{level.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA - 1 Column Center */}
        <div className="max-w-2xl mx-auto reveal-on-scroll">
          <Card className="border border-rotaract-blue/20 shadow-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Ready to join us?</h3>
              <p className="mb-4 text-foreground/70">Be part of something impactful</p>
              <Button 
                asChild
                className="py-2 px-6 bg-rotaract-blue hover:bg-rotaract-blue/90 transition-all"
              >
                <a 
                  href="https://forms.gle/Q2JUyN6QeeqQkdFv5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apply for Rotaract Club Membership"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Apply Now</span>
                  <Link className="h-4 w-4" />
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
