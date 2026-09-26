import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../hooks/projects/fetchProjects';
import { fetchAllAwards } from '../../hooks/landing-page/awardsSection';
import { fetchOfficers } from '../../hooks/officers/fetchOfficers';
import { fetchFoundationGiving } from '../../hooks/foundationGiving/fetchFoundationGiving';
import { getCurrentTerm } from '../../data/officers';
import { cacheConfig } from '../../config/cache';
import { responsiveImage } from '../../utils/contentful';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const fetchHomepageEvidence = async () => {
  const [projects, recognition, officers, foundation] = await Promise.all([
    fetchProjects(3),
    fetchAllAwards(),
    fetchOfficers(getCurrentTerm()),
    fetchFoundationGiving(),
  ]);

  return { projects, recognition, officers, foundation };
};

const Credentials = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['homepageEvidence', getCurrentTerm()],
    queryFn: fetchHomepageEvidence,
    ...cacheConfig.monthly,
  });

  const [featuredProject, ...secondaryProjects] = data?.projects || [];
  const president =
    data?.officers?.find(
      officer => officer.position.trim().toLowerCase() === 'president'
    ) || data?.officers?.[0];
  const recognitions = data?.recognition?.awards.slice(0, 3) || [];
  const latestGiving = data?.foundation?.rows.length
    ? [...data.foundation.rows].sort((a, b) => b.sortOrder - a.sortOrder)[0]
    : undefined;

  return (
    <section
      id="club-records"
      className="editorial-section bg-white"
      aria-labelledby="club-records-heading"
    >
      <div className="editorial-shell">
        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="editorial-kicker">Public record</p>
            <h2 id="club-records-heading" className="editorial-heading mt-3">
              Evidence of an active club
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600 md:justify-self-end md:text-lg">
            Community projects, current officers, recognition, and Rotary
            Foundation giving.
          </p>
        </div>

        {isLoading && (
          <p className="border-t border-slate-300 py-12 text-sm text-slate-500">
            Loading club records…
          </p>
        )}

        {isError && (
          <div className="mt-9 border-y border-slate-300 py-8" role="alert">
            <p className="text-slate-700">
              Club records are temporarily unavailable.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="editorial-link mt-3"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            <div className="mt-6 grid gap-6 border-t border-slate-300 pt-6 md:mt-10 md:gap-8 md:pt-8 lg:grid-cols-[1.45fr_0.55fr] lg:gap-12">
              <div>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-slate-950">
                    Recent project
                  </h3>
                  <Link to="/projects" className="editorial-link shrink-0">
                    Project archive
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                {featuredProject ? (
                  <article className="grid gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-start">
                    {featuredProject.image && (
                      <img
                        {...responsiveImage(
                          featuredProject.image,
                          '(min-width: 1024px) 352px, (min-width: 640px) 45vw, calc(100vw - 40px)'
                        )}
                        alt={`${featuredProject.title} project record`}
                        className="aspect-[4/3] w-full bg-[#f4f1ec] object-contain"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        {formatDate(featuredProject.date)}
                        {featuredProject.category &&
                          ` · ${featuredProject.category}`}
                      </p>
                      <h4 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
                        {featuredProject.title}
                      </h4>
                      {featuredProject.shortDescription &&
                        featuredProject.shortDescription.trim() !==
                          featuredProject.title.trim() && (
                          <p className="mt-4 text-sm leading-6 text-slate-600">
                            {featuredProject.shortDescription}
                          </p>
                        )}
                      <Link
                        to={`/projects/${featuredProject.slug}`}
                        className="editorial-link mt-5"
                      >
                        Read the project record
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ) : (
                  <p className="text-sm text-slate-500">
                    Project records will appear here when published.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                  Also in the archive
                </h3>
                <div className="mt-4 divide-y divide-slate-200 border-y border-slate-300">
                  {secondaryProjects.length > 0 ? (
                    secondaryProjects.map(project => (
                      <Link
                        key={project.id}
                        to={`/projects/${project.slug}`}
                        className="group block py-3 md:py-5"
                      >
                        <p className="text-xs text-slate-500">
                          {formatDate(project.date)}
                        </p>
                        <p className="mt-1 font-semibold leading-6 text-slate-900 group-hover:text-cranberry-700">
                          {project.title}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="py-5 text-sm text-slate-500">
                      No additional records published yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 grid border-t border-slate-300 md:mt-12 md:grid-cols-3">
              <section className="border-b border-slate-200 py-5 md:border-b-0 md:border-r md:py-7 md:pr-8">
                <p className="editorial-kicker">Current leadership</p>
                {president ? (
                  <div className="mt-3 flex items-center gap-4 md:mt-5">
                    {president.profileImage && (
                      <img
                        {...responsiveImage(president.profileImage, '64px')}
                        alt={`${president.name}, ${president.position}`}
                        className="h-16 w-16 shrink-0 object-cover"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">
                        {president.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {president.position} · Rotary Year {president.term}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    The current roster will appear when published.
                  </p>
                )}
                <Link to="/officers" className="editorial-link mt-3 md:mt-5">
                  View the officer directory
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </section>

              <section className="border-b border-slate-200 py-5 md:border-b-0 md:border-r md:px-8 md:py-7">
                <p className="editorial-kicker">Recent recognition</p>
                {recognitions.length > 0 ? (
                  <ol className="mt-4 divide-y divide-slate-200">
                    {recognitions.map(recognition => (
                      <li
                        key={`${recognition.name}-${recognition.yearReceived}`}
                        className="grid grid-cols-[4.5rem_1fr] gap-3 py-2.5 text-sm"
                      >
                        <span className="text-slate-500">
                          {recognition.yearReceived}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {recognition.name}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    Recognition records will appear when published.
                  </p>
                )}
                <Link to="/recognition" className="editorial-link mt-4">
                  View recognition record
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </section>

              <section className="py-5 md:py-7 md:pl-8">
                <p className="editorial-kicker">Foundation record</p>
                {latestGiving && data.foundation ? (
                  <div className="mt-4">
                    <p className="text-3xl font-semibold tabular-nums text-slate-950">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: data.foundation.currencyLabel,
                      }).format(latestGiving.totalFund)}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Total giving for {latestGiving.rotaryYearLabel}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      As of {formatDate(data.foundation.asOfDate)}
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    The giving record will appear when published.
                  </p>
                )}
                <Link
                  to="/foundation-giving"
                  className="editorial-link mt-3 md:mt-5"
                >
                  View the full giving record
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </section>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Credentials;
