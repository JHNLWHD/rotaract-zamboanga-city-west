import React from 'react';
import { Users } from 'lucide-react';
import ProjectCard from './ProjectCard';
import EmptyState from '../ui/EmptyState';
import { type ProjectListItem } from '../../hooks/projects/fetchProjects';

type ProjectsGridProps = {
  projects: ProjectListItem[] | undefined;
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Projects Available"
        description="We're working on documenting our amazing community service projects and initiatives. Check back soon to see the positive impact we're making in Zamboanga City West!"
        actionText="Follow our social media channels to stay updated on our latest projects and community activities"
      />
    );
  }

  return (
    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      role="list"
      aria-label="List of club projects"
    >
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
