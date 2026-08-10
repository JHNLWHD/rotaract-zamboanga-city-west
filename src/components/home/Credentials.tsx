import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Award,
  ExternalLink,
  Landmark,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../hooks/projects/fetchProjects';
import { cacheConfig } from '../../config/cache';

const SPONSOR_URL = 'https://rotaryzcwest.org/';

const Credentials = () => {
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
    refetch: refetchProjects,
    isFetching: projectsFetching,
  } = useQuery({
    queryKey: ['credentialProjects'],
    queryFn: () => fetchProjects(5),
    ...cacheConfig.monthly,
  });

  return (
    <section
      id="credentials"
      className="section-container bg-white"
      aria-labelledby="credentials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-cranberry-700 mb-3">
            Proof before participation
          </p>
          <h2
            id="credentials-heading"
            className="text-section-title text-slate-900 mb-6"
          >
            Our <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Verify who we are, what we have done, and how the club is led.
          </p>
        </div>

        <div className="modern-card px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-7 w-7 shrink-0 text-cranberry-600" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cranberry-700">
                Rotary sponsorship
              </p>
              <p className="text-sm text-slate-600">
                Sponsored by the Rotary Club of Zamboanga City West.
              </p>
            </div>
          </div>
          <a
            href={SPONSOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-cranberry-700 whitespace-nowrap"
          >
            Visit Rotary Club site
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div
          id="flagship-projects"
          className="mt-8 rounded-3xl bg-slate-50 border border-slate-200 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cranberry-700 mb-2">
                Community impact
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                Featured project evidence
              </h3>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cranberry-700"
            >
              View all projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {projectsLoading && (
            <p className="text-slate-600">Loading recent project records…</p>
          )}

          {!projectsLoading && projectsError && (
            <div className="flex flex-wrap items-center gap-4" role="alert">
              <p className="text-slate-600">
                Project records are temporarily unavailable. You can still
                browse the complete project archive.
              </p>
              <button
                type="button"
                onClick={() => refetchProjects()}
                disabled={projectsFetching}
                className="text-sm font-semibold text-cranberry-700 underline underline-offset-4 disabled:opacity-50"
              >
                {projectsFetching ? 'Trying again…' : 'Try again'}
              </button>
            </div>
          )}

          {!projectsLoading &&
            !projectsError &&
            projects &&
            projects.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {projects.map(project => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-cranberry-300 transition-colors"
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt=""
                        className="w-full aspect-[4/3] object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="p-4">
                      <p className="font-semibold text-slate-900 text-sm line-clamp-3">
                        {project.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      {(project.impact || project.shortDescription) && (
                        <p className="text-xs text-slate-600 mt-3 line-clamp-3">
                          {project.impact || project.shortDescription}
                        </p>
                      )}
                      {project.partners.length > 0 && (
                        <p className="text-xs text-slate-500 mt-3 line-clamp-2">
                          Partners: {project.partners.join(', ')}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

          {!projectsLoading &&
            !projectsError &&
            (!projects || projects.length === 0) && (
              <p className="text-slate-600">
                Project records will appear here as they are published.
              </p>
            )}
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-8">
          <Link
            to="/recognition"
            className="modern-card p-6 group hover:-translate-y-1 transition-transform"
          >
            <Award className="h-8 w-8 text-cranberry-600 mb-5" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Recognition
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Awards, certificates, and official citations earned by the club.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-cranberry-700">
              View recognition
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>

          <Link
            to="/officers"
            className="modern-card p-6 group hover:-translate-y-1 transition-transform"
          >
            <Users className="h-8 w-8 text-cranberry-600 mb-5" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Club officers
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Meet the people responsible for the club’s current Rotary Year.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-cranberry-700">
              Meet the officers
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>

          <Link
            to="/foundation-giving"
            className="modern-card p-6 group hover:-translate-y-1 transition-transform"
          >
            <Landmark className="h-8 w-8 text-cranberry-600 mb-5" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Foundation giving
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Review our five-year Rotary Foundation giving record.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-cranberry-700">
              View giving record
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="primary-button inline-flex">
            Contact the club
            <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
