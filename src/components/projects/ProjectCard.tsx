import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type ProjectListItem } from '../../hooks/projects/fetchProjects';
import { responsiveImage } from '../../utils/contentful';

type ProjectCardProps = {
  project: ProjectListItem;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <article
    className="border-t border-slate-300 pt-5"
    role="listitem"
    itemScope
    itemType="https://schema.org/Project"
  >
    {project.image && (
      <Link to={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true">
        <img
          {...responsiveImage(
            project.image,
            '(min-width: 1280px) 592px, (min-width: 768px) 50vw, calc(100vw - 40px)'
          )}
          alt=""
          className="aspect-[16/10] w-full bg-[#f4f1ec] object-contain"
          loading="lazy"
        />
      </Link>
    )}
    <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {new Date(project.date).toLocaleDateString('en-US', {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
      {project.category && ` · ${project.category}`}
    </p>
    <h3
      className="mt-2 text-2xl font-semibold leading-tight text-slate-950"
      itemProp="name"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="hover:text-cranberry-700"
      >
        {project.title}
      </Link>
    </h3>
    {project.shortDescription &&
      project.shortDescription.trim() !== project.title.trim() && (
        <p
          className="mt-3 text-sm leading-6 text-slate-600"
          itemProp="description"
        >
          {project.shortDescription}
        </p>
      )}
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
      {project.venue && <span>{project.venue}</span>}
      {project.partners.length > 0 && (
        <span>{project.partners.length} published partner(s)</span>
      )}
    </div>
    <Link to={`/projects/${project.slug}`} className="editorial-link mt-4">
      View record
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  </article>
);

export default ProjectCard;
