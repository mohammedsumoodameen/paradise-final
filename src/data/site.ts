export const PHONE = '+91 9072 500 435'
export const PHONE_HREF = 'tel:+919072500435'
export const WHATSAPP_HREF = 'https://wa.me/919072500435'
export const EMAIL = 'hello@paradisepreschool.in'

/** The name as it is set in the wordmark, the footer and page titles. */
export const SCHOOL = { name: 'Paradise', descriptor: 'Junior School', full: 'Paradise Junior School' }

export const LINKS = {
  /* Sections live on the home page, so they carry the path with them and work from
     anywhere on the site. Pages are bare paths and navigate without a reload. */
  home: '/',
  about: '/#about',
  academics: '/#academics',
  values: '/#values',
  gallerySection: '/#gallery',
  testimonials: '/#testimonials',
  faqs: '/#faqs',
  admissionsSection: '/#admissions',
  admission: '/admissions',
  /** "Plan a Visit" lands on the contact page, where the visit form lives. */
  visit: '/contact',
  contact: '/contact',
  gallery: '/gallery',
  news: '/news',
  pet: '/teacher-training',
  petApply: '/teacher-training#apply',
  petResults: '/teacher-training#selected',
  franchise: '/franchise',
  /* Older anchors, still referenced by components from the previous home page. */
  features: '/#about',
  programs: '/#academics',
  curriculum: '/#academics',
  events: '/news',
  /* Not built yet. Anything set to '#' is left out of the navigation and footer until it
     has somewhere to go - give it a path here and it appears. */
  resources: '#',
  magazines: '#',
  login: '#',
  privacy: '#',
  dataDeletion: '#',
  terms: '#',
}

/** True once a link or social account has a real destination. */
export const isLive = (href: string) => href !== '' && href !== '#'

/** Kerala's fourteen districts, south to north, for the forms that ask where someone is. */
export const DISTRICTS = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam',
  'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod',
]

export const SOCIALS = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
  youtube: '#',
}

export interface NavItem {
  name: string
  /** One line shown beside the links when the item is open. */
  blurb: string
  subLinks: { name: string; href: string }[]
}

/** The four doors into the site. The first link of each is where the item itself leads. */
export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Our Story',
    blurb: 'Who we are, and what we hope every child carries with them.',
    subLinks: [
      { name: 'Our philosophy', href: LINKS.about },
      { name: 'Faith, character & community', href: LINKS.values },
      { name: 'In parents’ words', href: LINKS.testimonials },
      { name: 'Open a Paradise school', href: LINKS.franchise },
    ],
  },
  {
    name: 'Learning',
    blurb: 'One continuous path, from age three to Grade 8.',
    subLinks: [
      { name: 'The learning journey', href: LINKS.academics },
      { name: 'Teacher training', href: LINKS.pet },
      { name: 'PET registration', href: LINKS.petApply },
      { name: 'Selected teachers', href: LINKS.petResults },
    ],
  },
  {
    name: 'School Life',
    blurb: 'The small moments that make up a school day.',
    subLinks: [
      { name: 'Life at school', href: LINKS.gallerySection },
      { name: 'All photographs', href: LINKS.gallery },
      { name: 'News', href: LINKS.news },
    ],
  },
  {
    name: 'Admissions',
    blurb: 'Come and see the school first. The paperwork can wait.',
    subLinks: [
      { name: 'Find your school', href: LINKS.admission },
      { name: 'How admission works', href: LINKS.admissionsSection },
      { name: 'Good to know', href: LINKS.faqs },
      { name: 'Contact us', href: LINKS.contact },
    ],
  },
]

/* ─── Home page copy ──────────────────────────────────────────────────────────
   Everything the home page says lives below, so it can be edited in one place.  */

export const HERO = {
  label: 'A place to belong, believe & become',
  headline: ['Growing Little Hearts.', 'Opening Big Worlds.'],
  text: 'A joyful beginning rooted in faith, curiosity, kindness, and the courage to discover something new every day.',
  cta: { label: 'Plan a Visit', href: LINKS.visit },
  link: { label: 'Explore the learning journey', href: LINKS.academics },
}

