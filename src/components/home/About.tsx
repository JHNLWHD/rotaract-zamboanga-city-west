import React, { useEffect, useRef } from 'react';
import { Users, Globe, Handshake, Award, Heart, Zap, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { fetchAboutCommunity } from '../../hooks/landing-page/aboutCommunity'; 
import { useQuery } from '@tanstack/react-query';  

const iconMap = {
  Award,
  Users,
  Globe,
  Heart,
  Zap,
  Handshake,
  Sparkles
};

const DynamicIcon = ({ iconName, className = "h-5 w-5" }: { iconName: string; className?: string }) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Award; // Default to Award
  return <IconComponent className={className} />;
};

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
              }, 100 * i);
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

  const {data, isLoading, isError } = useQuery({
    queryKey: ['aboutContent'], 
    queryFn: () => fetchAboutCommunity(), 
  });  

  const valueCards = [
    {
      icon: <Users className="h-8 w-8 text-cranberry-600" aria-hidden="true" />,
      title: "Fellowship",
      description: "Building lasting friendships and connections among diverse young leaders.",
      gradient: "from-cranberry-50 to-cranberry-100/50"
    },
    {
      icon: <Heart className="h-8 w-8 text-cranberry-500" aria-hidden="true" />,
      title: "Service",
      description: "Addressing community needs through impactful humanitarian projects.",
      gradient: "from-pink-50 to-cranberry-50"
    },
    {
      icon: <Zap className="h-8 w-8 text-cranberry-700" aria-hidden="true" />,
      title: "Leadership",
      description: "Developing professional skills and ethical leadership qualities.",
      gradient: "from-purple-50 to-cranberry-100/30"
    }
  ];

  const achievements = [
    { number: "14+", label: "Years of Impact", icon: <Award className="h-5 w-5" /> },
    { number: "50+", label: "Active Members", icon: <Users className="h-5 w-5" /> },
    { number: "100+", label: "Projects Completed", icon: <Globe className="h-5 w-5" /> },
    { number: "5000+", label: "Lives Touched", icon: <Heart className="h-5 w-5" /> }
  ];

  const fallbackAchievements = [
    { number: "14+", label: "Years of Impact", iconName: "Award" },
    { number: "50+", label: "Active Members", iconName: "Users" },
    { number: "100+", label: "Projects Completed", iconName: "Globe" },
    { number: "5000+", label: "Lives Touched", iconName: "Heart" }
  ];

  // Use Contentful data if available, otherwise use fallbackfallbackAchievements;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cranberry-50/30"
      aria-labelledby="about-heading"
    >
      {/* Modern geometric background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-cranberry-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-cranberry-300/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="reveal-on-scroll">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-100 text-cranberry-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              About Our Community
            </span>
          </div>

          <h2 id="about-heading" className="text-section-title text-slate-900 reveal-on-scroll mb-6">
            Driven by <span className="text-gradient">Purpose</span>,
            <br />United by <span className="text-gradient">Impact</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            The Rotaract Club of Zamboanga City West exemplifies the principles of hope and transformation,
            where passionate young leaders come together to create meaningful change in our community.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left side - Image and stats */}
          <div className="reveal-on-scroll">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-modern-xl">
                <img
                  src={data?.aboutImage?.url || "/lovable-uploads/77e591d9-27b0-4497-b290-8fa95806ace4.png"}
                  alt={data?.aboutImage?.description || "Rotaract Club of Zamboanga City West members gathered for a community event"}
                  className="w-full h-auto"
                  loading="lazy"
                  width="500"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cranberry-900/20 to-transparent"></div>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-modern-lg p-6 border border-cranberry-100/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cranberry-100 rounded-xl">
                    <Award className="h-6 w-6 text-cranberry-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">  {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.sideInformation.number} </div>
                    <div className="text-sm text-slate-500"> {isLoading ? 'Loading...' : isError ? 'Error loading content' : data?.sideInformation.description} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="reveal-on-scroll">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Our <span className="text-cranberry-600">Story</span>
              </h3>

              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed text-justify">
                <Markdown
                  components={{
                    p: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
                    em: ({ children }) => <em className="text-cranberry-600 font-semibold not-italic">{children}</em>
                  }}
                >
                  {`Since 2010, the Rotaract Club of Zamboanga City West has brought together young Zamboangueño professionals who are passionate about creating positive change. We celebrate our local culture and heritage while working together to build a better future for our city and the nation. \n\n Chartered under Rotary International District 3850 and sponsored by the Rotary Club of Zamboanga City West, we are driven by our motto "*Fellowship Through Service*." By taking part in creative service projects, professional development programs, and meaningful connections, we continually build our skills and deepen the bonds that unite us through *"Service Above Self."*`}
                </Markdown>
              </div>
            </div>

            {/* Dynamic metrics */} 
            {!isLoading && !isError && data?.aboutCommunityBoxes && data.aboutCommunityBoxes.length > 0 && (
              <div className={`grid ${data.aboutCommunityBoxes.length === 2 ? 'grid-cols-2' : data.aboutCommunityBoxes.length >= 4 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 reveal-on-scroll`}>
                {data.aboutCommunityBoxes.map((achievement, index) => (
                  <div
                    key={index}
                    className="modern-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-cranberry-100 rounded-lg text-cranberry-600 group-hover:bg-cranberry-600 group-hover:text-white transition-colors">
                        <DynamicIcon iconName={achievement.iconName || "Award"} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{achievement.number}</div>
                    <div className="text-sm text-slate-500">{achievement.description}</div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
