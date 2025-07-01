import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Bida el Comunidad",
      description: "A 2-in-1 partnership project with RAC Makati featuring Project BTS (Beware the Snake) educational sessions for children about personal safety and the Gardenator workshop teaching sustainable urban farming to vulnerable families.",
      date: "November 25, 2023",
      location: "Barangay Tulungatung, Zamboanga City",
      beneficiaries: 120,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      partners: ["RAC Makati", "Kids Who Farm", "Kids Can Compost", "Philippine Air Force 6th Air Reserve Center"],
      impact: "100 children learned safety awareness through interactive reading sessions, 20 mothers received gardenator systems for sustainable food production"
    },
    {
      title: "Cultivar en la Agua: Hydroponics Gardening",
      description: "Asia Pacific Regional Awardee 2021 - Introduced hydroponics farming to women affected by the 2013 Zamboanga Siege, developing a 2,000 square meter vegetable farm for food security and income generation.",
      date: "2020-2021",
      location: "Zamboanga City",
      beneficiaries: 50,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      partners: ["Local Farmers", "Agricultural Experts"],
      impact: "Established sustainable farming system, improved food security, created income source for affected families"
    },
    {
      title: "Mangrove Conservation Initiative",
      description: "Environmental protection project focusing on mangrove planting and coastal rehabilitation to combat climate change and protect marine ecosystems.",
      date: "2022-2024",
      location: "Barangay Talon-Talon, Zamboanga City",
      beneficiaries: 1000,
      status: "Ongoing",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      partners: ["City Environment and Natural Resources Office", "Local Government Unit"],
      impact: "Over 8,520 mangrove propagules planted covering 3.4 hectares, coastal protection enhanced"
    },
    {
      title: "Great West Education Support Program",
      description: "Comprehensive educational assistance providing scholarships, school supplies, and learning materials to underprivileged students to promote literacy and academic excellence.",
      date: "2023-2024",
      location: "Various Schools in Zamboanga City West",
      beneficiaries: 150,
      status: "Ongoing",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      partners: ["Local Schools", "Parent-Teacher Associations"],
      impact: "Improved school attendance, reduced dropout rates, enhanced learning outcomes"
    },
    {
      title: "Community Health and Wellness Drive",
      description: "Health awareness campaigns, medical missions, and hygiene kit distributions addressing public health needs in underserved communities.",
      date: "2023-2024",
      location: "Remote Barangays, Zamboanga City",
      beneficiaries: 300,
      status: "Ongoing",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      partners: ["Local Health Centers", "Medical Professionals", "Department of Health"],
      impact: "Increased health awareness, early disease detection, improved community hygiene practices"
    },
    {
      title: "Youth Leadership Development Program",
      description: "Empowering young leaders through skills training, leadership workshops, and mentorship programs to develop the next generation of community advocates.",
      date: "2024",
      location: "Community Centers, Zamboanga City West",
      beneficiaries: 200,
      status: "Planning",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      partners: ["Youth Organizations", "Professional Mentors", "Local Universities"],
      impact: "Enhanced leadership skills, increased civic engagement, stronger youth network"
    }
  ];

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
                  "name": project.location
                },
                "startDate": project.date.includes("-") ? project.date.split("-")[0] : project.date,
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
              {projects.map((project, index) => (
                <article key={index} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={`${project.title} - Community service project in ${project.location} benefiting ${project.beneficiaries} people`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium backdrop-blur-sm ${
                        project.status === 'Completed' ? 'bg-green-500/80 text-white' :
                        project.status === 'Ongoing' ? 'bg-cranberry-500/80 text-white' :
                        'bg-blue-500/80 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <header>
                      <CardTitle className="text-xl text-slate-900 mb-3 group-hover:text-cranberry-700 transition-colors" itemProp="name">
                        {project.title}
                      </CardTitle>
                    </header>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed" itemProp="description">
                      {project.description}
                    </p>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center text-slate-700">
                        <Calendar className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
                        <span>{project.date}</span>
                      </div>
                      <div className="flex items-center text-slate-700">
                        <MapPin className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                      <div className="flex items-center text-slate-700">
                        <Users className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
                        <span>{project.beneficiaries} beneficiaries</span>
                      </div>
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
                    
                    <div className="pt-4 border-t border-gray-200 mt-auto">
                      <a 
                        href="https://www.facebook.com/RotaractClubZamboWest" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-cranberry-600 to-cranberry-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-cranberry-700 hover:to-cranberry-800 transition-all duration-300 group-hover:shadow-lg text-center"
                      >
                        Learn More
                      </a>
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
