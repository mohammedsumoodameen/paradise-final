/**
 * Everything staff edit in Sanity Studio (studio/), read straight from Sanity's public CDN.
 *
 * Each hook returns `undefined` while its query is in flight, then the published content. If
 * Sanity cannot be reached, or `VITE_SANITY_PROJECT_ID` is not set, it falls back to the copy
 * bundled in src/data, so the site never renders empty. Queries are shared and cached for the
 * visit: two sections asking for the gallery make one request, and a page opened a second
 * time renders at once.
 */
import { useEffect, useState } from 'react'
import ev1 from '../assets/photos/with-teacher.webp'
import ev2 from '../assets/photos/bookshelf.webp'
import ev3 from '../assets/photos/colouring.webp'
import { BRANCHES } from '../data/branches'
import type { Branch } from '../data/branches'
import { GALLERY_PHOTOS, HOME_GALLERY } from '../data/gallery'
import type { GalleryCategory, GalleryPhoto } from '../data/gallery'
import { NEWS } from '../data/news'
import type { NewsCategory, NewsStory } from '../data/news'
import { EVENTS, TESTIMONIALS } from '../data/site'
import { SELECTED_TEACHERS, TRAINING_BATCH } from '../data/training'
import type { SelectedTeacher } from '../data/training'

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const DATASET = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'
const API = PROJECT_ID ? `https://${PROJECT_ID}.apicdn.sanity.io/v2025-02-19/data/query/${DATASET}` : undefined

const pending = new Map<string, Promise<unknown>>()
const settled = new Map<string, unknown>()

function useQuery<Raw, T>(groq: string, map: (raw: Raw) => T, fallback: T): T | undefined {
  const [data, setData] = useState(() => (API ? (settled.get(groq) as T | undefined) : fallback))

  useEffect(() => {
    if (!API || settled.has(groq)) return
    let request = pending.get(groq) as Promise<T> | undefined
    if (!request) {
      request = fetch(`${API}?query=${encodeURIComponent(groq)}`)
        .then(async (res) => {
          if (!res.ok) throw new Error(`status ${res.status}`)
          return map((await res.json()).result as Raw)
        })
        .catch((err) => {
          console.warn('[content] Sanity query failed, using the bundled copy instead:', err)
          return fallback
        })
        .then((value) => {
          settled.set(groq, value)
          return value
        })
      pending.set(groq, request)
    }
    let live = true
    request.then((value) => live && setData(value))
    return () => {
      live = false
    }
  }, [groq, map, fallback])

  return data
}

// ── Images ─────────────────────────────────────────────────────────────────────

interface SanityImage {
  url: string
  alt: string
  width: number
  height: number
}

const IMAGE = `{alt, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}`

/** Never more than 1400px wide, in whatever format the browser handles best. */
const imageSrc = (url: string) => `${url}?w=1400&fit=max&auto=format`

// ── News ───────────────────────────────────────────────────────────────────────

interface RawStory {
  slug: string
  title: string
  category: NewsCategory
  date: string
  excerpt: string
  body: { children?: { text: string }[] }[] | null
  image: SanityImage
}

const NEWS_QUERY = `*[_type == "newsStory" && defined(slug.current)] | order(date desc) {
  "slug": slug.current, title, category, date, excerpt, "body": body[_type == "block"], "image": image${IMAGE}
}`

/**
 * Off while the photographs stored in Sanity are being replaced: the gallery, news and events
 * then show the photographs bundled in src/assets/photos instead, and only the words still come
 * from Sanity. Set it back to true once the Studio holds the school's own pictures.
 */
const USE_SANITY_PHOTOS = false

/** A bundled picture for a story: its own if the slug is one we ship, otherwise the next in turn. */
const bundledNewsImage = (slug: string, i: number) => {
  const { image, width, height, alt } = NEWS.find((n) => n.slug === slug) ?? NEWS[i % NEWS.length]
  return { image, width, height, alt }
}

const mapNews = (raw: RawStory[]): NewsStory[] =>
  raw.map(({ image, body, ...s }, i) => ({
    ...s,
    body: (body ?? []).map((b) => (b.children ?? []).map((c) => c.text).join('')).filter(Boolean),
    ...(USE_SANITY_PHOTOS && image?.url
      ? { image: imageSrc(image.url), width: image.width, height: image.height, alt: image.alt }
      : bundledNewsImage(s.slug, i)),
  }))

/** Newest first. */
export const useNews = () => useQuery(NEWS_QUERY, mapNews, NEWS)

// ── Gallery ────────────────────────────────────────────────────────────────────

interface RawPhoto {
  caption: string
  category: GalleryCategory
  showOnHome: boolean | null
  image: SanityImage
}

export interface Gallery {
  photos: GalleryPhoto[]
  /** Exactly six for the home page bento grid: those ticked for it, topped up from the rest. */
  home: GalleryPhoto[]
}

const GALLERY_QUERY = `*[_type == "galleryPhoto" && defined(image.asset)] | order(order asc) {
  caption, category, showOnHome, "image": image${IMAGE}
}`

