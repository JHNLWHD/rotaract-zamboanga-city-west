
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, Users, Award } from 'lucide-react';

const Officers = () => {
  const boardOfDirectors = [
    {
      name: "RTR. Maria Santos",
      position: "President",
      term: "2025-2026",
      responsibilities: "Overall leadership and strategic direction of the club",
      contact: "president@raczambowest.org",
      category: "Executive"
    },
    {
      name: "RTR. John Cruz",
      position: "President-Elect",
      term: "2025-2026",
      responsibilities: "Assists president and prepares for next term leadership",
      contact: "presidentelect@raczambowest.org",
      category: "Executive"
    },
    {
      name: "RTR. Anna Reyes",
      position: "Vice President",
      term: "2025-2026",
      responsibilities: "Supports president and leads special initiatives",
      contact: "vp@raczambowest.org",
      category: "Executive"
    },
    {
      name: "RTR. Carlos Mendoza",
      position: "Secretary",
      term: "2025-2026",
      responsibilities: "Meeting minutes, correspondence, and club documentation",
      contact: "secretary@raczambowest.org",
      category: "Executive"
    },
    {
      name: "RTR. Lisa Garcia",
      position: "Treasurer",
      term: "2025-2026",
      responsibilities: "Financial management, budgeting, and fiscal oversight",
      contact: "treasurer@raczambowest.org",
      category: "Executive"
    }
  ];

  const directors = [
    {
      name: "RTR. Miguel Torres",
      position: "Community Service Director",
      term: "2025-2026",
      responsibilities: "Coordinates community service projects and volunteer activities",
      contact: "service@raczambowest.org",
      category: "Director"
    },
    {
      name: "RTR. Sarah Kim",
      position: "Professional Development Director",
      term: "2025-2026",
      responsibilities: "Organizes career development and skill-building activities",
      contact: "profdev@raczambowest.org",
      category: "Director"
    },
    {
      name: "RTR. David Lopez",
      position: "Club Service Director",
      term: "2025-2026",
      responsibilities: "Internal club activities and member engagement",
      contact: "clubservice@raczambowest.org",
      category: "Director"
    },
    {
      name: "RTR. Jennifer Wang",
      position: "International Service Director",
      term: "2025-2026",
      responsibilities: "Global projects and international partnerships",
      contact: "international@raczambowest.org",
      category: "Director"
    },
    {
      name: "RTR. Mark Johnson",
      position: "Public Relations Director",
      term: "2025-2026",
      responsibilities: "Marketing, communications, and social media management",
      contact: "pr@raczambowest.org",
      category: "Director"
    },
    {
      name: "RTR. Elena Rodriguez",
      position: "Membership Director",
      term: "2025-2026",
      responsibilities: "Recruitment, retention, and new member orientation",
      contact: "membership@raczambowest.org",
      category: "Director"
    }
  ];

  const advisors = [
    {
      name: "ROT. Robert Smith",
      position: "Club Advisor",
      term: "2025-2026",
      responsibilities: "Provides guidance and mentorship to the club",
      contact: "advisor@raczambowest.org",
      category: "Advisor"
    }
  ];

  const allOfficers = [...boardOfDirectors, ...directors, ...advisors];

  const getIcon = (category: string) => {
    switch (category) {
      case 'Executive':
        return <Award className="w-5 h-5 text-rotaract-pink" />;
      case 'Director':
        return <Users className="w-5 h-5 text-rotaract-blue" />;
      case 'Advisor':
        return <Calendar className="w-5 h-5 text-vinta-yellow" />;
      default:
        return <Users className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Executive':
        return 'bg-rotaract-pink/10 text-rotaract-pink border-rotaract-pink/20';
      case 'Director':
        return 'bg-rotaract-blue/10 text-rotaract-blue border-rotaract-blue/20';
      case 'Advisor':
        return 'bg-vinta-yellow/10 text-vinta-yellow border-vinta-yellow/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>Officers & Members - Rotaract Club of Zamboanga City West</title>
        <meta name="description" content="Meet our dedicated officers and members leading the Rotaract Club of Zamboanga City West for Rotary Year 2025-2026." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-rotaract-navy mb-4">
                Officers & Members
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
                Meet the dedicated leaders and members who make our club's mission possible.
              </p>
              <Badge variant="outline" className="text-rotaract-navy border-rotaract-navy">
                Rotary Year 2025-2026
              </Badge>
            </div>

            {/* Board of Directors */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <Award className="w-6 h-6 text-rotaract-pink mr-2" />
                <h2 className="text-2xl font-bold text-rotaract-navy">
                  Board of Directors
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {boardOfDirectors.map((officer, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-rotaract-pink">
                    <CardHeader>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-rotaract-pink/10 rounded-full flex items-center justify-center">
                          {getIcon(officer.category)}
                        </div>
                        <CardTitle className="text-lg text-rotaract-navy mb-1">{officer.name}</CardTitle>
                        <p className="text-sm font-medium text-gray-700 mb-2">{officer.position}</p>
                        <Badge className={getCategoryColor(officer.category)}>
                          {officer.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-600">{officer.responsibilities}</p>
                        <div className="flex items-center text-gray-500">
                          <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-xs break-all">{officer.contact}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-xs">{officer.term}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Directors */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <Users className="w-6 h-6 text-rotaract-blue mr-2" />
                <h2 className="text-2xl font-bold text-rotaract-navy">
                  Directors
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {directors.map((officer, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-rotaract-blue">
                    <CardHeader>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-rotaract-blue/10 rounded-full flex items-center justify-center">
                          {getIcon(officer.category)}
                        </div>
                        <CardTitle className="text-lg text-rotaract-navy mb-1">{officer.name}</CardTitle>
                        <p className="text-sm font-medium text-gray-700 mb-2">{officer.position}</p>
                        <Badge className={getCategoryColor(officer.category)}>
                          {officer.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-600">{officer.responsibilities}</p>
                        <div className="flex items-center text-gray-500">
                          <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-xs break-all">{officer.contact}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-xs">{officer.term}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Advisors */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <Calendar className="w-6 h-6 text-vinta-yellow mr-2" />
                <h2 className="text-2xl font-bold text-rotaract-navy">
                  Club Advisor
                </h2>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  {advisors.map((officer, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-vinta-yellow">
                      <CardHeader>
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-vinta-yellow/10 rounded-full flex items-center justify-center">
                            {getIcon(officer.category)}
                          </div>
                          <CardTitle className="text-lg text-rotaract-navy mb-1">{officer.name}</CardTitle>
                          <p className="text-sm font-medium text-gray-700 mb-2">{officer.position}</p>
                          <Badge className={getCategoryColor(officer.category)}>
                            {officer.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <p className="text-gray-600">{officer.responsibilities}</p>
                          <div className="flex items-center text-gray-500">
                            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-xs break-all">{officer.contact}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-xs">{officer.term}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-rotaract-blue/5 to-rotaract-pink/5 rounded-lg p-8 border border-rotaract-blue/10">
              <h3 className="text-xl font-bold text-rotaract-navy mb-4">
                Join Our Team
              </h3>
              <p className="text-gray-600 mb-6">
                We're always looking for passionate individuals to join our club and make a difference in our community.
              </p>
              <a 
                href="#join" 
                className="inline-block bg-rotaract-pink text-white px-6 py-3 rounded-lg font-medium hover:bg-rotaract-pink/90 transition-colors"
              >
                Learn How to Join
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Officers;
