import withTeacher from '../assets/photos/with-teacher.webp'
import fountain from '../assets/photos/fountain.webp'
import colouring from '../assets/photos/colouring.webp'
import bookshelf from '../assets/photos/bookshelf.webp'
import twoFriends from '../assets/photos/two-friends.webp'
import writingHands from '../assets/photos/writing-hands.webp'
import runningGrass from '../assets/photos/running-grass.webp'

export type NewsCategory = 'announcements' | 'events' | 'achievements' | 'community'

export interface NewsStory {
  /** URL-safe id: the story lives at /news/<slug>. */
  slug: string
  title: string
  category: NewsCategory
  /** ISO date (YYYY-MM-DD), so stories sort by plain string comparison. */
  date: string
  /** One or two sentences, shown on the card and as the article's lead. */
  excerpt: string
  /** The rest of the story, one entry per paragraph. */
  body: string[]
  image: string
  width: number
  height: number
  alt: string
}

export const NEWS_CATEGORIES: Record<NewsCategory, { label: string; tone: string }> = {
  announcements: { label: 'Announcement', tone: 'text-accent' },
  events: { label: 'Event', tone: 'text-primary' },
  achievements: { label: 'Achievement', tone: 'text-sunny-dark' },
  community: { label: 'Community', tone: 'text-leaf-dark' },
}

export const NEWS_FILTERS: { id: NewsCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All news' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'events', label: 'Events' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'community', label: 'Community' },
]