const mapGallery = (raw: RawPhoto[]): Gallery => {
  if (!USE_SANITY_PHOTOS) return BUNDLED_GALLERY
  const photos = raw.map(({ image, caption, category }) => ({
    src: imageSrc(image.url),
    width: image.width,
    height: image.height,
    alt: image.alt,
    caption,
    category,
  }))
  const home = [...photos.filter((_, i) => raw[i].showOnHome), ...photos.filter((_, i) => !raw[i].showOnHome)]
  return { photos, home: home.slice(0, 6) }
}

const BUNDLED_GALLERY: Gallery = { photos: GALLERY_PHOTOS, home: HOME_GALLERY.map(({ photo }) => photo) }

export const useGallery = () => useQuery(GALLERY_QUERY, mapGallery, BUNDLED_GALLERY)

// ── Events ─────────────────────────────────────────────────────────────────────

export interface SiteEvent {
  title: string
  /** As shown: "March 15, 2025". */
  date: string
  time: string
  text: string
  image: string
  alt: string
}

interface RawEvent {
  title: string
  date: string
  time: string | null
  description: string
  image: SanityImage
}

const EVENTS_QUERY = `*[_type == "event"] | order(date asc) {title, date, time, description, "image": image${IMAGE}}`

const EVENT_DATE = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

const BUNDLED_EVENT_IMAGES = [ev1, ev2, ev3]
const BUNDLED_EVENT_ALTS = [
  'A girl working through a page at a table while an adult beside her points to the line.',
  'A shelf of well-used books standing spine out.',
  'The hands of a child colouring a printed picture, with pencils spread across the table.',
]

/** The next three coming up; once everything is in the past, the three most recent. */
const mapEvents = (raw: RawEvent[]): SiteEvent[] => {
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = raw.filter((e) => e.date >= today)
  return (upcoming.length ? upcoming.slice(0, 3) : raw.slice(-3)).map((e) => ({
    title: e.title,
    date: EVENT_DATE.format(new Date(`${e.date}T12:00:00`)),
    time: e.time ?? '',
    text: e.description,
    image: imageSrc(e.image.url),
    alt: e.image.alt,
  })).map((e, i) => (USE_SANITY_PHOTOS ? e : { ...e, image: BUNDLED_EVENT_IMAGES[i % 3], alt: BUNDLED_EVENT_ALTS[i % 3] }))
}

const BUNDLED_EVENTS: SiteEvent[] = EVENTS.map((e, i) => ({ ...e, image: BUNDLED_EVENT_IMAGES[i], alt: BUNDLED_EVENT_ALTS[i] }))

export const useEvents = () => useQuery(EVENTS_QUERY, mapEvents, BUNDLED_EVENTS)

// ── Testimonials ───────────────────────────────────────────────────────────────

export interface Testimonial {
  name: string
  initials: string
  color: string
  text: string
}

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) {name, text, color}`

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

const mapTestimonials = (raw: Omit<Testimonial, 'initials'>[]): Testimonial[] =>
  raw.map((t) => ({ ...t, initials: initials(t.name) }))

export const useTestimonials = () => useQuery(TESTIMONIALS_QUERY, mapTestimonials, TESTIMONIALS)

// ── Branches ───────────────────────────────────────────────────────────────────

interface RawBranch extends Omit<Branch, 'comingSoon'> {
  status: 'open' | 'comingSoon'
}

const BRANCHES_QUERY = `*[_type == "branch" && defined(slug.current)] | order(district asc, name asc) {
  "slug": slug.current, name, district, "address": coalesce(address, ""), "phone": coalesce(phone, ""), "stages": coalesce(stages, []), status
}`

const mapBranches = (raw: RawBranch[]): Branch[] => raw.map(({ status, ...b }) => ({ ...b, comingSoon: status === 'comingSoon' }))

/** Every listed school, open and coming soon. Admissions only offers the open ones. */
export const useBranches = () => useQuery(BRANCHES_QUERY, mapBranches, BRANCHES)

/** Districts that have a school, in list order. */
export const districtsOf = (branches: Branch[]) => [...new Set(branches.map((b) => b.district))]

// ── Teacher training ───────────────────────────────────────────────────────────

export interface Training {
  name: string
  /** ISO date (YYYY-MM-DD). */
  announced: string
  reporting: string
  selected: SelectedTeacher[]
}

const TRAINING_QUERY = `*[_id == "trainingBatch"][0] {name, announced, reporting, "selected": selected[]{regNo, name, district}}`

const BUNDLED_TRAINING: Training = { ...TRAINING_BATCH, selected: SELECTED_TEACHERS }

/** Nothing published yet reads as the bundled batch, so the page is never half-filled. */
const mapTraining = (raw: Partial<Training> | null): Training =>
  raw?.name ? { name: raw.name, announced: raw.announced ?? '', reporting: raw.reporting ?? '', selected: raw.selected ?? [] } : BUNDLED_TRAINING

export const useTraining = () => useQuery(TRAINING_QUERY, mapTraining, BUNDLED_TRAINING)
