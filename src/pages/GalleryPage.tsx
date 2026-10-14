import { useCallback, useEffect, useMemo, useState } from 'react'
import { PageHead, useTitle } from '../components/page'
import { ArrowLink, Chevron, Modal, Reveal } from '../components/ui'
import { GALLERY_FILTERS } from '../data/gallery'
import type { GalleryCategory } from '../data/gallery'
import { LINKS } from '../data/site'
import { useGallery } from '../lib/content'

/** Every photograph, filterable by kind. Any of them opens large, with arrows to walk through the rest. */
export default function GalleryPage() {
  useTitle('Gallery')
  const gallery = useGallery()
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all')
  const [open, setOpen] = useState<number | null>(null)

  const photos = useMemo(() => (gallery?.photos ?? []).filter((p) => filter === 'all' || p.category === filter), [gallery, filter])
  const shown = open === null ? undefined : photos[open]

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, step])

  return (
    <div className="page wrap">
      <PageHead eyebrow="Gallery" lines={['Life at school.']}>
        <p>The small moments that make up a school day: a book shared between two, a game on the ground, a page read slowly and with care.</p>
      </PageHead>

      <div className="chips" role="group" aria-label="Filter photographs">
        {GALLERY_FILTERS.map((f) => (
          <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <ul className="gallery">
        {photos.map((p, i) => (
          <Reveal as="li" key={p.src} delay={(i % 3) * 60}>
            <button type="button" className="media media--foot gallery__tile" onClick={() => setOpen(i)} aria-label={`Open photograph: ${p.caption}`}>
              <img src={p.src} width={p.width} height={p.height} alt={p.alt} loading="lazy" />
              <span className="gallery__caption">{p.caption}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Modal open={!!shown} onClose={() => setOpen(null)} label="Photograph" className="modal--photo">
        {shown && (
          <figure className="lightbox">
            <img src={shown.src} width={shown.width} height={shown.height} alt={shown.alt} />
            <figcaption>
              <button type="button" className="round-btn" onClick={() => step(-1)} aria-label="Previous photograph">
                <Chevron dir="left" />
              </button>
              <span>
                <strong>{shown.caption}</strong>
                <small>
                  {(open ?? 0) + 1} of {photos.length}
                </small>
              </span>
              <button type="button" className="round-btn" onClick={() => step(1)} aria-label="Next photograph">
                <Chevron />
              </button>
            </figcaption>
          </figure>
        )}
      </Modal>

      <Reveal className="closing">
        <h2 className="display display--sm">
          Come and see a real morning<span className="hl">.</span>
        </h2>
        <p>Photographs only go so far. Visits run on weekdays while classes are in session, so you see the school exactly as it is.</p>
        <ArrowLink to={LINKS.visit}>Plan a Visit</ArrowLink>
      </Reveal>
    </div>
  )
}