export const PHILOSOPHY = {
  label: 'Our philosophy',
  headline: ['We nurture.'],
  /** The four ways a child grows here. Kept to a line each. */
  strands: [
    { word: 'Academically', text: 'Strong foundations in language, number and thinking, built without hurry.' },
    { word: 'Emotionally', text: 'Children who can name a feeling, try again, and know they are safe.' },
    { word: 'Socially', text: 'Sharing a table, listening to a friend, working something out together.' },
    { word: 'Spiritually', text: 'Faith as part of the day itself, lived with gratitude and good character.' },
  ],
}

export const VALUES = {
  label: 'Faith, character & community',
  headline: ['Faith, lived in', 'the small things.'],
  text: 'Our Islamic values are not a subject on the timetable. They are how a morning begins, how a disagreement is settled, and how a friend is treated when no one is watching.',
  items: [
    { word: 'Kindness', text: 'Noticing who has no one to sit beside, and moving over.' },
    { word: 'Gratitude', text: 'A thank-you that is meant, said before it is asked for.' },
    { word: 'Respect', text: 'For teachers, for each other, and for the smallest in the room.' },
    { word: 'Curiosity', text: 'Every “why?” treated as the beginning of something.' },
    { word: 'Responsibility', text: 'Tidying what you took out. Owning what you said.' },
    { word: 'Compassion', text: 'Learning that someone else’s bad day is yours to soften.' },
  ],
}

export const SCHOOL_LIFE = {
  label: 'Life at school',
  headline: ['A school day,', 'in small moments.'],
  text: 'A story shared, a game on the ground, a page read slowly and with care. The small moments are the ones a child carries home.',
  themes: ['Learning together', 'Reading and discovery', 'Art and creative exploration', 'Friendship and play', 'Faith and character'],
}

export const ADMISSIONS = {
  label: 'Admissions',
  headline: ['Every great journey', 'begins somewhere.'],
  text: 'For many children it begins with a walk around a classroom, holding a parent’s hand. Come and see a real morning, meet the teachers, and ask us everything. The paperwork can wait until you are sure.',
  cta: { label: 'Start Your Journey', href: LINKS.admission },
}

export interface AcademicStage {
  /** Anchor-safe id, also used to tie each tab to its panel. */
  id: string
  index: string
  title: string
  /** As printed on the page: 'Ages 3–4', 'Grades 1–4'. */
  range: string
  tagline: string
  text: string
  subjects: string[]
  alt: string
}

/** The three stages shown on the home page's learning journey, in the order they appear. */
export const JOURNEY_STAGES: AcademicStage[] = [
  {
    id: 'kg',
    index: '01',
    title: '2 Year KG',
    range: 'Two years',
    tagline: 'Reading, counting and confidence',
    text: 'Theme-based weeks turn play into early literacy and numeracy. Phonics, letter formation, number sense and daily show-and-tell build the confidence children carry into Grade 1.',
    subjects: ['Phonics', 'Pre-Writing', 'Number Sense', 'Arabic Basics', 'Show & Tell'],
    alt: 'A young child drawing a figure on paper with a crayon.',
  },
  {
    id: 'preschool',
    index: '02',
    title: '3 Year Preschool',
    range: 'Three years',
    tagline: 'First steps, gentle and joyful',
    text: 'Sensory play, rhymes and routine, growing year by year into early reading and counting. Children learn to hold a crayon, name their colours and shapes, and share a table with friends — the quiet groundwork every later skill stands on.',
    subjects: ['Sensory Play', 'Rhymes & Stories', 'Colours & Shapes', 'Motor Skills', 'Social Habits'],
    alt: "A child's hands covered in blue and green paint, spreading it across a sheet of paper.",
  },
  {
    id: 'grade-school',
    index: '03',
    title: 'Grade School',
    range: 'Grades 1–8',
    tagline: 'Strong foundations, English medium',
    text: 'Formal English-medium schooling with a full core of subjects, continuous assessment in place of high-pressure exams, and reading every single day. Values and Quran study run alongside academics, never after them.',
    subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Arabic', 'Malayalam', 'Quran & Values'],
    alt: 'A girl studying a yellow flower through a magnifying glass.',
  },
]

