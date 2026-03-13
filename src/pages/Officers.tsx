import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import ExecutiveBoard from '../components/officers/ExecutiveBoard';
import BoardOfDirectors from '../components/officers/BoardOfDirectors';
import ClubAdvisors from '../components/officers/ClubAdvisors';
import PastPresidents from '../components/officers/PastPresidents';
import { useOfficers, usePastPresidents } from '../hooks/officers/useOfficers';
import { getCurrentTerm } from '@/data/officers';

const Officers = () => {
  const currentTerm = getCurrentTerm();
  const {
    data: officers,
    isLoading: isLoadingOfficers,
    isError: isErrorOfficers,
  } = useOfficers(currentTerm);
  const {
    data: pastPresidentsList,
    isLoading: isLoadingPastPresidents,
    isError: isErrorPastPresidents,
  } = usePastPresidents();

  const isLoading = isLoadingOfficers || isLoadingPastPresidents;
  const isError = isErrorOfficers || isErrorPastPresidents;

  const executiveBoard = officers?.executive || [];
  const currentDirectors = officers?.directors || [];
  const advisorsList = officers?.advisors || [];
  const allOfficers = [...executiveBoard, ...currentDirectors, ...advisorsList];

  return (
    <>
      <Helmet>
        <title>
          Great West Leadership Team & Officers - Rotaract Club of Zamboanga
          City West
        </title>
        <meta
          name="title"
          content="Great West Leadership Team & Officers - Rotaract Club of Zamboanga City West"
        />
        <meta
          name="description"
          content="Meet the dedicated Great West leadership team driving positive change in Zamboanga City. Learn about our Executive Board, Directors, and Advisors for 2025-2026 who embody our values of fellowship, service, and leadership."
        />
        <meta
          name="keywords"
          content="Rotaract officers Zamboanga City West, Great West leadership team, club president, directors, advisors, Rotaract board members, youth leadership Philippines, club officers 2025-2026"
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
          content="https://rotaract.rotaryzcwest.org/officers"
        />
        <meta
          property="og:title"
          content="Great West Leadership Team & Officers - Rotaract Club of Zamboanga City West"
        />
        <meta
          property="og:description"
          content="Meet the dedicated Great West leadership team driving positive change in Zamboanga City. Learn about our Executive Board, Directors, and Advisors for 2025-2026 who embody our values of fellowship, service, and leadership."
        />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta
          property="og:image:alt"
          content="Great West Leadership Team - Rotaract Club of Zamboanga City West"
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
          content="https://rotaract.rotaryzcwest.org/officers"
        />
        <meta
          property="twitter:title"
          content="Great West Leadership Team & Officers - Rotaract Club of Zamboanga City West"
        />
        <meta
          property="twitter:description"
          content="Meet the dedicated Great West leadership team driving positive change in Zamboanga City. Learn about our Executive Board, Directors, and Advisors for 2025-2026 who embody our values of fellowship, service, and leadership."
        />
        <meta
          property="twitter:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta
          property="twitter:image:alt"
          content="Great West Leadership Team - Rotaract Club of Zamboanga City West"
        />

        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />

        <link
          rel="canonical"
          href="https://rotaract.rotaryzcwest.org/officers"
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
            '@type': 'Organization',
            name: 'Rotaract Club of Zamboanga City West',
            alternateName: 'Great West',
            url: 'https://rotaract.rotaryzcwest.org',
            employee: allOfficers.map(officer => ({
              '@type': 'Person',
              name: officer.name,
              jobTitle: officer.position,
              worksFor: {
                '@type': 'Organization',
                name: 'Rotaract Club of Zamboanga City West',
                alternateName: 'Great West',
              },
              description: officer.responsibilities,
            })),
            department: [
              {
                '@type': 'Organization',
                name: 'Executive Board',
                description: 'Senior leadership team of the Rotaract Club',
              },
              {
                '@type': 'Organization',
                name: 'Board of Directors',
                description:
                  'Directors responsible for specific areas of focus',
              },
              {
                '@type': 'Organization',
                name: 'Club Advisors',
                description:
                  'Experienced advisors providing guidance and support',
              },
            ],
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
                name: 'Great West Leadership',
                item: 'https://rotaract.rotaryzcwest.org/officers',
              },
            ],
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
                Meet the dedicated leaders and members who make our club's
                mission possible.
              </p>
              <Badge
                variant="outline"
                className="text-slate-700 border-slate-300 mt-4"
              >
                Rotary Year {getCurrentTerm()}
              </Badge>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-cranberry-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading officers...</p>
                </div>
              </div>
            )}

            {isError && (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <p className="text-red-600 mb-4">
                    Failed to load officers. Please try again later.
                  </p>
                </div>
              </div>
            )}

            {!isLoading && !isError && (
              <>
                <ExecutiveBoard executives={executiveBoard} />

                <BoardOfDirectors directors={currentDirectors} />

                <ClubAdvisors advisors={advisorsList} />

                <PastPresidents pastPresidents={pastPresidentsList || []} />
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Officers;
