export interface SelectedTeacher {
  /** PET registration number, as printed on the candidate's hall ticket. */
  regNo: string
  name: string
  district: string
}

/**
 * The batch whose results are currently published. Change these two lines and the list below
 * when a new batch is announced; the page reads everything from here.
 */
export const TRAINING_BATCH = {
  name: 'Batch 2026-27',
  announced: '2026-09-20',
  /** When and where selected candidates report, shown above the list. */
  reporting: 'Selected candidates will be contacted by phone with their reporting date and centre.',
}

/**
 * SAMPLE DATA - replace with the real selection list before launch.
 *
 * Only what a candidate needs to find themselves: registration number, name and district.
 * Keep phone numbers, marks and other personal details off this list - it is public.
 */
export const SELECTED_TEACHERS: SelectedTeacher[] = [
  { regNo: 'PET26-0014', name: 'Aysha Fathima K', district: 'Malappuram' },
  { regNo: 'PET26-0027', name: 'Fathima Rinsha P', district: 'Kozhikode' },
  { regNo: 'PET26-0031', name: 'Hiba Sherin M', district: 'Malappuram' },
  { regNo: 'PET26-0048', name: 'Nasreena Beegum A', district: 'Ernakulam' },
  { regNo: 'PET26-0052', name: 'Shahana Parveen T', district: 'Thrissur' },
  { regNo: 'PET26-0066', name: 'Ansila Nazar', district: 'Kannur' },
  { regNo: 'PET26-0073', name: 'Muhammed Shafi C', district: 'Palakkad' },
  { regNo: 'PET26-0089', name: 'Rahmath Beevi S', district: 'Ernakulam' },
  { regNo: 'PET26-0095', name: 'Sumayya Jabin', district: 'Kozhikode' },
  { regNo: 'PET26-0102', name: 'Najla Thasni V', district: 'Malappuram' },
  { regNo: 'PET26-0117', name: 'Afeefa Hameed', district: 'Thrissur' },
  { regNo: 'PET26-0124', name: 'Jumana Sherin K P', district: 'Kannur' },
]

export const QUALIFICATIONS = [
  'Plus Two / Higher Secondary',
  'TTC / D.El.Ed',
  'Montessori / Pre-primary training',
  "Bachelor's degree",
  'B.Ed',
  "Master's degree",
  'Other',
]

export const EXPERIENCE = ['No teaching experience yet', 'Less than 1 year', '1-3 years', 'More than 3 years']
