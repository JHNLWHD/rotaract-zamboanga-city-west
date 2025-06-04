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
      name: "Pres. Hash Ibrahim",
      position: "President",
      term: "2025-2026",
      responsibilities: "Overall leadership and strategic direction of the club",
      category: "Executive"
    },
    {
      name: "PE Darylle Sanghanan",
      position: "President-Elect / Vice President",
      term: "2025-2026",
      responsibilities: "Assists president and prepares for next term leadership",
      category: "Executive"
    },
    {
      name: "Cris Barredo",
      position: "Secretary",
      term: "2025-2026",
      responsibilities: "Meeting minutes, correspondence, and club documentation",
      category: "Executive"
    },
    {
      name: "Yves Abduhasad",
      position: "Assistant Secretary",
      term: "2025-2026",
      responsibilities: "Assists the Secretary in documentation and correspondence",
      category: "Executive"
    },
    {
      name: "Angelica Simbajon",
      position: "Finance Director",
      term: "2025-2026",
      responsibilities: "Financial management, budgeting, and fiscal oversight",
      category: "Executive"
    },
    {
      name: "Jessa Dello",
      position: "Assistant Finance Director",
      term: "2025-2026",
      responsibilities: "Assists the Finance Director in financial matters",
      category: "Executive"
    }
  ];

  const directors = [
    {
      name: "PDRR Remo Varquez",
      position: "Membership Chair",
      term: "2025-2026",
      responsibilities: "Recruitment, retention, and new member orientation",
      category: "Director"
    },
    {
      name: "Al-Jhoenil Wahid",
      position: "Assistant Membership Chair",
      term: "2025-2026",
      responsibilities: "Assists the Membership Chair in recruitment and retention",
      category: "Director"
    },
    {
      name: "Precious Carrillo",
      position: "Community Service Director",
      term: "2025-2026",
      responsibilities: "Coordinates community service projects and volunteer activities",
      category: "Director"
    },
    {
      name: "Xander Depositario",
      position: "Assistant Community Service Director",
      term: "2025-2026",
      responsibilities: "Assists the Community Service Director in projects",
      category: "Director"
    },
    {
      name: "Aldwin",
      position: "Assistant Community Service Director",
      term: "2025-2026",
      responsibilities: "Assists the Community Service Director in projects",
      category: "Director"
    },
    {
      name: "Lanelle Bañez",
      position: "Public Image Director",
      term: "2025-2026",
      responsibilities: "Marketing, communications, and social media management",
      category: "Director"
    },
    {
      name: "Remo Varques",
      position: "Club Service Director",
      term: "2025-2026",
      responsibilities: "Internal club activities and member engagement",
      category: "Director"
    },
    {
      name: "Sarah Saavedra",
      position: "Assistant Club Service Director",
      term: "2025-2026",
      responsibilities: "Assists the Club Service Director in member engagement",
      category: "Director"
    },
    {
      name: "Francis Roble",
      position: "Professional Service Director",
      term: "2025-2026",
      responsibilities: "Organizes career development and skill-building activities",
      category: "Director"
    },
    {
      name: "Benzar Kasan",
      position: "Assistant Professional Service Director",
      term: "2025-2026",
      responsibilities: "Assists the Professional Service Director in activities",
      category: "Director"
    },
    {
      name: "IPP Mark Item",
      position: "International Service Director",
      term: "2025-2026",
      responsibilities: "Global projects and international partnerships",
      category: "Director"
    },
    {
      name: "PP April Sultan",
      position: "Assistant International Service Director",
      term: "2025-2026",
      responsibilities: "Assists the International Service Director in global projects",
      category: "Director"
    },
    {
      name: "Catherine Lojera",
      position: "TRF Director",
      term: "2025-2026",
      responsibilities: "Leads The Rotary Foundation initiatives",
      category: "Director"
    },
    {
      name: "Jason Justin Lim",
      position: "Assistant TRF Director",
      term: "2025-2026",
      responsibilities: "Assists the TRF Director in foundation initiatives",
      category: "Director"
    }
  ];

  const advisors = [
    {
      name: "Arwald Candido",
      position: "Rotaract Club Adviser",
      term: "2025-2026",
      responsibilities: "Provides guidance and mentorship to the club",
      category: "Advisor"
    },
    {
      name: "PDRR Nick Paira",
      position: "Rotaract Learning Facilitator",
      term: "2025-2026",
      responsibilities: "Facilitates learning and development for club members",
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
                  Club Advisors
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                {advisors.map((officer, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-vinta-yellow">
                    <CardHeader>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-vinta-yellow/10 rounded-full flex items-center justify-center">
                          {getIcon('Advisor')}
                        </div>
                        <CardTitle className="text-lg text-rotaract-navy mb-1">
                          {officer.name}
                        </CardTitle>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          {officer.position}
                        </p>
                        <Badge className={getCategoryColor('Advisor')}>
                          Advisor
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-600">{officer.responsibilities}</p>
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
