
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar } from 'lucide-react';

const Officers = () => {
  const officers = [
    {
      name: "President",
      position: "Club President",
      term: "2023-2024",
      responsibilities: "Overall leadership and direction of the club",
      contact: "president@raczambowest.org"
    },
    {
      name: "Vice President",
      position: "Vice President",
      term: "2023-2024",
      responsibilities: "Assists president and leads special projects",
      contact: "vp@raczambowest.org"
    },
    {
      name: "Secretary",
      position: "Club Secretary",
      term: "2023-2024",
      responsibilities: "Meeting minutes and club documentation",
      contact: "secretary@raczambowest.org"
    },
    {
      name: "Treasurer",
      position: "Club Treasurer",
      term: "2023-2024",
      responsibilities: "Financial management and budget oversight",
      contact: "treasurer@raczambowest.org"
    },
    {
      name: "Community Service Director",
      position: "Community Service Director",
      term: "2023-2024",
      responsibilities: "Coordinates community service projects",
      contact: "service@raczambowest.org"
    },
    {
      name: "Professional Development Director",
      position: "Professional Development Director",
      term: "2023-2024",
      responsibilities: "Organizes professional development activities",
      contact: "profdev@raczambowest.org"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Officers & Members - Rotaract Club of Zamboanga City West</title>
        <meta name="description" content="Meet our dedicated officers and members leading the Rotaract Club of Zamboanga City West." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-rotaract-navy mb-4">
                Officers & Members
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated leaders and members who make our club's mission possible.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-rotaract-navy mb-8 text-center">
                Board of Officers 2023-2024
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {officers.map((officer, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-rotaract-pink/10 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-rotaract-pink">
                            {officer.position.split(' ').map(word => word[0]).join('')}
                          </span>
                        </div>
                        <CardTitle className="text-lg text-rotaract-navy">{officer.position}</CardTitle>
                        <Badge variant="secondary" className="mt-2">{officer.term}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-600">{officer.responsibilities}</p>
                        <div className="flex items-center text-gray-500">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-xs">{officer.contact}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center bg-gray-50 rounded-lg p-8">
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
