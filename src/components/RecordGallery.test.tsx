import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import RecordGallery from './RecordGallery';

const images = [
  {
    id: 'photo-1',
    url: 'https://images.ctfassets.net/space/one/photo.jpg?fl=progressive',
    caption: 'Volunteers',
  },
  {
    id: 'photo-2',
    url: 'https://images.ctfassets.net/space/two/photo.jpg',
    caption: '',
  },
  {
    id: 'photo-3',
    url: 'https://images.test/three.jpg',
    caption: 'Volunteers',
  },
];
const fallbackAlt = 'Service day gallery image';

describe('RecordGallery', () => {
  it('renders no section or heading for an empty gallery', () => {
    const { container } = render(
      <RecordGallery
        images={[]}
        heading="Project gallery"
        fallbackAlt={fallbackAlt}
      />
    );

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('preserves thumbnail order, responsive sizes, lazy loading, captions, and distinct dialog controls', () => {
    render(
      <RecordGallery
        images={images}
        heading="Project gallery"
        fallbackAlt={fallbackAlt}
      />
    );
    const gallery = screen.getByRole('region', { name: 'Project gallery' });
    const controls = within(gallery).getAllByRole('button');
    const thumbnails = within(gallery).getAllByRole('img');

    expect(controls.map(control => control.getAttribute('aria-label'))).toEqual(
      [
        'Open image 1: Volunteers',
        `Open image 2: ${fallbackAlt}`,
        'Open image 3: Volunteers',
      ]
    );
    for (const control of controls) {
      expect(control).toHaveAttribute('aria-haspopup', 'dialog');
    }
    expect(thumbnails.map(image => image.getAttribute('alt'))).toEqual([
      'Volunteers',
      fallbackAlt,
      'Volunteers',
    ]);
    for (const [index, thumbnail] of thumbnails.entries()) {
      expect(thumbnail).toHaveAttribute('loading', 'lazy');
      expect(new URL(thumbnail.getAttribute('src')!).pathname).toBe(
        new URL(images[index].url).pathname
      );
    }
    for (const thumbnail of thumbnails.slice(0, 2)) {
      expect(thumbnail).toHaveAttribute(
        'sizes',
        '(min-width: 1024px) 440px, (min-width: 640px) 50vw, calc(100vw - 40px)'
      );
      expect(thumbnail.getAttribute('srcset')).toContain('w=320 320w');
      expect(thumbnail.getAttribute('srcset')).toContain('w=1920 1920w');
      expect(
        new URL(thumbnail.getAttribute('src')!).searchParams.get('w')
      ).toBe('960');
    }
    expect(thumbnails[2]).toHaveAttribute('src', images[2].url);
    expect(within(gallery).getAllByText('Volunteers')).toHaveLength(2);
    expect(
      within(controls[1]).queryByText(fallbackAlt)
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('links each gallery to its own generated heading ID', () => {
    render(
      <>
        <RecordGallery
          images={images}
          heading="Project gallery"
          fallbackAlt={fallbackAlt}
        />
        <RecordGallery
          images={images}
          heading="Event gallery"
          fallbackAlt={fallbackAlt}
        />
      </>
    );

    const projectHeading = screen.getByRole('heading', {
      name: 'Project gallery',
    });
    const eventHeading = screen.getByRole('heading', { name: 'Event gallery' });
    expect(projectHeading.id).not.toBe(eventHeading.id);
    expect(
      screen.getByRole('region', { name: 'Project gallery' })
    ).toHaveAttribute('aria-labelledby', projectHeading.id);
    expect(
      screen.getByRole('region', { name: 'Event gallery' })
    ).toHaveAttribute('aria-labelledby', eventHeading.id);
  });

  it('opens the selected image in the real lightbox and restores focus on close', async () => {
    const user = userEvent.setup();
    render(
      <RecordGallery
        images={images}
        heading="Project gallery"
        fallbackAlt={fallbackAlt}
      />
    );
    const control = screen.getByRole('button', {
      name: 'Open image 3: Volunteers',
    });

    await user.click(control);

    const dialog = screen.getByRole('dialog', { name: 'Lightbox' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog.contains(document.activeElement)).toBe(true);
    const slide = within(dialog).getByRole('group', { name: '3 of 3' });
    expect(slide).not.toHaveAttribute('inert');
    expect(
      within(slide).getByRole('img', { name: 'Volunteers' })
    ).toHaveAttribute('src', images[2].url);

    await user.click(within(dialog).getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(control).toHaveFocus();
    expect(
      screen.getByRole('region', { name: 'Project gallery' })
    ).toBeVisible();
  });

  it.each([
    { key: '{Enter}', index: 0 },
    { key: ' ', index: 1 },
  ])(
    'opens image $index with $key and closes with Escape',
    async ({ key, index }) => {
      const user = userEvent.setup();
      render(
        <RecordGallery
          images={images}
          heading="Project gallery"
          fallbackAlt={fallbackAlt}
        />
      );
      const alt = images[index].caption || fallbackAlt;
      const control = screen.getByRole('button', {
        name: `Open image ${index + 1}: ${alt}`,
      });
      control.focus();

      await user.keyboard(key);

      const dialog = screen.getByRole('dialog', { name: 'Lightbox' });
      const slide = within(dialog).getByRole('group', {
        name: `${index + 1} of 3`,
      });
      expect(slide).not.toHaveAttribute('inert');
      expect(within(slide).getByRole('img', { name: alt })).toHaveAttribute(
        'src',
        images[index].url
      );

      await user.keyboard('{Escape}');

      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );
      expect(control).toHaveFocus();
    }
  );
});
