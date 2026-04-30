import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  Share2,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import DownloadPlugin from 'yet-another-react-lightbox/plugins/download';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import { type Project } from '../../hooks/projects/fetchProjects';

type ProjectMainContentProps = {
  project: Project;
  onShare: () => void;
};

const ProjectMainContent: React.FC<ProjectMainContentProps> = ({
  project,
  onShare,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health & Wellness':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Education & Youth':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Environment':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Food Security':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Community Development':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        <div className="aspect-video relative">
          <img
            src={project.image}
            alt={`${project.title} - Community service project in ${project.venue}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {project.title}
              </h1>
              <Badge className={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                className="border-cranberry-200 text-cranberry-600 hover:bg-cranberry-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(project.facebookLink, '_blank')}
                className="border-cranberry-200 text-cranberry-600 hover:bg-cranberry-50"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center text-slate-700">
              <Calendar className="w-5 h-5 mr-3 text-cranberry-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm">{formatDate(project.date)}</p>
              </div>
            </div>
            <div className="flex items-center text-slate-700">
              <MapPin className="w-5 h-5 mr-3 text-cranberry-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Venue</p>
                <p className="text-sm">{project.venue}</p>
              </div>
            </div>
          </div>

          {project.description ? (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                About This Project
              </h2>
              <div className="text-slate-700 leading-relaxed prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-strong:font-semibold prose-ul:my-2 prose-li:my-1">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cranberry-600 hover:text-cranberry-700 underline inline-flex items-center gap-1"
                      >
                        {props.children}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ),
                  }}
                >
                  {project.description}
                </ReactMarkdown>
              </div>
            </div>
          ) : null}

          {project.bulletPoints && project.bulletPoints.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Key Activities
              </h2>
              <ul className="space-y-2">
                {project.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-cranberry-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.impact && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Impact
              </h2>
              <div className="bg-gradient-to-r from-cranberry-50 to-pink-50 rounded-lg p-6 border border-cranberry-100">
                <p className="text-slate-700 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-cranberry-500 mr-2 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Gallery</CardTitle>
                <p className="text-sm text-gray-600">
                  Photos and highlights from this project
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <div className="aspect-square relative flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={`${project.title} - Main project image`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setLightboxIndex(0);
                          setLightboxOpen(true);
                        }}
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900">
                        {project.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Main Project Image
                      </p>
                    </div>
                  </div>

                  {project.gallery.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className="bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square relative flex items-center justify-center">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            setLightboxIndex(idx + 1);
                            setLightboxOpen(true);
                          }}
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900">
                          {photo.caption}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {photo.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {project.gallery.length + 1 > 6 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      {project.gallery.length + 1} photos total • Click any
                      photo to view full size
                    </p>
                  </div>
                )}
                <Lightbox
                  open={lightboxOpen}
                  close={() => setLightboxOpen(false)}
                  index={lightboxIndex}
                  slides={[
                    {
                      src: project.image,
                      alt: `${project.title} - Main project image`,
                      download: project.image,
                      description: `${project.title} - Main project image`,
                    },
                    ...project.gallery.map(photo => ({
                      src: photo.url,
                      alt: photo.caption,
                      download: photo.url,
                      description: photo.caption,
                    })),
                  ]}
                  plugins={[Captions, DownloadPlugin, Thumbnails]}
                  captions={{
                    descriptionTextAlign: 'center',
                    descriptionMaxLines: 3,
                  }}
                />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default ProjectMainContent;
