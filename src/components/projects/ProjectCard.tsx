import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { type ProjectListItem } from '../../hooks/projects/fetchProjects';

type ProjectCardProps = {
  project: ProjectListItem;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 flex flex-col h-full"
      itemScope
      itemType="https://schema.org/Event"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-cranberry-100 to-cranberry-200">
        <img
          src={project.image}
          alt={`${project.title} project header`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <header>
          <CardTitle
            className="text-xl text-slate-900 mb-3 group-hover:text-cranberry-700 transition-colors cursor-pointer"
            itemProp="name"
            onClick={() => navigate(`/projects/${project.slug}`)}
          >
            {project.title}
          </CardTitle>
        </header>

        <p
          className="text-slate-600 mb-4 text-sm leading-relaxed"
          itemProp="description"
        >
          {project.shortDescription}
        </p>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center text-slate-700">
            <Calendar className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
            <span>
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center text-slate-700">
            <MapPin className="w-4 h-4 mr-2 text-cranberry-500 flex-shrink-0" />
            <span className="line-clamp-1">{project.venue}</span>
          </div>
        </div>

        {project.impact && (
          <div className="bg-gradient-to-r from-cranberry-50 to-pink-50 rounded-lg p-3 mb-4 border border-cranberry-100">
            <h4 className="text-xs font-semibold text-cranberry-700 mb-1 uppercase tracking-wide">
              Impact
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {project.impact}
            </p>
          </div>
        )}

        {project.partners && project.partners.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
              Partners
            </h4>
            <div className="flex flex-wrap gap-1">
              {project.partners.slice(0, 3).map((partner, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs py-1 px-2 bg-slate-50 text-slate-600 border-slate-200"
                >
                  {partner}
                </Badge>
              ))}
              {project.partners.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs py-1 px-2 bg-slate-50 text-slate-600 border-slate-200"
                >
                  +{project.partners.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <Button
            className="w-full bg-cranberry-600 hover:bg-cranberry-700 text-white font-medium"
            onClick={() => navigate(`/projects/${project.slug}`)}
          >
            View Project Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
