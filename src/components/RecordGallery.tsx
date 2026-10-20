import { useId, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { responsiveImage } from '../utils/contentful';

import 'yet-another-react-lightbox/styles.css';

type RecordGalleryProps = {
  images: Array<{ id: string; url: string; caption: string }>;
  heading: string;
  fallbackAlt: string;
};

const RecordGallery = ({
  images,
  heading,
  fallbackAlt,
}: RecordGalleryProps) => {
  const headingId = useId();
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (images.length === 0) return null;

  const slides = images.map(image => ({
    src: image.url,
    alt: image.caption || fallbackAlt,
  }));

  return (
    <>
      <section className="mt-12" aria-labelledby={headingId}>
        <p className="editorial-kicker">Supporting images</p>
        <h2
          id={headingId}
          className="mt-2 text-3xl font-semibold text-slate-950"
        >
          {heading}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              aria-label={`Open image ${index + 1}: ${slides[index].alt}`}
              aria-haspopup="dialog"
              onClick={() => setLightboxIndex(index)}
              className="text-left"
            >
              <img
                {...responsiveImage(
                  image.url,
                  '(min-width: 1024px) 440px, (min-width: 640px) 50vw, calc(100vw - 40px)'
                )}
                alt={slides[index].alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              {image.caption && (
                <span className="mt-2 block text-xs leading-5 text-slate-500">
                  {image.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
      />
    </>
  );
};

export default RecordGallery;
