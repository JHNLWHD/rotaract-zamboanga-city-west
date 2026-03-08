import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-cranberry-600 mb-4" />
        <p className="text-slate-600">Loading events...</p>
      </div>
    </div>
  );
};

export default LoadingState;
