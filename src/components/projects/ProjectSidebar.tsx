import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { type Project } from '../../data/projects';

type ProjectSidebarProps = {
  project: Project;
};

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {project.partners.map((partner, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-cranberry-500 rounded-full mr-3"></div>
                <span className="text-slate-700 text-sm">{partner}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {project.partnerLinks && project.partnerLinks.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">
              Partner Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.partnerLinks.map((partner, index) => (
                <div key={index}>
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-cranberry-600 hover:text-cranberry-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="text-sm">{partner.name}</span>
                    </a>
                  ) : (
                    <span className="text-slate-700 text-sm">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {project.hashtags && project.hashtags.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Hashtags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.hashtags.map((hashtag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-blue-200 text-blue-600"
                >
                  {hashtag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectSidebar;
