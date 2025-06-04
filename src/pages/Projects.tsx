
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Community Clean-Up Drive",
      description: "Monthly environmental initiative to clean local beaches and parks in Zamboanga City.",
      status: "Ongoing",
      date: "Every 3rd Saturday",
      location: "Various locations",
      participants: "25-30 volunteers"
    },
    {
      title: "Educational Scholarship Program",
      description: "Providing educational assistance to underprivileged students in our community.",
      status: "Active",
      date: "Year-round",
      location: "Local schools",
      participants: "50+ beneficiaries"
    },
    {
      title: "Health and Wellness Seminar",
      description: "Free health check-ups and wellness education for community members.",
      status: "Quarterly",
      date: "Next: March 2024",
      location: "Community Centers",
      participants: "100+ attendees"
    },
    {
      title: "Youth Leadership Training",
      description: "Developing leadership skills among young people in our community.",
      status: "Upcoming",
      date: "April 2024",
      location: "Rotaract Center",
      participants: "30 participants"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Projects - Rotaract Club of Zamboanga City West</title>
        <meta name="description" content="Discover our community service projects and initiatives making a positive impact in Zamboanga City." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-rotaract-navy mb-4">
                Our Projects
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Making a difference in our community through meaningful service projects and initiatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-rotaract-navy">{project.title}</CardTitle>
                      <Badge variant={project.status === 'Ongoing' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-rotaract-pink" />
                        {project.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-rotaract-pink" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-rotaract-pink" />
                        {project.participants}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
