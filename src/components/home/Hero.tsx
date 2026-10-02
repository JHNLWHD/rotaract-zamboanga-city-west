import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import {
  heroContentQuery,
  aboutContentQuery,
} from '../../hooks/contentQueries';
import { responsiveImage } from '../../utils/contentful';

const Hero = () => {
  const { data: hero } = useQuery(heroContentQuery);
  const { data: about } = useQuery(aboutContentQuery);

  const image =
    about?.image?.url ||
    '/lovable-uploads/77e591d9-27b0-4497-b290-8fa95806ace4.png';

  return (
    <section className="bg-[#faf9f7]" aria-labelledby="home-heading">
      <div className="editorial-shell py-7 md:py-14 lg:py-16">
        <div className="grid gap-6 md:gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="editorial-kicker">
              {hero?.badgeText || 'Official club record'}
            </p>
            <h1
              id="home-heading"
              className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-950 sm:mt-4 sm:text-6xl sm:leading-[0.98]"
            >
              Rotaract Club of Zamboanga City West
            </h1>
            <div className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:mt-6 md:text-lg">
              {hero?.subTitle ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p>{children}</p>,
                  }}
                >
                  {hero.subTitle}
                </ReactMarkdown>
              ) : (
                <p>
                  A public record of the Great West’s community work,
                  leadership, recognition, and Rotary affiliation.
                </p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 md:mt-7">
              <a href="#club-profile" className="editorial-link">
                Get to Know Great West
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="/projects" className="editorial-link">
                View our projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure>
            <img
              {...responsiveImage(
                image,
                '(min-width: 1024px) 640px, calc(100vw - 40px)'
              )}
              alt={
                about?.image?.description ||
                'Members and partners of the Rotaract Club of Zamboanga City West'
              }
              className="aspect-video w-full object-cover sm:aspect-[16/10]"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-500">
              {about?.image?.description ||
                'Great West members and partners during a club activity in Zamboanga City.'}
            </figcaption>
          </figure>
        </div>

        <dl className="mt-6 grid grid-cols-2 border-y border-slate-300 md:mt-10 lg:grid-cols-4">
          <div className="border-b border-r border-slate-200 py-3 pr-3 md:py-4 lg:border-b-0">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Chartered
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">
              6 January 2010 · Club ID 88047
            </dd>
          </div>
          <div className="border-b border-slate-200 py-3 pl-3 md:py-4 md:pl-5 lg:border-b-0 lg:border-r">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              District
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">
              Rotary International District 3850
            </dd>
          </div>
          <div className="border-r border-slate-200 py-3 pr-3 md:py-4 lg:pl-5">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Sponsoring club
            </dt>
            <dd className="mt-1">
              <a
                href="https://rotaryzcwest.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-5 text-cranberry-700"
              >
                Rotary Club of Zamboanga City West
              </a>
            </dd>
          </div>
          <div className="py-3 pl-3 md:py-4 md:pl-5">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Institutional reference
            </dt>
            <dd className="mt-1">
              <a
                href="https://www.rotary.org/en/get-involved/rotaract-clubs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-5 text-cranberry-700"
              >
                About Rotaract at Rotary International
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Hero;
