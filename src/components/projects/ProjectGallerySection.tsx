import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, ZoomIn } from 'lucide-react';
import { type Project } from '../../data/projects';

type ProjectGallerySectionProps = {
  project: Project;
  onImageClick: (index: number) => void;
};

const ProjectGallerySection: React.FC<ProjectGallerySectionProps> = ({
  project,
  onImageClick,
}) => {
  if (!project.gallery || project.gallery.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Gallery</CardTitle>
        <p className="text-sm text-gray-600">
          Photos and highlights from this community service project
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((photo, idx) => {
            const imageUrl = typeof photo === 'string' ? photo : photo.url;
            const imageCaption =
              typeof photo === 'string'
                ? `${project.title} - Photo ${idx + 1}`
                : photo.caption || `${project.title} - Photo ${idx + 1}`;

            return (
              <div key={idx} className="group relative">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={imageCaption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                    onClick={() => onImageClick(idx)}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center text-gray-400 absolute inset-0">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm">Image {idx + 1}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center rounded-xl">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>

        {project.gallery.length > 6 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {project.gallery.length} photos total • Click any photo to view
              full size
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectGallerySection;
