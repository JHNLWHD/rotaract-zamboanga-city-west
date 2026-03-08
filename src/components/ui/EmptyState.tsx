import React from 'react';
import { LucideIcon } from 'lucide-react';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  className?: string;
  size?: 'small' | 'large';
};

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText = 'Stay connected with our social media for updates',
  className = '',
  size = 'large',
}) => {
  if (size === 'small') {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 max-w-md mx-auto">
          <Icon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-800 font-medium mb-2">{title}</p>
          <p className="text-slate-600 text-sm">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center py-20 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cranberry-100 to-cranberry-200 rounded-full flex items-center justify-center mb-8">
          <Icon className="w-12 h-12 text-cranberry-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">{description}</p>
        <div className="bg-cranberry-50 border border-cranberry-200 rounded-lg p-6">
          <p className="text-cranberry-800 font-medium text-sm">
            🌟 {actionText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