/** The four real stages the school runs, age 3 through Grade 8. */
export const ACADEMIC_STAGES: AcademicStage[] = [
  {
    id: 'play-group',
    index: '01',
    title: 'Play Group',
    range: 'Ages 3–4',
    tagline: 'First steps, gentle and joyful',
    text: 'A settling-in year built on sensory play, rhymes and routine. Children learn to hold a crayon, name their colours and shapes, and share a table with friends — the quiet groundwork every later skill stands on.',
    subjects: ['Sensory Play', 'Rhymes & Stories', 'Colours & Shapes', 'Motor Skills', 'Social Habits'],
    alt: "A child's hands covered in blue and green paint, spreading it across a sheet of paper.",
  },
  {
    id: 'nursery',
    index: '02',
    title: 'Nursery',
    range: 'Ages 4–5',
    tagline: 'Reading, counting and confidence',
    text: 'Theme-based weeks turn play into early literacy and numeracy. Phonics, letter formation, number sense up to twenty and daily show-and-tell build the confidence children carry into Grade 1.',
    subjects: ['Phonics', 'Pre-Writing', 'Number Sense', 'Arabic Basics', 'Show & Tell'],
    alt: 'A young child drawing a figure on paper with a crayon.',
  },
  {
    id: 'primary',
    index: '03',
    title: 'Primary',
    range: 'Grades 1–4',
    tagline: 'Strong foundations, English medium',
    text: 'Formal English-medium schooling with a full core of subjects, continuous assessment in place of high-pressure exams, and reading every single day. Values and Quran study run alongside academics, never after them.',
    subjects: ['English', 'Mathematics', 'EVS', 'Arabic', 'Malayalam', 'Quran & Values'],
    alt: 'A girl studying a yellow flower through a magnifying glass.',
  },
  {
    id: 'middle',
    index: '04',
    title: 'Middle',
    range: 'Grades 5–8',
    tagline: 'Thinking, questioning, leading',
    text: 'Lab science, long-form project work and structured debate move students from remembering to reasoning. Leadership roles, guided research and exam technique prepare them for Grade 9 and the board years ahead.',
    subjects: ['Science', 'Mathematics', 'Social Science', 'English', 'Computer Science', 'Life Skills'],
    alt: 'Three students working through a task together at a classroom computer.',
  },
]

/** The four steps of joining, read left to right in the home page's sideways-scrolling band. */
export const ADMISSION_STEPS = [
  {
    index: '01',
    title: 'Enquire',
    badge: 'The first hello',
    lead: 'A conversation before anything else.',
    text: 'Call or message us. We will talk through the stage your child is ready for and what a week there looks like.',
  },
  {
    index: '02',
    title: 'Visit',
    badge: 'The open door',
    lead: 'See a real morning, not a showcase.',
    text: 'Walk the campus with us, meet the teachers and watch a class in session before you decide anything.',
  },
  {
    index: '03',
    title: 'Apply',
    badge: 'The paperwork',
    lead: 'One simple form, when you are sure.',
    text: "Fill in the admission form with your child's details and previous school records, if there are any.",
  },
  {
    index: '04',
    title: 'Join',
    badge: 'The first day',
    lead: 'A seat kept, and a welcome waiting.',
    text: 'Confirm the seat, collect the welcome kit, and we will see you on the first morning of term.',
  },
]

