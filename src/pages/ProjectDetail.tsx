import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { serializeJson } from '../utils/seo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ExternalLink, Loader2, Share2 } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import ShareModal from '../components/ShareModal';
import ProjectNotFound from '../components/projects/ProjectNotFound';
import RecordUnavailable from '../components/RecordUnavailable';
import { useProjectBySlug } from '../hooks/projects/useProjectBySlug';
import type { ProjectPartnerLinks } from '../hooks/projects/fetchProjects';
import { responsiveImage } from '../utils/contentful';

import 'yet-another-react-lightbox/styles.css';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const ProjectDetail = () => {
  const { slug } = useParams();
  const {
    data: project,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useProjectBySlug(slug);
  const [showShareModal, setShowShareModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main
          id="main-content"
          className="editorial-shell flex min-h-[24rem] items-center gap-3 text-sm text-slate-600"
        >
          <Loader2
            className="h-5 w-5 animate-spin text-cranberry-700"
            aria-hidden="true"
          />
          Loading project record…
        </main>
        <Footer />
      </div>
    );
  }

  if (isError && !project)
    return (
      <RecordUnavailable
        kind="Project"
        onRetry={refetch}
        isRetrying={isFetching}
      />
    );
  if (!project) return <ProjectNotFound />;

  const canonical = `https://rotaract.rotaryzcwest.org/projects/${project.slug}`;
  const description =
    project.shortDescription.trim() !== project.title.trim()
      ? project.shortDescription
      : project.impact || 'Published project record from the club archive.';
  const summary =
    description.length > 220
      ? `${description.slice(0, 217).trim()}…`
      : description;
  const partners: ProjectPartnerLinks = project.partnerLinks?.length
    ? project.partnerLinks
    : project.partners.map(name => ({ name }));
  const slides = project.gallery.map(image => ({
    src: image.url,
    alt: image.caption || `${project.title} gallery image`,
  }));

  return (
    <>
      <Helmet>
        <title>{project.title} | Rotaract Club of Zamboanga City West</title>
        <meta name="description" content={summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={summary} />
        <meta
          property="og:image"
          content={
            project.image || 'https://rotaract.rotaryzcwest.org/og-image.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={summary} />
        <meta
          name="twitter:image"
          content={
            project.image || 'https://rotaract.rotaryzcwest.org/og-image.png'
          }
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {serializeJson({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: project.title,
            description: summary,
            datePublished: project.date,
            image: [
              project.image,
              ...project.gallery.map(image => image.url),
            ].filter(Boolean),
            author: {
              '@type': 'Organization',
              name: 'Rotaract Club of Zamboanga City West',
              url: 'https://rotaract.rotaryzcwest.org',
            },
            about: project.category,
            locationCreated: project.venue,
            mainEntityOfPage: canonical,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main id="main-content">
          <PageHeader
            eyebrow={project.category || 'Project record'}
            title={project.title}
            asOf={`${formatDate(project.date)} · ${project.venue}`}
          />

          <div className="editorial-shell py-8 md:py-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link to="/projects" className="editorial-link">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Project archive
              </Link>
              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share record
              </button>
            </div>

            {project.image && (
              <figure className="mt-7 bg-[#f4f1ec]">
                <img
                  {...responsiveImage(
                    project.image,
                    '(min-width: 1024px) 960px, calc(100vw - 40px)'
                  )}
                  alt={`${project.title} project record`}
                  className="max-h-[32rem] w-full object-contain"
                />
              </figure>
            )}

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <article>
                <section aria-labelledby="project-about-heading">
                  <p className="editorial-kicker">Project narrative</p>
                  <h2
                    id="project-about-heading"
                    className="mt-2 text-3xl font-semibold text-slate-950"
                  >
                    About this project
                  </h2>
                  <div className="prose prose-lg prose-slate mt-5 max-w-none prose-headings:font-display prose-a:text-cranberry-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {project.description}
                    </ReactMarkdown>
                  </div>
                </section>

                {project.impact && (
                  <section className="mt-10 border-l-2 border-cranberry-600 pl-5">
                    <p className="editorial-kicker">Reported outcome</p>
                    <p className="mt-3 text-base leading-7 text-slate-700">
                      {project.impact}
                    </p>
                  </section>
                )}

                {project.highlights.length > 0 && (
                  <section
                    className="mt-10"
                    aria-labelledby="highlights-heading"
                  >
                    <h2
                      id="highlights-heading"
                      className="text-2xl font-semibold text-slate-950"
                    >
                      Published highlights
                    </h2>
                    <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-300">
                      {project.highlights.map(highlight => (
                        <li
                          key={highlight}
                          className="py-3 text-sm leading-6 text-slate-700"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.gallery.length > 0 && (
                  <section
                    className="mt-12"
                    aria-labelledby="project-gallery-heading"
                  >
                    <p className="editorial-kicker">Supporting images</p>
                    <h2
                      id="project-gallery-heading"
                      className="mt-2 text-3xl font-semibold text-slate-950"
                    >
                      Project gallery
                    </h2>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      {project.gallery.map((image, index) => (
                        <button
                          key={image.id}
                          type="button"
                          aria-label={`Open image ${index + 1}: ${image.caption || `${project.title} gallery image`}`}
                          aria-haspopup="dialog"
                          onClick={() => setLightboxIndex(index)}
                          className="text-left"
                        >
                          <img
                            {...responsiveImage(
                              image.url,
                              '(min-width: 1024px) 440px, (min-width: 640px) 50vw, calc(100vw - 40px)'
                            )}
                            alt={
                              image.caption || `${project.title} gallery image`
                            }
                            className="aspect-[4/3] w-full object-cover"
                            loading="lazy"
                          />
                          {image.caption && (
                            <span className="mt-2 block text-xs leading-5 text-slate-500">
                              {image.caption}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              <aside
                className="border-t-2 border-slate-950 pt-5"
                aria-label="Project record details"
              >
                <h2 className="text-xl font-semibold text-slate-950">
                  Record details
                </h2>
                <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-300 text-sm">
                  <div className="py-3.5">
                    <dt className="text-slate-500">Date</dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {formatDate(project.date)}
                    </dd>
                  </div>
                  <div className="py-3.5">
                    <dt className="text-slate-500">Venue</dt>
                    <dd className="mt-1 font-semibold leading-6 text-slate-900">
                      {project.venue}
                    </dd>
                  </div>
                  <div className="py-3.5">
                    <dt className="text-slate-500">Area of work</dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {project.category}
                    </dd>
                  </div>
                </dl>

                {partners.length > 0 && (
                  <section
                    className="mt-7"
                    aria-labelledby="project-partners-heading"
                  >
                    <h2
                      id="project-partners-heading"
                      className="text-xl font-semibold text-slate-950"
                    >
                      Partners
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {partners.map(partner => (
                        <li key={partner.name}>
                          {partner.url ? (
                            <a
                              href={partner.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-cranberry-700"
                            >
                              {partner.name}
                              <ExternalLink
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            </a>
                          ) : (
                            partner.name
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.facebookLink && (
                  <a
                    href={project.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link mt-7"
                  >
                    View published social record
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </aside>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        content={{
          title: project.title,
          description: summary,
          date: project.date,
          venue: project.venue,
          shareableLink: project.shareableLink,
          category: project.category,
        }}
        contentType="project"
      />
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
      />
    </>
  );
};

export default ProjectDetail;
