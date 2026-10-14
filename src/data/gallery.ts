import runningGrass from '../assets/photos/running-grass.webp'
import withTeacher from '../assets/photos/with-teacher.webp'
import swings from '../assets/photos/swings.webp'
import blocks from '../assets/photos/blocks.webp'
import colouring from '../assets/photos/colouring.webp'
import twoFriends from '../assets/photos/two-friends.webp'
import fountain from '../assets/photos/fountain.webp'
import alphabet from '../assets/photos/alphabet.webp'
import byTheWater from '../assets/photos/by-the-water.webp'
import onTheGround from '../assets/photos/on-the-ground.webp'
import bookshelf from '../assets/photos/bookshelf.webp'
import highSwing from '../assets/photos/high-swing.webp'
import writingHands from '../assets/photos/writing-hands.webp'

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
 * Every photograph on file, ordered so the mix of shapes and subjects stays varied as the
 * page is read down. These are openly licensed placeholders (see src/assets/photos/SOURCES.md);
 * photographs published in Sanity Studio take their place automatically.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: runningGrass,
    width: 960,
    height: 640,
    category: 'play',
    caption: 'Out on the grass',
    alt: 'Children running across a sunlit lawn with their arms stretched out like wings.',
  },
  {
    src: withTeacher,
    width: 960,
    height: 640,
    category: 'learning',
    caption: 'One to one',
    alt: 'A girl working through a page at a table while an adult beside her points to the line.',
  },
  {
    src: swings,
    width: 960,
    height: 640,
    category: 'play',
    caption: 'On the swings',
    alt: 'Girls laughing together on a row of playground swings.',
  },
  {
    src: blocks,
    width: 960,
    height: 640,
    category: 'play',
    caption: 'Building blocks',
    alt: 'A close view of brightly coloured wooden building blocks stacked together.',
  },
  {
    src: colouring,
    width: 960,
    height: 640,
    category: 'learning',
    caption: 'Colouring in',
    alt: 'The hands of a child colouring a printed picture, with pencils spread across the table.',
  },
  {
    src: twoFriends,
    width: 960,
    height: 640,
    category: 'school-life',
    caption: 'Two friends',
    alt: 'Two boys sitting outdoors on a sunny day, turned toward each other and laughing.',
  },
  {
    src: fountain,
    width: 960,
    height: 768,
    category: 'play',
    caption: 'Splash',
    alt: 'A child in a bright tie-dye shirt standing in the spray of a fountain.',
  },
  {
    src: alphabet,
    width: 960,
    height: 636,
    category: 'learning',
    caption: 'Letters first',
    alt: 'An alphabet worksheet on a dark desk with coloured pencils lying beside it.',
  },
  {
    src: byTheWater,
    width: 960,
    height: 640,
    category: 'school-life',
    caption: 'Side by side',
    alt: 'Two girls sitting together on the grass, looking out over the water.',
  },
  {
    src: onTheGround,
    width: 960,
    height: 640,
    category: 'play',
    caption: 'Small discoveries',
    alt: 'A girl crouched on the ground outdoors, absorbed in something she has found.',
  },
  {
    src: bookshelf,
    width: 960,
    height: 540,
    category: 'school-life',
    caption: 'The reading shelf',
    alt: 'A shelf of well-used books standing spine out.',
  },
  {
    src: highSwing,
    width: 960,
    height: 640,
    category: 'play',
    caption: 'As high as it goes',
    alt: 'A child at the top of a swing, outlined against a pale sky.',
  },
  {
    src: writingHands,
    width: 960,
    height: 640,
    category: 'learning',
    caption: 'Pencil work',
    alt: 'A small hand holding a pencil over a page of handwriting practice.',
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
