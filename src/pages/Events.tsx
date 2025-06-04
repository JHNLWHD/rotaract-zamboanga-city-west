
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      title: "Monthly General Assembly",
      description: "Regular meeting to discuss upcoming projects and club business.",
      date: "March 15, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center Hall",
      type: "Meeting",
      attendees: "All members"
    },
    {
      title: "Beach Clean-Up Drive",
      description: "Environmental service project at Sta. Cruz Island Beach.",
      date: "March 22, 2024",
      time: "7:00 AM - 12:00 PM",
      location: "Sta. Cruz Island, Zamboanga City",
      type: "Service Project",
      attendees: "Open to public"
    },
    {
      title: "Professional Development Workshop",
      description: "Leadership skills and career development workshop for young professionals.",
      date: "April 5, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Business District Conference Room",
      type: "Workshop",
      attendees: "Members + Guests"
    }
  ];

  const pastEvents = [
    {
      title: "Christmas Gift Giving",
      description: "Annual gift distribution to underprivileged children in the community.",
      date: "December 20, 2023",
      type: "Community Service",
      impact: "100+ children benefited"
    },
    {
      title: "Blood Donation Drive",
      description: "Partnership with local hospitals for voluntary blood donation.",
      date: "November 15, 2023",
      type: "Health Initiative",
      impact: "50 blood bags collected"
    },
    {
      title: "Youth Leadership Summit",
      description: "Inter-club summit focusing on youth empowerment and leadership.",
      date: "October 10, 2023",
      type: "Leadership",
      impact: "80 young leaders attended"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Events - Rotaract Club of Zamboanga City West</title>
        <meta name="description" content="Stay updated with our upcoming events and see highlights from our past activities and community service projects." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-rotaract-navy mb-4">
                Events
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join us in our upcoming events and see how we're making a difference in our community.
              </p>
            </div>

            {/* Upcoming Events */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-rotaract-navy mb-8">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-rotaract-pink">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl text-rotaract-navy">{event.title}</CardTitle>
                        <Badge variant="default">{event.type}</Badge>
                      </div>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-rotaract-pink" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-rotaract-pink" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-rotaract-pink" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-rotaract-pink" />
                          {event.attendees}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Past Events */}
            <section>
              <h2 className="text-3xl font-bold text-rotaract-navy mb-8">Recent Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-gray-50">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg text-rotaract-navy">{event.title}</CardTitle>
                        <Badge variant="secondary">{event.type}</Badge>
                      </div>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-rotaract-pink" />
                          {event.date}
                        </div>
                        <div className="text-sm font-medium text-rotaract-pink">
                          Impact: {event.impact}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Events;
