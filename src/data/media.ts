/**
 * Every photograph and clip the home page uses, in one place. To replace one, drop the new
 * file into src/assets and change the import here; nothing else needs touching. Sizes are the
 * files' own pixel dimensions, so the browser can hold the space before the image arrives.
 *
 * Everything here is placeholder photography, openly licensed, and none of it was taken at
 * Paradise: replace it with the school's own before launch. Sources and licences are listed in
 * src/assets/photos/SOURCES.md and src/assets/academics/SOURCES.md.
 */
import heroDesktop from '../assets/hero/hero-1920.mp4'
import heroMobile from '../assets/hero/hero-1280.mp4'
import heroPoster from '../assets/hero/hero-poster.webp'
import play from '../assets/academics/play.webp'
import nursery from '../assets/academics/nursery.webp'
import primary from '../assets/academics/primary.webp'
import middle from '../assets/academics/middle.webp'
import readingTogether from '../assets/photos/reading-together.webp'
import drawingTable from '../assets/photos/drawing-table.webp'
import quietReading from '../assets/photos/quiet-reading.webp'
import runningPath from '../assets/photos/running-path.webp'

export interface Photo {
  src: string
  width: number
  height: number
  alt: string
}

export const HERO_MEDIA = {
  video: { desktop: heroDesktop, mobile: heroMobile },
  poster: heroPoster,
  /** Describes the clip for screen readers; it is otherwise decorative and silent. */
  alt: 'Children playing together in a sunlit classroom, steering cardboard cars they have built around a paper traffic light.',
}

/** One per learning stage, in the same order as ACADEMIC_STAGES (alt text lives with the stage). */
export const STAGE_MEDIA: Omit<Photo, 'alt'>[] = [
  { src: play, width: 1024, height: 685 },
  { src: nursery, width: 1024, height: 768 },
  { src: primary, width: 1024, height: 683 },
  { src: middle, width: 1024, height: 683 },
]

export const PHILOSOPHY_MEDIA: { main: Photo; detail: Photo; caption: string } = {
  main: {
    src: readingTogether,
    width: 960,
    height: 1438,
    alt: 'Two young children standing in a meadow in low evening sun, heads together over an open book.',
  },
  detail: {
    src: drawingTable,
    width: 960,
    height: 640,
    alt: 'A girl in a yellow top drawing at a white table, coloured pencils beside her and a teddy bear looking on.',
  },
  caption: 'A book shared, and a drawing begun.',
}

export const VALUES_MEDIA: Photo & { caption: string } = {
  src: quietReading,
  width: 1600,
  height: 1100,
  alt: 'A boy in a purple shirt sitting quietly, reading from the Quran open in his hands.',
  caption: 'A quiet page, read with care.',
}

export const ADMISSIONS_MEDIA: Photo = {
  src: runningPath,
  width: 960,
  height: 640,
  alt: 'A group of children running up a red-earth path between green trees, laughing.',
}
