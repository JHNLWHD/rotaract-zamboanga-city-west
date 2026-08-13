import React from 'react';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import { useOfficers, usePastPresidents } from '../hooks/officers/useOfficers';
import { type Officer } from '../hooks/officers/fetchOfficers';
import { getCurrentTerm } from '../data/officers';

type OfficerGroupProps = {
  title: string;
  officers: Officer[];
};

const OfficerGroup: React.FC<OfficerGroupProps> = ({ title, officers }) => {
  if (!officers.length) return null;

  return (
    <section
      aria-labelledby={`${title.replace(/\s/g, '-').toLowerCase()}-heading`}
    >
      <div className="mb-5 flex items-end justify-between gap-5">
        <h2
          id={`${title.replace(/\s/g, '-').toLowerCase()}-heading`}
          className="text-3xl font-semibold text-slate-950"
        >
          {title}
        </h2>
        <p className="text-sm text-slate-500">
          {officers.length} {officers.length === 1 ? 'officer' : 'officers'}
        </p>
      </div>
      <div className="grid gap-x-8 md:grid-cols-2">
        {officers.map(officer => (
          <article
            key={officer.id}
            className="flex min-h-28 gap-4 border-t border-slate-300 py-5"
          >
            {officer.profileImage && (
              <img
                src={officer.profileImage}
                alt={`${officer.name}, ${officer.position}`}
                className="h-20 w-20 shrink-0 object-cover"
                loading="lazy"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold leading-tight text-slate-950">
                {officer.name}
              </h3>
              <p className="mt-2 text-sm font-semibold text-cranberry-700">
                {officer.position}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Rotary Year {officer.term}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const statusLabel = {
  current: 'Current term',
  president_elect: 'President-elect',
  future: 'President-nominee',
};

const Officers = () => {
  const currentTerm = getCurrentTerm();
  const {
    data: officers,
    isLoading: isLoadingOfficers,
    isError: isErrorOfficers,
    refetch: refetchOfficers,
    isFetching: isFetchingOfficers,
  } = useOfficers(currentTerm);
  const {
    data: presidents,
    isLoading: isLoadingPresidents,
    isError: isErrorPresidents,
    refetch: refetchPresidents,
    isFetching: isFetchingPresidents,
  } = usePastPresidents();

  const executive = officers?.executive || [];
  const directors = officers?.directors || [];
  const advisors = officers?.advisors || [];
  const allOfficers = [...executive, ...directors, ...advisors];
  const isLoading = isLoadingOfficers || isLoadingPresidents;
  const isError = isErrorOfficers || isErrorPresidents;
  const isRetrying = isFetchingOfficers || isFetchingPresidents;
  const description = `The published officer directory of the Rotaract Club of Zamboanga City West for Rotary Year ${currentTerm}.`;

  return (
    <>
      <Helmet>
        <title>Officers | Rotaract Club of Zamboanga City West</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rotaract.rotaryzcwest.org/officers"
        />
        <meta
          property="og:title"
          content="Officers | Rotaract Club of Zamboanga City West"
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://rotaract.rotaryzcwest.org/officers"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Rotaract Club of Zamboanga City West',
            url: 'https://rotaract.rotaryzcwest.org',
            employee: allOfficers.map(officer => ({
              '@type': 'Person',
              name: officer.name,
              jobTitle: officer.position,
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main id="main-content">
          <PageHeader
            eyebrow="Leadership record"
            title="Current club officers"
            description="A practical directory of the people currently responsible for club leadership, with names, roles, and terms shown as published in the club roster."
            asOf={`Rotary Year ${currentTerm}`}
          />

          <div className="editorial-shell py-10 md:py-14">
            {isLoading && (
              <div className="flex items-center gap-3 border-y border-slate-300 py-10 text-sm text-slate-600">
                <Loader2
                  className="h-5 w-5 animate-spin text-cranberry-700"
                  aria-hidden="true"
                />
                Loading officer records…
              </div>
            )}

            {isError && (
              <div className="border-y border-slate-300 py-9" role="alert">
                <p className="text-sm text-slate-700">
                  Officer records are temporarily unavailable.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    void Promise.all([refetchOfficers(), refetchPresidents()])
                  }
                  disabled={isRetrying}
                  className="editorial-link mt-3 disabled:opacity-50"
                >
                  {isRetrying ? 'Trying again…' : 'Try again'}
                </button>
              </div>
            )}

            {!isLoading && !isError && (
              <div className="space-y-14">
                {allOfficers.length > 0 ? (
                  <>
                    <OfficerGroup
                      title="Executive board"
                      officers={executive}
                    />
                    <OfficerGroup title="Directors" officers={directors} />
                    <OfficerGroup title="Club advisors" officers={advisors} />
                  </>
                ) : (
                  <p className="border-y border-slate-300 py-9 text-sm text-slate-600">
                    No current officer records have been published yet.
                  </p>
                )}

                {presidents && presidents.length > 0 && (
                  <section aria-labelledby="presidential-record-heading">
                    <div className="mb-5 flex items-end justify-between gap-5">
                      <div>
                        <p className="editorial-kicker">Leadership archive</p>
                        <h2
                          id="presidential-record-heading"
                          className="mt-2 text-3xl font-semibold text-slate-950"
                        >
                          Presidential record
                        </h2>
                      </div>
                      <p className="text-sm text-slate-500">
                        {presidents.length} terms
                      </p>
                    </div>
                    <ol className="border-y border-slate-300">
                      {presidents.map(president => (
                        <li
                          key={president.id}
                          className="grid gap-1 border-b border-slate-200 py-3.5 last:border-b-0 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-5"
                        >
                          <span className="text-sm tabular-nums text-slate-500">
                            {president.term}
                          </span>
                          <span className="font-semibold text-slate-900">
                            {president.name}
                          </span>
                          {president.status && (
                            <span className="text-xs font-semibold text-cranberry-700">
                              {statusLabel[president.status]}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Officers;
