import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import ProjectsLoadingState from '../components/projects/ProjectsLoadingState';
import ProjectsErrorState from '../components/projects/ProjectsErrorState';
import { Button } from '../components/ui/button';
import { Users } from 'lucide-react';
import { fetchProjects } from '../hooks/projects/fetchProjects';
import { cacheConfig } from '../config/cache';

const Projects = () => {
  // Fetch projects from Contentful
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
    ...cacheConfig.monthly,
  });

  return (
    <>
      <Helmet>
        <title>
          Community Impact & Award-Winning Projects - Rotaract Club of Zamboanga
          City West
        </title>
        <meta
          name="title"
          content="Community Impact & Award-Winning Projects - Rotaract Club of Zamboanga City West"
        />
        <meta
          name="description"
          content="Discover our award-winning community service projects including hydroponics farming, mangrove conservation, education support, and health initiatives. See how the Great West is making lasting impact in Zamboanga City with 1,820+ lives transformed."
        />
        <meta
          name="keywords"
          content="community projects Zamboanga City, award-winning Rotaract projects, hydroponics farming Philippines, mangrove conservation, education support programs, health initiatives, community service impact, Great West projects, volunteer projects Philippines"
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

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rotaract.rotaryzcwest.org/projects"
        />
        <meta
          property="og:title"
          content="Community Impact & Award-Winning Projects - Rotaract Club of Zamboanga City West"
        />
        <meta
          property="og:description"
          content="Discover our award-winning community service projects including hydroponics farming, mangrove conservation, education support, and health initiatives. See how the Great West is making lasting impact in Zamboanga City with 1,820+ lives transformed."
        />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta
          property="og:image:alt"
          content="Community Impact Projects - Rotaract Club of Zamboanga City West"
        />
        <meta
          property="og:site_name"
          content="Rotaract Club of Zamboanga City West"
        />
        <meta property="og:locale" content="en_PH" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@RotaractZCWest" />
        <meta property="twitter:creator" content="@RotaractZCWest" />
        <meta
          property="twitter:url"
          content="https://rotaract.rotaryzcwest.org/projects"
        />
        <meta
          property="twitter:title"
          content="Community Impact & Award-Winning Projects - Rotaract Club of Zamboanga City West"
        />
        <meta
          property="twitter:description"
          content="Discover our award-winning community service projects including hydroponics farming, mangrove conservation, education support, and health initiatives. See how the Great West is making lasting impact in Zamboanga City with 1,820+ lives transformed."
        />
        <meta
          property="twitter:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta
          property="twitter:image:alt"
          content="Community Impact Projects - Rotaract Club of Zamboanga City West"
        />

        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />

        <link
          rel="canonical"
          href="https://rotaract.rotaryzcwest.org/projects"
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
            '@type': 'CollectionPage',
            name: 'Community Impact & Award-Winning Projects',
            description:
              'Award-winning community service projects making positive impact in Zamboanga City with 1,820+ lives transformed',
            url: 'https://rotaract.rotaryzcwest.org/projects',
            publisher: {
              '@type': 'Organization',
              name: 'Rotaract Club of Zamboanga City West',
              alternateName: 'Great West',
              url: 'https://rotaract.rotaryzcwest.org',
            },
            mainEntity: {
              '@type': 'ItemList',
              name: 'Community Service Projects',
              description:
                'Award-winning projects including hydroponics farming, mangrove conservation, education support, and health initiatives',
              numberOfItems: projects?.length || 0,
              itemListElement: (projects || []).map((project, index) => ({
                '@type': 'Project',
                position: index + 1,
                name: project.title,
                description: project.description,
                location: {
                  '@type': 'Place',
                  name: project.venue,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Zamboanga City',
                    addressRegion: 'Zamboanga Peninsula',
                    addressCountry: 'PH',
                  },
                },
                startDate: project.date,
                organizer: {
                  '@type': 'Organization',
                  name: 'Rotaract Club of Zamboanga City West',
                  alternateName: 'Great West',
                },
                funder: project.partners
                  ? project.partners.map(partner => ({
                      '@type': 'Organization',
                      name: partner,
                    }))
                  : undefined,
                category: project.category,
                impact: project.impact,
              })),
            },
            breadcrumb: {
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
              ],
            },
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
                Upholding Rotary’s mission, we pursue innovative service
                projects that make a real difference and promote sustainable
                change throughout Zamboanga City and beyond.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cranberry-100">
                  <span className="font-semibold text-cranberry-700">
                    1,820+
                  </span>
                  <span className="text-slate-600 ml-1">Lives Impacted</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cranberry-100">
                  <span className="font-semibold text-cranberry-700">15+</span>
                  <span className="text-slate-600 ml-1">
                    Partner Organizations
                  </span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cranberry-100">
                  <span className="font-semibold text-cranberry-700">
                    Award-Winning
                  </span>
                  <span className="text-slate-600 ml-1">Projects</span>
                </div>
              </div>
            </div>

            {isLoading && <ProjectsLoadingState />}

            {isError && <ProjectsErrorState error={error} />}

            {!isLoading && !isError && <ProjectsGrid projects={projects} />}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
