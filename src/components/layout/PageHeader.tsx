import React from 'react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  asOf?: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  asOf,
}) => (
  <header className="border-b border-slate-200 bg-[#f4f1ec]">
    <div className="editorial-shell py-7 md:py-14">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] md:items-end">
        <div>
          <p className="editorial-kicker">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] text-slate-950 sm:text-4xl md:text-6xl">
            {title}
          </h1>
        </div>
        <div className="max-w-xl md:justify-self-end">
          {description && (
            <p className="text-base leading-7 text-slate-600 md:text-lg">
              {description}
            </p>
          )}
          {asOf && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {asOf}
            </p>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default PageHeader;
