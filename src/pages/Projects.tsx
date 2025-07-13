import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Button } from '../components/ui/button';

const Projects = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Community Projects & Impact - Rotaract Club of Zamboanga City West</title>
        <meta name="title" content="Community Projects & Impact - Rotaract Club of Zamboanga City West" />
        <meta name="description" content="Discover our award-winning community service projects including hydroponics farming, mangrove conservation, education support, and health initiatives transforming lives in Zamboanga City." />
        <meta name="keywords" content="community projects, Zamboanga City, hydroponics farming, mangrove conservation, education support, health initiatives, community service, Rotaract projects, Philippines" />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rotaract.rotaryzcwest.org/projects" />
        <meta property="og:title" content="Community Projects & Impact - Rotaract Club of Zamboanga City West" />
        <meta property="og:description" content="Discover our award-winning community service projects including hydroponics farming, mangrove conservation, education support, and health initiatives transforming lives in Zamboanga City." />
        <meta property="og:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rotaract.rotaryzcwest.org/projects" />
        <meta property="twitter:title" content="Community Projects & Impact - Rotaract Club of Zamboanga City West" />
        <meta property="twitter:description" content="Discover our award-winning community service projects including hydroponics farming, mangrove conservation, education support, and health initiatives transforming lives in Zamboanga City." />
        <meta property="twitter:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/projects" />
        
        {/* Structured Data for Projects */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Community Projects",
            "description": "Award-winning community service projects making positive impact in Zamboanga City",
            "url": "https://rotaract.rotaryzcwest.org/projects",
            "publisher": {
              "@type": "Organization",
              "name": "Rotaract Club of Zamboanga City West",
              "url": "https://rotaract.rotaryzcwest.org"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": projects.map((project, index) => ({
                "@type": "Project",
                "position": index + 1,
                "name": project.title,
                "description": project.description,
                "location": {
                  "@type": "Place",
                  "name": project.venue
                },
                "startDate": project.date,
                "organizer": {
                  "@type": "Organization",
                  "name": "Rotaract Club of Zamboanga City West"
                }
              }))
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-cranberry-50 via-white to-pink-50 pt-20">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Our Community <span className="text-gradient">Impact</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
                Transforming lives through innovative community service projects that address real needs and create lasting change in Zamboanga City and beyond.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cranberry-100">
                  <span className="font-semibold text-cranberry-700">1,820+</span>
                  <span className="text-slate-600 ml-1">Lives Impacted</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cranberry-100">
                  <span className="font-semibold text-cranberry-700">15+</span>
                  <span className="text-slate-600 ml-1">Partner Organizations</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cranberry-100">
                  <span className="font-semibold text-cranberry-700">Award-Winning</span>
                  <span className="text-slate-600 ml-1">Projects</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((project, index) => (
                <article key={project.id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={`${project.title} - Community service project in ${project.venue} benefiting ${project.beneficiaries || 'multiple'} people`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <header>
                      <CardTitle 
                        className="text-xl text-slate-900 mb-3 group-hover:text-cranberry-700 transition-colors cursor-pointer" 
                        itemProp="name"
                        onClick={() => navigate(`/projects/${project.slug}`)}
                      >
                        {project.title}
                      </CardTitle>
                    </header>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed" itemProp="description">
                      {project.shortDescription}
                    </p>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center text-slate-700">
                        <Calendar className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
                        <span>{new Date(project.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-slate-700">
                        <MapPin className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
                        <span className="line-clamp-1">{project.venue}</span>
                      </div>
                      {project.beneficiaries && (
                        <div className="flex items-center text-slate-700">
                          <Users className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
                          <span>{project.beneficiaries} beneficiaries</span>
                        </div>
                      )}
                    </div>

                    {project.impact && (
                      <div className="bg-gradient-to-r from-cranberry-50 to-pink-50 rounded-lg p-3 mb-4 border border-cranberry-100">
                        <h4 className="text-xs font-semibold text-cranberry-700 mb-1 uppercase tracking-wide">Impact</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{project.impact}</p>
                      </div>
                    )}

                    {project.partners && project.partners.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">Partners</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.partners.slice(0, 2).map((partner, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs px-2 py-1 border-cranberry-200 text-cranberry-600">
                              {partner}
                            </Badge>
                          ))}
                          {project.partners.length > 2 && (
                            <Badge variant="outline" className="text-xs px-2 py-1 border-slate-200 text-slate-500">
                              +{project.partners.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {project.hashtags && project.hashtags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.hashtags.map((hashtag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs px-2 py-1 border-blue-200 text-blue-600">
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200 mt-auto">
                      <Button 
                        onClick={() => navigate(`/projects/${project.slug}`)}
                        className="block w-full bg-gradient-to-r from-cranberry-600 to-cranberry-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-cranberry-700 hover:to-cranberry-800 transition-all duration-300 group-hover:shadow-lg text-center"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </article>
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
