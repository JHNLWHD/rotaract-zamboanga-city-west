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
    <div className="border-y border-slate-300 py-9" role="alert">
      <div>
        <p className="text-red-800 font-medium mb-2">Failed to load events</p>
        <p className="text-red-600 text-sm">
          {error instanceof Error ? error.message : 'Please try again later.'}
        </p>
        {onRetry && (
          <Button
            type="button"
            variant="outline"
            className="mt-4 rounded-none"
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
