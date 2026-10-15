export const PHONE = '+91 9072 973 803'
export const PHONE_HREF = 'tel:+919072973803'
export const WHATSAPP_HREF = 'https://wa.me/919072973803'
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
      { name: 'Development, discovery & character', href: LINKS.values },
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
  label: 'Paradise Junior School Network',
  headline: ['Welcome to', 'Paradise.'],
  text: 'A joyful beginning rooted in faith, curiosity, kindness, and the courage to discover something new every day.',
  links: [
    { label: 'Admission', href: LINKS.admission },
    { label: 'Teacher Training', href: LINKS.pet },
    { label: 'Apply for Franchise', href: `${LINKS.franchise}#enquire` },
  ],
}

export const PHILOSOPHY = {
  label: 'Our philosophy',
  headline: ['We nurture.'],
  /** The four ways a child grows here. */
  strands: [
    { word: 'Academically', text: 'Language, Maths and EVS are learned through touch, play and real-life discovery, alongside Quran study and memorization that grow with each child’s pace.' },
    { word: 'Emotionally', text: 'Secure bonds with caring teachers help children feel safe, name their feelings and try new things without fear.' },
    { word: 'Socially', text: 'Shared play and group tasks build empathy, patience, turn-taking and friendship, the skills that shape lifelong relationships.' },
    { word: 'Spiritually', text: 'Quran study and daily-life adhkar, along with gratitude and kindness, give children a sense of purpose, values and wonder.' },
  ],
}

export const VALUES = {
  label: 'Development, discovery & character',
  headline: ['Every child,', 'growing in six ways.'],
  text: 'Our Islamic values are not a subject on the timetable. They are how a morning begins, how a disagreement is settled, and how a friend is treated when no one is watching.',
  items: [
    { word: 'Cognitive', text: 'Maths and EVS learned by touching, sorting, asking and solving.' },
    { word: 'Language', text: 'Five languages, built through rhymes, stories and confident speaking.' },
    { word: 'Physical', text: 'Strong little bodies, through the kids’ gym, sand pit, martial arts and outdoor play.' },
    { word: 'Social & emotional', text: 'Friendship, patience and feelings understood, guided by caring teachers.' },
    { word: 'Creative', text: 'Puppetry, origami, clay and art that give every child a voice.' },
    { word: 'Spiritual & moral', text: 'Quran study, memorization and daily adhkar that shape good character.' },
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
  headline: ['Every month brings', 'a new theme to explore.'],
  text: 'Every month, a new theme. Every theme, special days to celebrate. Come and see a real morning at Paradise, meet the teachers and ask us anything.',
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
export const ADMISSION_STEPS: { index: string; title: string; badge: string; lead?: string; text: string }[] = [
  {
    index: '01',
    title: 'Learning is never so fun.',
    badge: 'Learning by doing',
    lead: 'It’s play with a purpose.',
    text: 'At Paradise, learning is something children do, not something they sit and listen to. Through activities, play and hands-on discovery, Language, Maths and EVS become experiences a child understands and remembers.',
  },
  {
    index: '02',
    title: 'One teacher for every thirteen children.',
    badge: 'The open door',
    text: 'Small groups mean every child is seen, heard and known by name. Our 140+ teachers are trained with Paradise’s own modules, and supported by psychology and ethics teams, so each child gets steady, caring attention.',
  },
  {
    index: '03',
    title: 'Your child grows best when you grow too.',
    badge: 'The paperwork',
    text: 'Paradise brings parents and grandparents into the journey. Our Parenting School helps families support learning at home, and our system keeps you connected to teachers every day.',
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
    name: 'Hiba Fathima',
    relation: 'Mother of Zain',
    initials: 'HF',
    color: '#fb2f64',
    text: 'My son’s bag has no heavy notebooks, but he comes home with a full story every day. Today he told me he made an elephant out of clay. This is real learning, and I can see it.',
  },
  {
    name: 'Afsana Jasmin',
    relation: 'Mother of Diya',
    initials: 'AJ',
    color: '#06437c',
    text: 'My son never finished his lunch at home. Here he eats everything, because the teachers sit with the children and make mealtime a happy time.',
  },
  {
    name: 'Ahana Hadiya',
    relation: 'Mother of Mohammed Amil',
    initials: 'AH',
    color: '#60aa48',
    text: 'My daughter was a little slow to open up. The teachers noticed and gave her time. They never compared her with anyone, and that meant everything to me.',
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