const STORIES: NewsStory[] = [
  {
    slug: 'admissions-2027-28-open',
    title: 'Admissions for 2027–28 open on 1 October',
    category: 'announcements',
    date: '2026-09-22',
    excerpt:
      'Applications for Play Group through Grade VIII open next week. Families can book a morning visit now and see a normal school day before they apply.',
    body: [
      'Applications for the 2027–28 academic year open on 1 October, for every stage from Play Group (age 3) through Grade VIII. Places in Play Group and Nursery fill first each year, so we would encourage families with younger children to visit early.',
      'Visits run on weekday mornings while classes are in session. You will meet the principal, walk through the classrooms and garden, and have as long as you need to ask questions. There is no charge and no obligation.',
      'The application itself is short: a form, a copy of the birth certificate, and two passport photographs. For Grade I and above, we also ask for the most recent report card. The admissions office is open from 9:00 AM to 1:00 PM, Monday to Saturday.',
    ],
    image: withTeacher,
    width: 960,
    height: 640,
    alt: 'A girl working through a page at a table while an adult beside her points to the line.',
  },
  {
    slug: 'water-week',
    title: 'Water Week: what a bucket and a sponge can teach',
    category: 'events',
    date: '2026-09-12',
    excerpt:
      'Five days of pouring, squeezing, floating and sinking. Our Nursery children spent the week finding out how water behaves, one soaked sleeve at a time.',
    body: [
      'Water Week started with a simple question from the teachers: how do you move water from one bucket to another without pouring it? By the end of Monday the children had tried cupped hands, sponges, spoons and, briefly, a hat.',
      'The rest of the week built from there. Tuesday was floating and sinking, with a table of leaves, pebbles, corks and keys. Wednesday was measuring, filling bottles to a line. On Thursday the children made rain with a watering can and a sheet of paper, and on Friday they told their parents what they had found out.',
      'None of it looks like a lesson, and that is the point. Children who have squeezed a sponge into a bottle a dozen times understand "full" and "empty", "more" and "less", in a way no worksheet can give them.',
    ],
    image: fountain,
    width: 960,
    height: 768,
    alt: 'A child in a bright tie-dye shirt standing in the spray of a fountain.',
  },
  {
    slug: 'little-artists-exhibition',
    title: 'The Little Artists Exhibition fills the hall',
    category: 'events',
    date: '2026-08-30',
    excerpt:
      'More than two hundred paintings, prints and painted stones, every one of them made by a child. Thank you to everyone who came.',
    body: [
      'For one Saturday the school hall turned into a gallery. Every class, from Play Group to Grade VIII, hung a wall of work made over the term: finger paintings, leaf prints, watercolour landscapes and a long row of painted stones.',
      'The younger children acted as guides, walking their families to their own piece and explaining it at length. Several parents told us it was the first time they had heard the full story behind a drawing that came home in a school bag.',
      'Some of the work is still on display in the corridor by the main office. Families are welcome to see it during any visit.',
    ],
    image: colouring,
    width: 960,
    height: 640,
    alt: 'The hands of a child colouring a printed picture, with pencils spread across the table.',
  },
  {
    slug: 'reading-corner',
    title: 'A new reading corner, stocked by our parents',
    category: 'community',
    date: '2026-08-18',
    excerpt:
      'Over three hundred picture books, donated by families over the summer, now have a home of their own in the primary block.',
    body: [
      'In June we asked families whether they had picture books their children had outgrown. By the end of the holidays the office had run out of shelf space.',
      'Those books now fill a new reading corner in the primary block, with low shelves, floor cushions and a bench by the window. Every class has a fixed half-hour there each week, and children can borrow a book home on Fridays.',
      'Donations are still welcome, in English, Malayalam or Arabic. Please leave them at the front office with your child\'s name and class, so we can thank you properly.',
    ],
    image: bookshelf,
    width: 960,
    height: 540,
    alt: 'A shelf of well-used books standing spine out.',
  },
  {
    slug: 'mud-day',
    title: 'Mud Day, and why we let them get messy',
    category: 'events',
    date: '2026-07-25',
    excerpt:
      'Once a term the garden turns into a mud kitchen. It is loud, it is filthy, and it is one of the most useful mornings of the year.',
    body: [
      'Mud Day is exactly what it sounds like. The garden beds are watered the night before, the children arrive in old clothes, and for one morning nobody is asked to stay clean.',
      'Messy play does real work. Squeezing, scooping and moulding build the hand strength children need before they can hold a pencil comfortably. Making "soup" for a friend is early cooperation. And a child who is happy to get their hands dirty is usually a child who is happy to try.',
      'Thank you to every family who sent a spare set of clothes. The washing machines at home have our sympathy.',
    ],
    image: twoFriends,
    width: 960,
    height: 640,
    alt: 'Two boys sitting outdoors on a sunny day, turned toward each other and laughing.',
  },
  {
    slug: 'district-drawing-competition',
    title: 'Three prizes at the district drawing competition',
    category: 'achievements',
    date: '2026-07-08',
    excerpt:
      'Our Grade III and IV children came home with a first, a second and a special mention from the under-10 category.',
    body: [
      'Eleven of our primary children entered the district drawing competition this year, working to the theme "My Village in the Monsoon". Three of them were placed: a first prize in the under-8 group, a second in the under-10 group, and a special mention for use of colour.',
      'All three pieces were made in the competition hall in ninety minutes, with no help. Their teachers were not allowed in the room, and admit to having found that harder than the children did.',
      'Well done to everyone who took part. The winning drawings will be framed and hung in the reception area.',
    ],
    image: writingHands,
    width: 960,
    height: 640,
    alt: 'A small hand holding a pencil over a page of handwriting practice.',
  },
  {
    slug: 'walking-bus',
    title: 'The walking bus is back for the new term',
    category: 'community',
    date: '2026-06-15',
    excerpt:
      'Two routes, two teachers each, and a line of children in caps. Families living near the school can now sign up for the morning walk.',
    body: [
      'The walking bus is a line of children walking to school together along a fixed route, with a teacher at the front and another at the back. It picks children up at set points each morning, much like a bus, only slower and louder.',
      'This term we are running two routes, both under fifteen minutes. The children arrive having had some fresh air and a chat with their friends, and settle into class noticeably faster than on days they come by car.',
      'To sign your child up, or to volunteer as a parent walker, please speak to the front office.',
    ],
    image: runningGrass,
    width: 960,
    height: 640,
    alt: 'Children running across a sunlit lawn with their arms stretched out like wings.',
  },
]

/** Newest first. */
export const NEWS: NewsStory[] = [...STORIES].sort((a, b) => b.date.localeCompare(a.date))

const DATE_FORMAT = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

/** "22 September 2026". Parsed at noon so no timezone can push it onto another day. */
export const formatNewsDate = (iso: string) => DATE_FORMAT.format(new Date(`${iso}T12:00:00`))

/** Whole minutes at an unhurried reading pace, never less than one. */
export const readingTime = (story: NewsStory) => {
  const words = [story.excerpt, ...story.body].join(' ').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