/** Placeholder answers written from what the site already claims - confirm before launch. */
export const FAQS = [
  {
    q: 'What ages does Paradise take?',
    a: 'Play Group starts at three years old and the school runs through to Grade 8, so a child can stay with us from their very first classroom to their last year of middle school.',
  },
  {
    q: 'When do admissions open?',
    a: 'Seats for the 2026 academic year are open now, across every stage. Enquire early for Play Group and Nursery, where the groups are smallest.',
  },
  {
    q: 'Is the teaching in English?',
    a: 'Yes. Primary and Middle are English medium, with Arabic and Malayalam taught alongside from the early years, and Quran and values study woven through the week rather than added on at the end.',
  },
  {
    q: 'Can we see the school before applying?',
    a: 'Please do. Visits run on weekdays while classes are in session, so you see a normal morning rather than a showcase. Call or message us and we will find a time.',
  },
  {
    q: 'How do you handle assessment?',
    a: 'Continuous assessment through the year in place of high-pressure examinations. Parents hear how their child is doing regularly, not only at report time.',
  },
  {
    q: 'What makes the early years different here?',
    a: 'They are play-based and unhurried. Children learn routines, language and confidence through sensory play, rhymes and structured activity, which is what makes formal schooling feel easy when it arrives.',
  },
]

export const PROGRAMS = [
  { title: 'Play Group', age: '3-4 Years', text: 'Introduction to learning through sensory exploration, basic social skills, and gentle guided play.' },
  { title: 'Nursery', age: '4-5 Years', text: 'Building foundations with structured theme-based activities, reading readiness, and numerical concepts.' },
  { title: 'Primary', age: 'Grades I-IV', text: 'Formal English medium primary education blending academic excellence with core values and ethics.' },
  { title: 'Middle', age: 'Grades V-VIII', text: 'Advanced academics focusing on critical thinking, leadership skills, and complete character development.' },
]

export const TESTIMONIALS = [
  {
    name: 'Saniya Nazar',
    initials: 'SN',
    color: '#fb2f64',
    text: "It's been a great opportunity for my daughter to get close to Quran. She has shown great interest in reciting Surahs. My daughter tries to recite the daily adhkars own her own. The teaching techniques are innovative and deserves appreciation. Overall, there is a remarkable improvement in the spiritual and academic side of my daughter. All thanks to the teachers for their patience and hard work.",
  },
  {
    name: 'Fathima Rizwan',
    initials: 'FR',
    color: '#06437c',
    text: "I have seen a tremendous change in my son after joining Paradise Preschool. His behavior, character, attitude, speech, language & spelling has improved remarkably. The teachers are very dedicated and caring. I'm truly grateful for the positive impact Paradise Preschool has had on my child's overall development.",
  },
  {
    name: 'Aysha Shareef',
    initials: 'AS',
    color: '#60aa48',
    text: "Paradise Preschool has been a wonderful experience for our family. My child has blossomed both academically and socially. The creative teaching methods and the warm, nurturing environment have made learning a joyful experience. We couldn't be happier with the progress our little one has made.",
  },
]

/** Live site fetches these from an API; placeholder values are used here. */
export const STATS = [
  { label: 'Countries', value: 3 },
  { label: 'Schools', value: 152 },
  { label: 'Happy Students', value: 12000 },
  { label: 'Trained Teachers', value: 850 },
]

export const EVENTS = [
  {
    title: 'Annual Day Celebration 2025',
    date: 'March 15, 2025',
    time: '10:00 AM - 2:00 PM',
    text: 'Join us for an exciting annual day filled with performances, art exhibitions, and fun activities by our little stars!',
    alt: 'Children performing during the colorful Annual Day Celebration at Paradise Preschool, Kerala.',
  },
  {
    title: 'Parent-Teacher Conference',
    date: 'March 22, 2025',
    time: '9:00 AM - 12:00 PM',
    text: 'An opportunity for parents and teachers to discuss child development, progress reports, and upcoming curriculum plans.',
    alt: 'Parents and teachers discussing child development at our leading Kerala preschool.',
  },
  {
    title: 'Little Artists Exhibition',
    date: 'April 5, 2025',
    time: '11:00 AM - 3:00 PM',
    text: 'Watch our young learners showcase their creativity through paintings, crafts, and collaborative art projects.',
    alt: 'Young learners showcasing creative paintings at the Paradise Islamic Montessori art exhibition.',
  },
]
