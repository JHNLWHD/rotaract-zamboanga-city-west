import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { aboutContentQuery } from '../../hooks/contentQueries';

const About = () => {
  const { data, isLoading } = useQuery(aboutContentQuery);

  return (
    <section
      id="club-profile"
      className="editorial-section bg-[#f4f1ec]"
      aria-labelledby="club-profile-heading"
    >
      <div className="editorial-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="editorial-kicker">Club profile</p>
          <h2 id="club-profile-heading" className="editorial-heading mt-3">
            The Great West, in its own words
          </h2>
          <dl className="mt-8 divide-y divide-slate-300 border-y border-slate-300 text-sm">
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-slate-500">Founded</dt>
              <dd className="font-semibold text-slate-900">2010</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-slate-500">District</dt>
              <dd className="font-semibold text-slate-900">3850</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-slate-500">Based in</dt>
              <dd className="font-semibold text-slate-900">
                Zamboanga City, Philippines
              </dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-slate-500">Sponsored by</dt>
              <dd className="font-semibold text-slate-900">
                Rotary Club of Zamboanga City West
              </dd>
            </div>
          </dl>
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-a:text-cranberry-700">
          {isLoading ? (
            <p className="text-slate-500">Loading the club profile…</p>
          ) : data?.ourStory ? (
            <ReactMarkdown>{data.ourStory}</ReactMarkdown>
          ) : (
            <p>
              The club profile will appear here when its public record is
              published.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
