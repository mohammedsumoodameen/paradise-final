import { ACADEMIC_STAGES } from './site'

export interface Branch {
  /** URL-safe id: the branch lives at /admissions/<slug>, and it is what head office sees on an enquiry. */
  slug: string
  /** The town or locality, as parents would say it: "Paradise Kakkanad". */
  name: string
  district: string
  address: string
  phone: string
  /** Ids from ACADEMIC_STAGES: the stages this branch teaches. */
  stages: string[]
  /** Listed on /franchise with a badge, but not open for admission enquiries yet. */
  comingSoon?: boolean
}

/**
 * SAMPLE DATA - replace with the real list of branches before launch.
 *
 * Every branch here gets a card on /admissions and a page of its own with the enquiry form.
 * Adding or removing a branch is only a matter of editing this list; the district filter is
 * built from whatever districts appear in it.
 */
export const BRANCHES: Branch[] = [
  {
    slug: 'kakkanad',
    name: 'Kakkanad',
    district: 'Ernakulam',
    address: 'Seaport-Airport Road, Kakkanad, Kochi 682030',
    phone: '+91 90000 00001',
    stages: ['play-group', 'nursery', 'primary', 'middle'],
  },
  {
    slug: 'aluva',
    name: 'Aluva',
    district: 'Ernakulam',
    address: 'Bank Junction, Aluva 683101',
    phone: '+91 90000 00002',
    stages: ['play-group', 'nursery', 'primary'],
  },
  {
    slug: 'thrissur-town',
    name: 'Thrissur Town',
    district: 'Thrissur',
    address: 'Near Swaraj Round, Thrissur 680001',
    phone: '+91 90000 00003',
    stages: ['play-group', 'nursery', 'primary', 'middle'],
  },
  {
    slug: 'kodungallur',
    name: 'Kodungallur',
    district: 'Thrissur',
    address: 'Temple Road, Kodungallur 680664',
    phone: '+91 90000 00004',
    stages: ['play-group', 'nursery'],
  },
  {
    slug: 'malappuram',
    name: 'Malappuram',
    district: 'Malappuram',
    address: 'Down Hill, Malappuram 676519',
    phone: '+91 90000 00005',
    stages: ['play-group', 'nursery', 'primary', 'middle'],
  },
  {
    slug: 'perinthalmanna',
    name: 'Perinthalmanna',
    district: 'Malappuram',
    address: 'Ooty Road, Perinthalmanna 679322',
    phone: '+91 90000 00006',
    stages: ['play-group', 'nursery', 'primary'],
  },
  {
    slug: 'kozhikode',
    name: 'Kozhikode',
    district: 'Kozhikode',
    address: 'Mavoor Road, Kozhikode 673004',
    phone: '+91 90000 00007',
    stages: ['play-group', 'nursery', 'primary', 'middle'],
  },
  {
    slug: 'kannur',
    name: 'Kannur',
    district: 'Kannur',
    address: 'Thavakkara, Kannur 670001',
    phone: '+91 90000 00008',
    stages: ['play-group', 'nursery'],
  },
  {
    slug: 'palakkad',
    name: 'Palakkad',
    district: 'Palakkad',
    address: 'Stadium Bypass Road, Palakkad 678001',
    phone: '+91 90000 00009',
    stages: ['play-group', 'nursery', 'primary'],
  },
]

/** Districts that actually have a branch, in list order of first appearance. */
export const BRANCH_DISTRICTS = [...new Set(BRANCHES.map((b) => b.district))]

/** Stage records for a branch, for labels like "Play Group · Age 3-4". */
export const branchStages = (branch: Branch) => ACADEMIC_STAGES.filter((s) => branch.stages.includes(s.id))
