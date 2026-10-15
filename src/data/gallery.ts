import umbrella from '../assets/gallery/gallery7.jpeg'
import chinInHand from '../assets/gallery/gallery5.jpeg'
import flag from '../assets/gallery/gallery6.jpeg'
import paperFlowers from '../assets/gallery/gallery4.jpeg'
import firstDay from '../assets/gallery/gallery3.jpeg'
import twoFlowers from '../assets/gallery/gallery10.jpeg'
import onTheWay from '../assets/gallery/gallery8.jpeg'
import readyToGo from '../assets/gallery/gallery9.jpeg'

export type GalleryCategory = 'play' | 'learning' | 'school-life'

export interface GalleryPhoto {
  src: string
  /** Intrinsic size, so every tile reserves its space before the file lands. */
  width: number
  height: number
  category: GalleryCategory
  /** Two or three words, shown on the tile and under the lightbox. */
  caption: string
  /** What is actually happening in the frame, for screen readers and search. */
  alt: string
}

export const GALLERY_FILTERS: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All photos' },
  { id: 'play', label: 'Play & Activities' },
  { id: 'learning', label: 'Learning' },
  { id: 'school-life', label: 'School Life' },
]

/**
 * Every photograph on file, ordered so the mix of subjects stays varied as the page is read
 * down. Photographs published in Sanity Studio take their place automatically.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: umbrella,
    width: 960,
    height: 1280,
    category: 'school-life',
    caption: 'Rainy day ready',
    alt: 'A smiling girl in the school uniform holding a bright yellow umbrella, her school bag on her back.',
  },
  {
    src: chinInHand,
    width: 764,
    height: 1280,
    category: 'school-life',
    caption: 'All smiles',
    alt: 'A boy in the school uniform and cap sitting on a step, chin resting in his hand and smiling.',
  },
  {
    src: flag,
    width: 960,
    height: 1280,
    category: 'school-life',
    caption: 'Flying the flag',
    alt: 'A boy in uniform waving a small Indian flag in front of the Paradise Junior School sign.',
  },
  {
    src: paperFlowers,
    width: 960,
    height: 1280,
    category: 'play',
    caption: 'Paper flowers',
    alt: 'A girl in the plaid school pinafore tilting her head, holding a bunch of colourful paper flowers.',
  },
  {
    src: firstDay,
    width: 960,
    height: 1280,
    category: 'school-life',
    caption: 'First day',
    alt: 'A boy in his new uniform, cap and school bag standing by a doorway.',
  },
  {
    src: twoFlowers,
    width: 960,
    height: 1280,
    category: 'play',
    caption: 'Made by hand',
    alt: 'A boy in the sports uniform holding up a paper flower in each hand.',
  },
  {
    src: onTheWay,
    width: 960,
    height: 1280,
    category: 'school-life',
    caption: 'On the way',
    alt: 'A boy in uniform smiling on a leafy lane, both hands on the straps of his school bag.',
  },
  {
    src: readyToGo,
    width: 960,
    height: 1280,
    category: 'school-life',
    caption: 'Ready to go',
    alt: 'A boy in uniform with his school bag on, standing beside a wooden bench.',
  },
]

/**
 * The six that carry the home page, in the order its collage hangs them (the frames and their
 * shapes live in components/Gallery.tsx). `span` is kept for the older bento layout.
 */
export const HOME_GALLERY: { photo: GalleryPhoto; span: string }[] = GALLERY_PHOTOS.slice(0, 6).map((photo) => ({
  photo,
  span: 'col-span-1 row-span-2',
}))
