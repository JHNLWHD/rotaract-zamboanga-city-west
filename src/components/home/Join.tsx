import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  APPLICATIONS_OPEN,
  MEMBERSHIP_APPLICATION_FORM,
} from '@/config/membership';

const Join = () => {
  if (!APPLICATIONS_OPEN) return null;

  return (
    <section
      id="join"
      className="editorial-section bg-cranberry-50"
      aria-labelledby="applications-heading"
    >
      <div className="editorial-shell grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="editorial-kicker">Seasonal notice</p>
          <h2
            id="applications-heading"
            className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl"
          >
            Membership applications are open
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            The current intake form includes the application requirements and
            next steps.
          </p>
        </div>
        <a
          href={MEMBERSHIP_APPLICATION_FORM}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 bg-cranberry-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cranberry-800"
        >
          Open the application form
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Join;
