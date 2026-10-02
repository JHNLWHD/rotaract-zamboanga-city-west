import React from 'react';
import { Loader2 } from 'lucide-react';

const ProjectsLoadingState: React.FC = () => {
  return (
    <div className="flex items-center gap-3 border-y border-slate-300 py-10 text-sm text-slate-600">
      <Loader2 className="h-5 w-5 animate-spin text-cranberry-700" />
      <p>Loading project records…</p>
    </div>
  );
};

export default ProjectsLoadingState;
