import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { ExternalLink, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import { fetchAllAwards } from '../hooks/landing-page/awardsSection';
import { cacheConfig } from '../config/cache';

const Recognition = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['recognition'],
    queryFn: fetchAllAwards,
    ...cacheConfig.yearly,
  });
  const awards = data?.awards || [];
  const description =
    'A chronological record of awards, certificates, and citations published by the Rotaract Club of Zamboanga City West.';

  return (
    <>
      <Helmet>
        <title>Recognition | Rotaract Club of Zamboanga City West</title>
        <meta name="description" content={description} />
        <meta
          property="og:title"
          content="Recognition | Rotaract Club of Zamboanga City West"
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content="https://rotaract.rotaryzcwest.org/recognition"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://rotaract.rotaryzcwest.org/recognition"
        />
      </Helmet>

      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main id="main-content">
          <PageHeader
            eyebrow="Recognition record"
            title="Awards and official citations"
            description="Recognition is listed newest first, with the issuing organization, evidence image, and source link shown when the club has published them."
          />

          <div className="editorial-shell py-10 md:py-14">
            {isLoading && (
              <div className="flex items-center gap-3 border-y border-slate-300 py-10 text-sm text-slate-600">
                <Loader2
                  className="h-5 w-5 animate-spin text-cranberry-700"
                  aria-hidden="true"
                />
                Loading recognition records…
              </div>
            )}

            {isError && (
              <div className="border-y border-slate-300 py-9" role="alert">
                <p className="text-sm text-slate-700">
                  Recognition records are temporarily unavailable.
                </p>
                <button
                  type="button"
                  className="editorial-link mt-3 disabled:opacity-50"
                  onClick={() => refetch()}
                  disabled={isFetching}
                >
                  {isFetching ? 'Trying again…' : 'Try again'}
                </button>
              </div>
            )}

            {!isLoading && !isError && awards.length === 0 && (
              <p className="border-y border-slate-300 py-9 text-sm text-slate-600">
                No recognition records have been published yet.
              </p>
            )}

            {!isLoading && !isError && awards.length > 0 && (
              <ol aria-label="Recognition records">
                {awards.map(award => {
                  const imageUrl = award.image.url.startsWith('//')
                    ? `https:${award.image.url}`
                    : award.image.url;

                  return (
                    <li
                      key={`${award.name}-${award.dateReceived || award.yearReceived}`}
                      className="grid gap-5 border-t border-slate-300 py-7 md:grid-cols-[8rem_minmax(0,1fr)] lg:grid-cols-[8rem_minmax(0,1fr)_16rem] lg:gap-9"
                    >
                      <div>
                        <p className="font-display text-3xl font-semibold text-slate-950">
                          {award.yearReceived}
                        </p>
                      </div>

                      <article>
                        {award.issuingOrganization && (
                          <p className="text-xs font-bold uppercase tracking-[0.13em] text-slate-500">
                            Issued by {award.issuingOrganization}
                          </p>
                        )}
                        <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-950">
                          {award.name}
                        </h2>
                        {award.shortDescription && (
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {award.shortDescription}
                          </p>
                        )}
                        {!award.shortDescription && award.description && (
                          <div className="prose prose-sm prose-slate mt-3 max-w-none">
                            <ReactMarkdown>{award.description}</ReactMarkdown>
                          </div>
                        )}
                        {award.sourceUrl && (
                          <a
                            href={award.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="editorial-link mt-5"
                          >
                            View published source
                            <ExternalLink
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </article>

                      {imageUrl && (
                        <figure className="md:col-start-2 lg:col-start-3 lg:row-start-1">
                          <img
                            src={imageUrl}
                            alt={
                              award.image.description ||
                              `${award.name} certificate or recognition`
                            }
                            className="aspect-[4/3] w-full object-cover"
                            loading="lazy"
                          />
                          {award.image.description && (
                            <figcaption className="mt-2 text-xs leading-5 text-slate-500">
                              {award.image.description}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Recognition;
