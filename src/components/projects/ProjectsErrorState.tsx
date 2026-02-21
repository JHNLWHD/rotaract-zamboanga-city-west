import React from 'react';

type ProjectsErrorStateProps = {
  error: unknown;
};

const ProjectsErrorState: React.FC<ProjectsErrorStateProps> = ({ error }) => {
  return (
    <div className="text-center py-20">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-800 font-medium mb-2">Failed to load projects</p>
        <p className="text-red-600 text-sm">
          {error instanceof Error ? error.message : 'Please try again later.'}
        </p>
      </div>
    </div>
  );
};

export default ProjectsErrorState;
