import React from 'react';
import ProjectCard from './ProjectCard';
import { type ProjectListItem } from '../../hooks/projects/fetchProjects';

type ProjectsGridProps = {
  projects: ProjectListItem[] | undefined;
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  if (!projects?.length) {
    return (
      <p className="border-y border-slate-300 py-8 text-sm text-slate-600">
        No project records have been published yet.
      </p>
    );
  }

  return (
    <div
      className="grid gap-x-8 gap-y-10 md:grid-cols-2"
      role="list"
      aria-label="Club project records"
    >
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
