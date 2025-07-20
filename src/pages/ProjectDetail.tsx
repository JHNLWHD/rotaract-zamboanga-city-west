import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShareModal from '../components/ShareModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink, Share2, ArrowLeft, Image as ImageIcon, CheckCircle, Copy, X, ZoomIn, Download } from 'lucide-react';
import { toast } from 'sonner';
import { projects, Project } from '../data/projects';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import DownloadPlugin from 'yet-another-react-lightbox/plugins/download';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Find the project based on slug
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/projects')} className="bg-cranberry-600 hover:bg-cranberry-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareProject = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const downloadImage = (url: string, caption: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${caption.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health & Wellness':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Education & Youth':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Environment':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Food Security':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Community Development':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Helmet>
        <title>{project.title} | Great West Community Impact - Rotaract Club of Zamboanga City West</title>
        <meta name="title" content={`${project.title} | Great West Community Impact - Rotaract Club of Zamboanga City West`} />
        <meta name="description" content={`${project.shortDescription} ${project.impact} See how the Great West is making lasting impact in Zamboanga City through this award-winning community service project.`} />
        <meta name="keywords" content={`${project.title}, Great West community impact, Rotaract ${project.category.toLowerCase()}, ${project.venue}, Zamboanga City West, ${project.date}, ${project.category.toLowerCase()} project Philippines, award-winning community service, volunteer projects`} />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />
        
        {/* Project-specific meta tags */}
        <meta name="project:start_date" content={project.date} />
        <meta name="project:location" content={project.venue} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://rotaract.rotaryzcwest.org/projects/${project.slug}`} />
        <meta property="og:title" content={`${project.title} | Great West Community Impact - Rotaract Club of Zamboanga City West`} />
        <meta property="og:description" content={`${project.shortDescription} ${project.impact} See how the Great West is making lasting impact in Zamboanga City through this award-winning community service project.`} />
        <meta property="og:image" content={project.image} />
        <meta property="og:image:alt" content={`${project.title} - Great West community impact project`} />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        <meta property="og:locale" content="en_PH" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RotaractZCWest" />
        <meta name="twitter:creator" content="@RotaractZCWest" />
        <meta name="twitter:url" content={`https://rotaract.rotaryzcwest.org/projects/${project.slug}`} />
        <meta name="twitter:title" content={`${project.title} | Great West Community Impact - Rotaract Club of Zamboanga City West`} />
        <meta name="twitter:description" content={`${project.shortDescription} ${project.impact} See how the Great West is making lasting impact in Zamboanga City through this award-winning community service project.`} />
        <meta name="twitter:image" content={project.image} />
        <meta name="twitter:image:alt" content={`${project.title} - Great West community impact project`} />
        <meta name="twitter:label1" content="Date" />
        <meta name="twitter:data1" content={formatDate(project.date)} />
        <meta name="twitter:label2" content="Location" />
        <meta name="twitter:data2" content={project.venue} />
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://rotaract.rotaryzcwest.org/projects/${project.slug}`} />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Enhanced Structured Data for Project */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Project",
            "name": project.title,
            "description": project.description,
            "startDate": project.date,
            "location": {
              "@type": "Place",
              "name": project.venue,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": project.venue,
                "addressLocality": "Zamboanga City",
                "addressRegion": "Zamboanga Peninsula",
                "postalCode": "7000",
                "addressCountry": "PH"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "6.9214",
                "longitude": "122.0790"
              }
            },
            "image": [project.image],
            "organizer": {
              "@type": "Organization",
              "name": "Rotaract Club of Zamboanga City West",
              "alternateName": "Great West",
              "url": "https://rotaract.rotaryzcwest.org",
              "logo": "https://rotaract.rotaryzcwest.org/images/logo.png",
              "sameAs": [
                "https://www.facebook.com/RotaractClubZamboWest",
                "https://www.instagram.com/rotaractzcwest"
              ]
            },
            "funder": project.partners ? project.partners.map(partner => ({
              "@type": "Organization",
              "name": partner
            })) : undefined,
            "category": project.category,
            "impact": project.impact
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
                "name": "Community Impact",
                "item": "https://rotaract.rotaryzcwest.org/projects"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": project.title,
                "item": `https://rotaract.rotaryzcwest.org/projects/${project.slug}`
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-cranberry-50 via-white to-pink-50 pt-20">
          <div className="container mx-auto px-6 py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
              <button 
                onClick={() => navigate('/projects')}
                className="hover:text-cranberry-600 transition-colors"
              >
                Projects
              </button>
              <span>/</span>
              <span className="text-slate-900 font-medium">{project.title}</span>
            </nav>

            {/* Project Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="aspect-video relative">
                    <img 
                      src={project.image} 
                      alt={`${project.title} - Community service project in ${project.venue}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                          {project.title}
                        </h1>
                        <Badge className={getCategoryColor(project.category)}>
                          {project.category}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={shareProject}
                          className="border-cranberry-200 text-cranberry-600 hover:bg-cranberry-50"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project.facebookLink, '_blank')}
                          className="border-cranberry-200 text-cranberry-600 hover:bg-cranberry-50"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Facebook
                        </Button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="flex items-center text-slate-700">
                        <Calendar className="w-5 h-5 mr-3 text-cranberry-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm">{formatDate(project.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-slate-700">
                        <MapPin className="w-5 h-5 mr-3 text-cranberry-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Venue</p>
                          <p className="text-sm">{project.venue}</p>
                        </div>
                      </div>
                      {project.beneficiaries && (
                        <div className="flex items-center text-slate-700">
                          <Users className="w-5 h-5 mr-3 text-cranberry-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Beneficiaries</p>
                            <p className="text-sm">{project.beneficiaries} people</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-slate-900 mb-4">About This Project</h2>
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-700 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        {project.richDescription && (
                          <div className="text-slate-700 leading-relaxed prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-strong:font-semibold prose-ul:my-2 prose-li:my-1">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node, ...props }) => (
                                  <a 
                                    {...props} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-cranberry-600 hover:text-cranberry-700 underline inline-flex items-center gap-1"
                                  >
                                    {props.children}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )
                              }}
                            >
                              {project.richDescription}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bullet Points */}
                    {project.bulletPoints && project.bulletPoints.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Key Activities</h2>
                        <ul className="space-y-2">
                          {project.bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-cranberry-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Impact */}
                    {project.impact && (
                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Impact</h2>
                        <div className="bg-gradient-to-r from-cranberry-50 to-pink-50 rounded-lg p-6 border border-cranberry-100">
                          <p className="text-slate-700 leading-relaxed">{project.impact}</p>
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Highlights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-cranberry-500 mr-2 flex-shrink-0" />
                              <span className="text-slate-700 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Project Gallery</CardTitle>
                          <p className="text-sm text-gray-600">
                            Photos and highlights from this project
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Header Image */}
                            <div className="bg-gray-100 rounded-lg overflow-hidden">
                              <div className="aspect-square relative flex items-center justify-center">
                                <img
                                  src={project.image}
                                  alt={`${project.title} - Main project image`}
                                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                              <div className="p-3">
                                <p className="text-sm font-medium text-gray-900">{project.title}</p>
                                <p className="text-xs text-gray-500 mt-1">Main Project Image</p>
                              </div>
                            </div>
                            
                            {/* Gallery Images */}
                            {project.gallery.map((photo, idx) => (
                              <div 
                                key={photo.id}
                                className="bg-gray-100 rounded-lg overflow-hidden"
                              >
                                <div className="aspect-square relative flex items-center justify-center">
                                  <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => { setLightboxIndex(idx + 1); setLightboxOpen(true); }}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="p-3">
                                  <p className="text-sm font-medium text-gray-900">{photo.caption}</p>
                                  <p className="text-xs text-gray-500 mt-1">{photo.category}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {(project.gallery.length + 1) > 6 && (
                            <div className="mt-4 text-center">
                              <p className="text-sm text-gray-600">
                                {project.gallery.length + 1} photos total • Click any photo to view full size
                              </p>
                            </div>
                          )}
                          <Lightbox
                            open={lightboxOpen}
                            close={() => setLightboxOpen(false)}
                            index={lightboxIndex}
                            slides={[
                              {
                                src: project.image,
                                alt: `${project.title} - Main project image`,
                                download: project.image,
                                description: `${project.title} - Main project image`
                              },
                              ...project.gallery.map(photo => ({
                                src: photo.url,
                                alt: photo.caption,
                                download: photo.url,
                                description: photo.caption
                              }))
                            ]}
                            plugins={[Captions, DownloadPlugin, Thumbnails]}
                            captions={{
                              descriptionTextAlign: 'center',
                              descriptionMaxLines: 3,
                            }}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Partners */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Partners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.partners.map((partner, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-cranberry-500 rounded-full mr-3"></div>
                          <span className="text-slate-700 text-sm">{partner}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Partner Links */}
                {project.partnerLinks && project.partnerLinks.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-slate-900">Partner Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {project.partnerLinks.map((partner, index) => (
                          <div key={index}>
                            {partner.url ? (
                              <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-cranberry-600 hover:text-cranberry-700 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                <span className="text-sm">{partner.name}</span>
                              </a>
                            ) : (
                              <span className="text-slate-700 text-sm">{partner.name}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Hashtags */}
                {project.hashtags && project.hashtags.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-slate-900">Hashtags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.hashtags.map((hashtag, index) => (
                          <Badge key={index} variant="outline" className="border-blue-200 text-blue-600">
                            {hashtag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        content={project ? {
          title: project.title,
          description: project.shortDescription,
          date: project.date,
          venue: project.venue,
          shareableLink: project.shareableLink,
          category: project.category
        } : null}
        contentType="project"
      />
    </>
  );
};

export default ProjectDetail; 