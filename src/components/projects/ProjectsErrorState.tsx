import React from 'react';
import { Button } from '@/components/ui/button';

type ProjectsErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
  isRetrying?: boolean;
};

const ProjectsErrorState: React.FC<ProjectsErrorStateProps> = ({
  error,
  onRetry,
  isRetrying = false,
}) => {
  return (
    <div className="text-center py-20" role="alert">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-800 font-medium mb-2">Failed to load projects</p>
        <p className="text-red-600 text-sm">
          {error instanceof Error ? error.message : 'Please try again later.'}
        </p>
        {onRetry && (
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={onRetry}
            disabled={isRetrying}
          >
            {isRetrying ? 'Trying again…' : 'Try again'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectsErrorState;
