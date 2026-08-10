import React from 'react';
import { Button } from '@/components/ui/button';

type ErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
  isRetrying?: boolean;
};

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  isRetrying = false,
}) => {
  return (
    <div className="text-center py-20" role="alert">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-800 font-medium mb-2">Failed to load events</p>
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

export default ErrorState;
