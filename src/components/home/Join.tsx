import React, { useEffect, useRef } from 'react';
import {
  User,
  Heart,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  Clock,
  Trophy
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Join = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  // Google Form URL for membership application
  const MEMBERSHIP_APPLICATION_FORM = "https://forms.gle/Q2JUyN6QeeqQkdFv5";

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

  const membershipLevels = [
    {
      icon: <User className="h-6 w-6 text-cranberry-600" />,
      title: "Volunteer Member Level",
      duration: "1-6 months",
      description: "New members will engage in volunteer activities"
    },
    {
      icon: <Heart className="h-6 w-6 text-cranberry-600" />,
      title: "Advocate Member Level",
      duration: "6-12 months",
      description: "Deeper involvement through advocacy and continued commitment"
    },
    {
      icon: <Star className="h-6 w-6 text-cranberry-600" />,
      title: "Great West Member Level",
      duration: "Official Member (Inducted)",
      description: "Reward for significant contributions and embodying organizational values"
    }
  ];

  const benefits = [
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "Leadership Development",
      description: "Build essential leadership skills through hands-on experience"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Global Network",
      description: "Connect with 200,000+ Rotaractors worldwide"
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Community Impact",
      description: "Make a meaningful difference in local communities"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Professional Growth",
      description: "Enhance your career through skills and networking"
    }
  ];

  const requirements = [
    "Age 18-30 years old",
    "Passion for community service",
    "Commitment to fellowship and leadership",
    "Ability to participate in monthly meetings",
    "Willingness to contribute to projects"
  ];

  return (
    <section
      id="join"
      ref={sectionRef}
      className="section-container relative overflow-hidden bg-gradient-to-br from-cranberry-50 via-white to-pink-50"
    >
      {/* Modern background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-cranberry-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-32 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="reveal-on-scroll mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cranberry-100 text-cranberry-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Join Our Community
            </span>
          </div>

          <h2 className="text-section-title text-slate-900 reveal-on-scroll mb-6">
            Start Your <span className="text-gradient">Leadership</span>
            <br />Journey with the <span className="text-gradient">Great West</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto reveal-on-scroll leading-relaxed">
            Become part of a dynamic community of young leaders committed to making a positive impact in Zamboanga City and beyond.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="modern-card p-6 text-center hover-lift reveal-on-scroll group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-3 bg-cranberry-100 rounded-xl text-cranberry-600 w-fit mx-auto mb-4 group-hover:bg-cranberry-600 group-hover:text-white transition-colors">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left side - Requirements */}
          <div className="reveal-on-scroll">
            <div className="modern-card p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-cranberry-100 rounded-xl text-cranberry-600 mr-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Membership Requirements</h3>
              </div>

              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-cranberry-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Process */}
          <div className="reveal-on-scroll">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Your Journey to <span className="text-cranberry-600">Membership</span>
            </h3>

            <div className="space-y-6">
              {membershipLevels.map((level, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-cranberry-100 rounded-xl flex items-center justify-center">
                      {level.icon}
                    </div>
                    {index < membershipLevels.length - 1 && (
                      <div className="w-0.5 h-12 bg-cranberry-200 mx-auto mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-slate-900">{level.title}</h4>
                      <span className="px-2 py-1 bg-cranberry-100 text-cranberry-700 text-xs rounded-full">
                        {level.duration}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center reveal-on-scroll">
          <div className="modern-card p-12 bg-gradient-to-r from-cranberry-600 to-cranberry-500 text-white">
            <h3 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h3>
            <p className="text-cranberry-100 text-lg mb-8 max-w-2xl mx-auto">
              Join fellow young leaders of the Great West who are passionate about creating positive change in our community and around the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={MEMBERSHIP_APPLICATION_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-cranberry-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl inline-flex items-center"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href="https://www.facebook.com/RotaractClubZamboWest"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-cranberry-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
