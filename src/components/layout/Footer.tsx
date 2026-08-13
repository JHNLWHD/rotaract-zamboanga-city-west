import React from 'react';
import { Link } from 'react-router-dom';

const recordLinks = [
  ['Projects', '/projects'],
  ['Events', '/events'],
  ['Officers', '/officers'],
  ['Recognition', '/recognition'],
  ['Foundation giving', '/foundation-giving'],
];

const Footer = () => (
  <footer className="border-t border-slate-200 bg-stone-50 text-slate-700">
    <div className="editorial-shell py-8 md:py-10">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-xl">
          <Link
            to="/"
            aria-label="Rotaract Club of Zamboanga City West home"
            className="inline-block"
          >
            <img
              src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
              alt="Rotaract Club of Zamboanga City West"
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Part of Rotary International District 3850 and sponsored by the
            Rotary Club of Zamboanga City West.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Chartered 6 January 2010 · Club ID 88047 · Zamboanga City,
            Philippines
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Club records
          </h2>
          <nav
            className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Footer navigation"
          >
            {recordLinks.map(([label, path]) => (
              <Link
                key={path}
                to={path}
                className="text-sm text-slate-700 underline-offset-4 hover:text-rotary-magenta hover:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-2 border-t border-slate-200 pr-16 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Rotaract Club of Zamboanga City West</p>
        <a
          href="https://rotaryzcwest.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit underline-offset-4 hover:text-rotary-magenta hover:underline"
        >
          Sponsoring Rotary club
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
