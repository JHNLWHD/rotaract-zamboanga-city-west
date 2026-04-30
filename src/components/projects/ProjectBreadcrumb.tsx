import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Project } from '../../hooks/projects/fetchProjects';

type ProjectBreadcrumbProps = {
  project: Project;
};

const ProjectBreadcrumb: React.FC<ProjectBreadcrumbProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
      <button
        onClick={() => navigate('/projects')}
        className="hover:text-cranberry-600 transition-colors"
      >
        Projects
      </button>
      <span>/</span>
      <span className="text-slate-900 font-medium">{project.title}</span>
    </nav>
  );
};

export default ProjectBreadcrumb;
