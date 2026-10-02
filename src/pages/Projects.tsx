import React from 'react';
import { Helmet } from 'react-helmet';
import { serializeJson } from '../utils/seo';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import ProjectsLoadingState from '../components/projects/ProjectsLoadingState';
import ProjectsErrorState from '../components/projects/ProjectsErrorState';
import { fetchProjects } from '../hooks/projects/fetchProjects';
import { cacheConfig } from '../config/cache';
import { responsiveImage } from '../utils/contentful';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const Projects = () => {
  const {
    data: projects,
    isLoading,
    isLoadingError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
    ...cacheConfig.monthly,
  });

  const [featuredProject, ...archive] = projects || [];
  const description =
    'A dated archive of community projects published by the Rotaract Club of Zamboanga City West, including locations, partners, outcomes, and supporting records.';

  return (
    <>
      <Helmet>
        <title>Projects | Rotaract Club of Zamboanga City West</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rotaract.rotaryzcwest.org/projects"
        />
        <meta
          property="og:title"
          content="Projects | Rotaract Club of Zamboanga City West"
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projects | Rotaract Club of Zamboanga City West"
        />
        <meta name="twitter:description" content={description} />
        <link
          rel="canonical"
          href="https://rotaract.rotaryzcwest.org/projects"
        />
        <script type="application/ld+json">
          {serializeJson({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Projects of the Rotaract Club of Zamboanga City West',
            description,
            url: 'https://rotaract.rotaryzcwest.org/projects',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: projects?.length || 0,
              itemListElement: (projects || []).map((project, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://rotaract.rotaryzcwest.org/projects/${project.slug}`,
                name: project.title,
              })),
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main id="main-content">
          <PageHeader
            eyebrow="Community record"
            title="Projects and community work"
            description="Published project records, newest first. Each entry preserves the dates, places, partners, and outcomes supplied by the club."
            asOf={
              featuredProject
                ? `Latest record · ${formatDate(featuredProject.date)}`
                : undefined
            }
          />

          <div className="editorial-shell py-10 md:py-14">
            {isLoading && <ProjectsLoadingState />}

            {isLoadingError && (
              <ProjectsErrorState
                error={error}
                onRetry={() => refetch()}
                isRetrying={isFetching}
              />
            )}

            {!isLoading && !isLoadingError && featuredProject && (
              <>
                <section aria-labelledby="featured-project-heading">
                  <p className="editorial-kicker">Featured record</p>
                  <article className="mt-4 grid gap-7 border-y border-slate-300 py-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
                    {featuredProject.image && (
                      <img
                        {...responsiveImage(
                          featuredProject.image,
                          '(min-width: 1024px) 672px, calc(100vw - 40px)'
                        )}
                        alt={`${featuredProject.title} project record`}
                        className="aspect-[16/10] w-full bg-[#f4f1ec] object-contain"
                      />
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        {formatDate(featuredProject.date)}
                        {featuredProject.category &&
                          ` · ${featuredProject.category}`}
                      </p>
                      <h2
                        id="featured-project-heading"
                        className="mt-3 text-4xl font-semibold leading-tight text-slate-950"
                      >
                        {featuredProject.title}
                      </h2>
                      {featuredProject.venue && (
                        <p className="mt-3 text-sm font-semibold text-slate-700">
                          {featuredProject.venue}
                        </p>
                      )}
                      {featuredProject.shortDescription &&
                        featuredProject.shortDescription.trim() !==
                          featuredProject.title.trim() && (
                          <p className="mt-5 text-base leading-7 text-slate-600">
                            {featuredProject.shortDescription}
                          </p>
                        )}
                      {featuredProject.impact && (
                        <div className="mt-6 border-l-2 border-cranberry-600 pl-4">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                            Reported outcome
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {featuredProject.impact}
                          </p>
                        </div>
                      )}
                      {featuredProject.partners.length > 0 && (
                        <p className="mt-5 text-sm leading-6 text-slate-600">
                          <span className="font-semibold text-slate-900">
                            Partners:
                          </span>{' '}
                          {featuredProject.partners.join(', ')}
                        </p>
                      )}
                      <Link
                        to={`/projects/${featuredProject.slug}`}
                        className="editorial-link mt-6"
                      >
                        Open the full record
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </section>

                {archive.length > 0 && (
                  <section
                    className="mt-14"
                    aria-labelledby="project-archive-heading"
                  >
                    <div className="mb-6 flex items-end justify-between gap-5">
                      <div>
                        <p className="editorial-kicker">Archive</p>
                        <h2
                          id="project-archive-heading"
                          className="mt-2 text-3xl font-semibold text-slate-950"
                        >
                          Earlier project records
                        </h2>
                      </div>
                      <p className="text-sm text-slate-500">
                        {archive.length}{' '}
                        {archive.length === 1 ? 'record' : 'records'}
                      </p>
                    </div>
                    <ProjectsGrid projects={archive} />
                  </section>
                )}
              </>
            )}

            {!isLoading && !isLoadingError && !featuredProject && (
              <p className="border-y border-slate-300 py-10 text-sm text-slate-600">
                No project records have been published yet.
              </p>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
