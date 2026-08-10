import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { Award as AwardIcon, ExternalLink, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { fetchAllAwards } from '../hooks/landing-page/awardsSection';
import { cacheConfig } from '../config/cache';

const Recognition = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['recognition'],
    queryFn: fetchAllAwards,
    ...cacheConfig.yearly,
  });

  return (
    <>
      <Helmet>
        <title>
          Recognition & Awards | Rotaract Club of Zamboanga City West
        </title>
        <meta
          name="description"
          content="Review the awards, certificates, and official recognition earned by the Rotaract Club of Zamboanga City West."
        />
        <meta
          property="og:title"
          content="Recognition & Awards | Rotaract Club of Zamboanga City West"
        />
        <meta
          property="og:description"
          content="Review the awards, certificates, and official recognition earned by the Rotaract Club of Zamboanga City West."
        />
        <meta
          property="og:url"
          content="https://rotaract.rotaryzcwest.org/recognition"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta
          property="og:site_name"
          content="Rotaract Club of Zamboanga City West"
        />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Recognition & Awards | Rotaract Club of Zamboanga City West"
        />
        <meta
          name="twitter:description"
          content="Review the awards, certificates, and official recognition earned by the Rotaract Club of Zamboanga City West."
        />
        <meta
          name="twitter:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <link
          rel="canonical"
          href="https://rotaract.rotaryzcwest.org/recognition"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main
          id="main-content"
          className="flex-1 bg-gradient-to-br from-cranberry-50 via-white to-pink-50 pt-32 pb-16"
        >
          <div className="max-w-7xl mx-auto px-6">
            <header className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-wide text-cranberry-700 mb-3">
                Our Credentials
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Recognition & <span className="text-gradient">Awards</span>
              </h1>
              <p className="text-lg text-slate-600">
                A record of the club’s achievements, certificates, and official
                citations.
              </p>
            </header>

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                <Loader2 className="h-8 w-8 animate-spin text-cranberry-600 mb-4" />
                <p>Loading recognition records…</p>
              </div>
            )}

            {isError && (
              <div className="text-center py-20" role="alert">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800 font-medium mb-2">
                    Recognition records are unavailable
                  </p>
                  <p className="text-red-600 text-sm">
                    Please try again later.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() => refetch()}
                    disabled={isFetching}
                  >
                    {isFetching ? 'Trying again…' : 'Try again'}
                  </Button>
                </div>
              </div>
            )}

            {!isLoading && !isError && data?.awards.length === 0 && (
              <div className="text-center py-20 text-slate-600">
                <AwardIcon className="h-12 w-12 text-cranberry-500 mx-auto mb-4" />
                <p>No recognition records have been published yet.</p>
              </div>
            )}

            {!isLoading && !isError && data && data.awards.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.awards.map(award => {
                  const imageUrl = award.image.url.startsWith('//')
                    ? `https:${award.image.url}`
                    : award.image.url;

                  return (
                    <article
                      key={`${award.name}-${award.yearReceived}`}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
                    >
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={
                            award.image.description ||
                            `${award.name} certificate or recognition`
                          }
                          className="w-full aspect-[4/3] object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="text-sm font-semibold text-cranberry-700">
                            {award.yearReceived}
                          </span>
                          <AwardIcon
                            className="h-5 w-5 text-cranberry-600"
                            aria-hidden="true"
                          />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">
                          {award.name}
                        </h2>
                        {award.issuingOrganization && (
                          <p className="text-sm text-slate-500 mb-4">
                            Issued by {award.issuingOrganization}
                          </p>
                        )}
                        <p className="text-slate-600 mb-4">
                          {award.shortDescription}
                        </p>
                        {award.description && (
                          <div className="prose prose-sm prose-slate max-w-none mt-auto">
                            <ReactMarkdown>{award.description}</ReactMarkdown>
                          </div>
                        )}
                        {award.sourceUrl && (
                          <a
                            href={award.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-cranberry-700 mt-4"
                          >
                            View official citation
                            <ExternalLink
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Recognition;
