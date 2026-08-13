import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { fetchHeroContent } from '../../hooks/landing-page/heroSection';
import { fetchAboutCommunity } from '../../hooks/landing-page/aboutCommunity';
import { cacheConfig } from '../../config/cache';

const Hero = () => {
  const { data: hero } = useQuery({
    queryKey: ['heroContent'],
    queryFn: fetchHeroContent,
    ...cacheConfig.yearly,
  });
  const { data: about } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: fetchAboutCommunity,
    ...cacheConfig.yearly,
  });

  const image =
    about?.image?.url ||
    '/lovable-uploads/77e591d9-27b0-4497-b290-8fa95806ace4.png';

  return (
    <section className="bg-[#faf9f7]" aria-labelledby="home-heading">
      <div className="editorial-shell py-10 md:py-14 lg:py-16">
        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="editorial-kicker">
              {hero?.badgeText || 'Official club record'}
            </p>
            <h1
              id="home-heading"
              className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-slate-950 sm:text-6xl"
            >
              Rotaract Club of Zamboanga City West
            </h1>
            <div className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
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
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
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
              src={image}
              alt={
                about?.image?.description ||
                'Members and partners of the Rotaract Club of Zamboanga City West'
              }
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-500">
              {about?.image?.description ||
                'Great West members and partners during a club activity in Zamboanga City.'}
            </figcaption>
          </figure>
        </div>

        <dl className="mt-10 grid border-y border-slate-300 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-slate-200 py-4 sm:border-r lg:border-b-0">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Chartered
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">
              6 January 2010 · Club ID 88047
            </dd>
          </div>
          <div className="border-b border-slate-200 py-4 sm:pl-5 lg:border-b-0 lg:border-r">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              District
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">
              Rotary International District 3850
            </dd>
          </div>
          <div className="border-b border-slate-200 py-4 sm:border-b-0 sm:border-r lg:pl-5">
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
          <div className="py-4 sm:pl-5">
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
