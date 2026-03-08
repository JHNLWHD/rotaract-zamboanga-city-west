import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShareModal from '../components/ShareModal';
import ProjectNotFound from '../components/projects/ProjectNotFound';
import ProjectBreadcrumb from '../components/projects/ProjectBreadcrumb';
import ProjectMainContent from '../components/projects/ProjectMainContent';
import ProjectSidebar from '../components/projects/ProjectSidebar';
import { projects } from '../data/projects';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [showShareModal, setShowShareModal] = useState(false);

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  const shareProject = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>
          {project.title} | Great West Community Impact - Rotaract Club of
          Zamboanga City West
        </title>
        <meta
          name="title"
          content={`${project.title} | Great West Community Impact - Rotaract Club of Zamboanga City West`}
        />
        <meta
          name="description"
          content={`${project.shortDescription} ${project.impact} See how the Great West is making lasting impact in Zamboanga City through this award-winning community service project.`}
        />
        <meta
          name="keywords"
          content={`${project.title}, Great West community impact, Rotaract ${project.category.toLowerCase()}, ${project.venue}, Zamboanga City West, ${project.date}, ${project.category.toLowerCase()} project Philippines, award-winning community service, volunteer projects`}
        />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />

        <meta name="project:start_date" content={project.date} />
        <meta name="project:location" content={project.venue} />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://rotaract.rotaryzcwest.org/projects/${project.slug}`}
        />
        <meta
          property="og:title"
          content={`${project.title} | Great West Community Impact - Rotaract Club of Zamboanga City West`}
        />
        <meta
          property="og:description"
          content={`${project.shortDescription} ${project.impact} See how the Great West is making lasting impact in Zamboanga City through this award-winning community service project.`}
        />
        <meta property="og:image" content={project.image} />
        <meta
          property="og:image:alt"
          content={`${project.title} - Great West community impact project`}
        />
        <meta
          property="og:site_name"
          content="Rotaract Club of Zamboanga City West"
        />
        <meta property="og:locale" content="en_PH" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RotaractZCWest" />
        <meta name="twitter:creator" content="@RotaractZCWest" />
        <meta
          name="twitter:url"
          content={`https://rotaract.rotaryzcwest.org/projects/${project.slug}`}
        />
        <meta
          name="twitter:title"
          content={`${project.title} | Great West Community Impact - Rotaract Club of Zamboanga City West`}
        />
        <meta
          name="twitter:description"
          content={`${project.shortDescription} ${project.impact} See how the Great West is making lasting impact in Zamboanga City through this award-winning community service project.`}
        />
        <meta name="twitter:image" content={project.image} />
        <meta
          name="twitter:image:alt"
          content={`${project.title} - Great West community impact project`}
        />
        <meta name="twitter:label1" content="Date" />
        <meta name="twitter:data1" content={formatDate(project.date)} />
        <meta name="twitter:label2" content="Location" />
        <meta name="twitter:data2" content={project.venue} />

        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />

        <link
          rel="canonical"
          href={`https://rotaract.rotaryzcwest.org/projects/${project.slug}`}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Project',
            name: project.title,
            description: project.description,
            startDate: project.date,
            location: {
              '@type': 'Place',
              name: project.venue,
              address: {
                '@type': 'PostalAddress',
                streetAddress: project.venue,
                addressLocality: 'Zamboanga City',
                addressRegion: 'Zamboanga Peninsula',
                postalCode: '7000',
                addressCountry: 'PH',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '6.9214',
                longitude: '122.0790',
              },
            },
            image: [project.image],
            organizer: {
              '@type': 'Organization',
              name: 'Rotaract Club of Zamboanga City West',
              alternateName: 'Great West',
              url: 'https://rotaract.rotaryzcwest.org',
              logo: 'https://rotaract.rotaryzcwest.org/images/logo.png',
              sameAs: [
                'https://www.facebook.com/RotaractClubZamboWest',
                'https://www.instagram.com/raczambowest1',
              ],
            },
            funder: project.partners
              ? project.partners.map(partner => ({
                  '@type': 'Organization',
                  name: partner,
                }))
              : undefined,
            category: project.category,
            impact: project.impact,
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://rotaract.rotaryzcwest.org',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Community Impact',
                item: 'https://rotaract.rotaryzcwest.org/projects',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: project.title,
                item: `https://rotaract.rotaryzcwest.org/projects/${project.slug}`,
              },
            ],
          })}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-cranberry-50 via-white to-pink-50 pt-20">
          <div className="container mx-auto px-6 py-16">
            <ProjectBreadcrumb project={project} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <ProjectMainContent project={project} onShare={shareProject} />

              <ProjectSidebar project={project} />
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        content={
          project
            ? {
                title: project.title,
                description: project.shortDescription,
                date: project.date,
                venue: project.venue,
                shareableLink: project.shareableLink,
                category: project.category,
              }
            : null
        }
        contentType="project"
      />
    </>
  );
};

export default ProjectDetail;
