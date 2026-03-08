import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Share2 } from 'lucide-react';
import { type Project } from '../../data/projects';

type ProjectDetailHeaderProps = {
  project: Project;
  onShare: () => void;
};

const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({
  project,
  onShare,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          <Badge className="bg-cranberry-100 text-cranberry-700 border-cranberry-200">
            Community Service
          </Badge>
          {project.category && (
            <Badge
              variant="outline"
              className="border-slate-300 text-slate-600"
            >
              {project.category}
            </Badge>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Project
        </Button>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {project.title}
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-3 text-cranberry-500" />
          <div>
            <div className="font-medium">
              {new Date(project.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-3 text-cranberry-500" />
          <div>
            <div className="font-medium">{project.venue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
