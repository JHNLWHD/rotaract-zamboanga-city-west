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

  const getPositionIcon = (category: string) => {
    switch (category) {
      case 'Executive':
        return <Award className="w-5 h-5 text-cranberry-600" />;
      case 'Director':
        return <Users className="w-5 h-5 text-cranberry-500" />;
      default:
        return <Users className="w-5 h-5 text-cranberry-400" />;
    }
  };

  const getPositionColor = (category: string) => {
    switch (category) {
      case 'Executive':
        return 'bg-cranberry-100 text-cranberry-700 border-cranberry-200';
      case 'Director':
        return 'bg-cranberry-50 text-cranberry-600 border-cranberry-100';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const executiveBoard = allOfficers.filter(officer => officer.category === 'Executive');
  const currentDirectors = allOfficers.filter(officer => officer.category === 'Director');
  const advisorsList = allOfficers.filter(officer => officer.category === 'Advisor');

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Great West Leadership Team & Officers - Rotaract Club of Zamboanga City West</title>
        <meta name="title" content="Great West Leadership Team & Officers - Rotaract Club of Zamboanga City West" />
        <meta name="description" content="Meet the dedicated Great West leadership team driving positive change in Zamboanga City. Learn about our Executive Board, Directors, and Advisors for 2025-2026 who embody our values of fellowship, service, and leadership." />
        <meta name="keywords" content="Rotaract officers Zamboanga City West, Great West leadership team, club president, directors, advisors, Rotaract board members, youth leadership Philippines, club officers 2025-2026" />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rotaract.rotaryzcwest.org/officers" />
        <meta property="og:title" content="Great West Leadership Team & Officers - Rotaract Club of Zamboanga City West" />
        <meta property="og:description" content="Meet the dedicated Great West leadership team driving positive change in Zamboanga City. Learn about our Executive Board, Directors, and Advisors for 2025-2026 who embody our values of fellowship, service, and leadership." />
        <meta property="og:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta property="og:image:alt" content="Great West Leadership Team - Rotaract Club of Zamboanga City West" />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        <meta property="og:locale" content="en_PH" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@RotaractZCWest" />
        <meta property="twitter:creator" content="@RotaractZCWest" />
        <meta property="twitter:url" content="https://rotaract.rotaryzcwest.org/officers" />
        <meta property="twitter:title" content="Great West Leadership Team & Officers - Rotaract Club of Zamboanga City West" />
        <meta property="twitter:description" content="Meet the dedicated Great West leadership team driving positive change in Zamboanga City. Learn about our Executive Board, Directors, and Advisors for 2025-2026 who embody our values of fellowship, service, and leadership." />
        <meta property="twitter:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta property="twitter:image:alt" content="Great West Leadership Team - Rotaract Club of Zamboanga City West" />
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/officers" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Enhanced Structured Data for Officers */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rotaract Club of Zamboanga City West",
            "alternateName": "Great West",
            "url": "https://rotaract.rotaryzcwest.org",
            "employee": allOfficers.map(officer => ({
              "@type": "Person",
              "name": officer.name,
              "jobTitle": officer.position,
              "worksFor": {
                "@type": "Organization",
                "name": "Rotaract Club of Zamboanga City West",
                "alternateName": "Great West"
              },
              "description": officer.responsibilities
            })),
            "department": [
              {
                "@type": "Organization",
                "name": "Executive Board",
                "description": "Senior leadership team of the Rotaract Club"
              },
              {
                "@type": "Organization", 
                "name": "Board of Directors",
                "description": "Directors responsible for specific areas of focus"
              },
              {
                "@type": "Organization",
                "name": "Club Advisors",
                "description": "Experienced advisors providing guidance and support"
              }
            ]
          })}
        </script>
        
        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://rotaract.rotaryzcwest.org"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Great West Leadership",
                "item": "https://rotaract.rotaryzcwest.org/officers"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-cranberry-50 via-white to-pink-50 pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Our <span className="text-gradient">Leadership</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-2">
                Meet the dedicated leaders and members who make our club's mission possible.
              </p>
              <Badge variant="outline" className="text-slate-700 border-slate-300 mt-4">
                Rotary Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}
              </Badge>
            </div>

            {/* Executive Board */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center bg-gradient-to-r from-cranberry-100 to-pink-100 px-6 py-3 rounded-full border border-cranberry-200">
                  <Award className="w-6 h-6 text-cranberry-600 mr-3" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Executive Board
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {executiveBoard.map((officer, index) => (
                  <Card key={index} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cranberry-500/5 via-transparent to-pink-500/5"></div>
                    <CardContent className="relative p-8 text-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cranberry-500 to-cranberry-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">★</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cranberry-700 transition-colors">
                        {officer.name}
                      </CardTitle>
                      <p className="text-cranberry-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                        {officer.position}
                      </p>
                      <div className="bg-gradient-to-r from-cranberry-50 to-pink-50 rounded-xl p-4 border border-cranberry-100">
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                          {officer.responsibilities}
                        </p>
                        <div className="flex items-center justify-center space-x-3 text-xs text-slate-500">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{officer.term}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Board of Directors */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center bg-gradient-to-r from-cranberry-50 to-pink-50 px-6 py-3 rounded-full border border-cranberry-100">
                  <Users className="w-6 h-6 text-cranberry-500 mr-3" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Board of Directors
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentDirectors.map((officer, index) => (
                  <Card key={index} className="group bg-white/70 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cranberry-400/3 via-transparent to-pink-400/3"></div>
                    <CardContent className="relative p-6 text-center">
                      <div className="relative mb-5">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cranberry-400 to-cranberry-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cranberry-600 transition-colors leading-tight">
                        {officer.name}
                      </CardTitle>
                      <p className="text-cranberry-500 font-medium mb-3 text-xs uppercase tracking-wide">
                        {officer.position}
                      </p>
                      <div className="bg-white/50 rounded-lg p-3 border border-gray-100">
                        <p className="text-slate-600 text-xs leading-relaxed mb-2">
                          {officer.responsibilities}
                        </p>
                        <div className="flex items-center justify-center text-xs text-slate-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{officer.term}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Advisors */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-to-r from-slate-100 to-gray-100 px-6 py-3 rounded-full border border-slate-200">
                  <Users className="w-6 h-6 text-slate-600 mr-3" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Club Advisors
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {advisorsList.map((officer, index) => (
                  <Card key={index} className="group bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-gray-400/5"></div>
                    <CardContent className="relative p-8 text-center">
                      <div className="relative mb-6">
                        <div className="w-18 h-18 mx-auto bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">★</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                        {officer.name}
                      </CardTitle>
                      <p className="text-slate-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                        {officer.position}
                      </p>
                      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                          {officer.responsibilities}
                        </p>
                        <div className="flex items-center justify-center text-xs text-slate-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{officer.term}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Great West Past Presidents */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <Award className="w-6 h-6 text-amber-600 mr-2" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Great West Past Presidents
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-cranberry-100 p-8">
                <div className="max-w-2xl mx-auto space-y-3">
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2009-2010</span>
                    <span className="text-slate-900">Hermie Duterte</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2010-2011</span>
                    <span className="text-slate-900">Wenceslao Medina</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2011-2012</span>
                    <span className="text-slate-900">Aldimin Kalli</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2012-2013</span>
                    <span className="text-slate-900">Bryan Callao</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2013-2014</span>
                    <span className="text-slate-900">Deminic Bontia</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2014-2015</span>
                    <span className="text-slate-900">Philip Vega</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2015-2016</span>
                    <span className="text-slate-900">Edilwaleed Hairon</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2016-2017</span>
                    <span className="text-slate-900">O'neil Nick Paira</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2017-2018</span>
                    <span className="text-slate-900">Kevin Simbajon</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2018-2019</span>
                    <span className="text-slate-900">Arwald Candido</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2019-2020</span>
                    <span className="text-slate-900">April May Sultan</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2020-2021</span>
                    <span className="text-slate-900">Kayenne Delos Reyes</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2021-2022</span>
                    <span className="text-slate-900">Remo Japus Varquez</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2022-2023</span>
                    <span className="text-slate-900">Ernan Natividad</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2023-2024</span>
                    <span className="text-slate-900">Ma. Theresa Lanelle Bañez</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2024-2025</span>
                    <span className="text-slate-900">Mark Vincent Faith Item</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2025-2026</span>
                    <div className="text-right">
                      <span className="text-slate-900 font-semibold">Hazra Ibrahim</span>
                      <span className="block text-xs text-cranberry-600 mt-1">Current President</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100">
                    <span className="font-medium text-slate-700">2026-2027</span>
                    <div className="text-right">
                      <span className="text-slate-900 font-semibold">Darylle Sanghanan</span>
                      <span className="block text-xs text-blue-600 mt-1">President-Elect</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors">
                    <span className="font-medium text-slate-700">2027-2028</span>
                    <div className="text-right">
                      <span className="text-slate-900 font-semibold">Criseline Barredo</span>
                      <span className="block text-xs text-green-600 mt-1">Future President</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    Honoring the legacy of leadership that has shaped our club since 2009
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Officers;
