/**
 * The fields of the four forms. Names, and which of them are required, mirror the FORMS table
 * in api/submit.ts: change one and change the other.
 */
import { ACADEMIC_STAGES, DISTRICTS } from '../data/site'
import { EXPERIENCE, QUALIFICATIONS } from '../data/training'
import type { FieldDef } from './EnquiryForm'

export const CONTACT_FIELDS: FieldDef[] = [
  { name: 'firstName', label: 'First Name', required: true, autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last Name', required: true, autoComplete: 'family-name' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'preferred', label: 'Preferred contact method', type: 'radio', options: ['Phone', 'Email'] },
  { name: 'address', label: 'Address', autoComplete: 'street-address' },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'district', label: 'District', type: 'select', options: DISTRICTS },
  { name: 'pin', label: 'PIN Code', autoComplete: 'postal-code', maxLength: 6 },
  {
    name: 'reason',
    label: 'Reason for Inquiry',
    type: 'select',
    required: true,
    options: ['Admission enquiry', 'Schedule a school visit', 'Fee structure and payment', 'Transport and timings', 'Careers at Paradise', 'Something else'],
  },
  {
    name: 'programme',
    label: 'Select a Programme',
    type: 'select',
    required: true,
    options: ['Play Group (Age 3-4)', 'Nursery (Age 4-5)', 'Primary (Grades I-IV)', 'Middle (Grades V-VIII)', 'Not sure yet'],
  },
  { name: 'message', label: 'Message', type: 'textarea', rows: 6 },
  { name: 'enrolled', label: 'Are you an enrolled parent?', type: 'radio', options: ['Yes', 'No'] },
  {
    name: 'source',
    label: 'How did you hear about us?',
    type: 'select',
    options: ['Friends and family', 'Facebook or Instagram', 'Google search', 'A school event', 'Newspaper or flyer', 'Other'],
  },
  { name: 'children', label: 'Number of children?', type: 'select', required: true, options: ['1', '2', '3', '4 or more'] },
  { name: 'newsletter', label: 'Sign up for our newsletter', type: 'checkbox' },
]

/** `stages` are the ones the branch in question teaches, already written as "Nursery (Ages 4–5)". */
export const admissionFields = (stages: string[]): FieldDef[] => [
  { name: 'parentName', label: 'Parent / Guardian Name', required: true, autoComplete: 'name', wide: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
  { name: 'childName', label: "Child's Name", required: true, autoComplete: 'off' },
  { name: 'childDob', label: "Child's Date of Birth", type: 'date', required: true },
  { name: 'stage', label: 'Applying For', type: 'select', required: true, options: stages },
  { name: 'year', label: 'Academic Year', type: 'select', required: true, options: ['2026-27', '2027-28'] },
  { name: 'preferred', label: 'Best way to reach you', type: 'radio', options: ['Phone', 'WhatsApp', 'Email'] },
  { name: 'message', label: 'Anything we should know?', type: 'textarea', rows: 4 },
]

export const FRANCHISE_FIELDS: FieldDef[] = [
  { name: 'name', label: 'Full Name', required: true, autoComplete: 'name', wide: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'location', label: 'Proposed City / Town', required: true, autoComplete: 'address-level2' },
  { name: 'state', label: 'State', required: true, autoComplete: 'address-level1', defaultValue: 'Kerala' },
  { name: 'property', label: 'Do you have a property in mind?', type: 'radio', options: ['I own one', 'I will lease', 'Still looking'] },
  { name: 'investment', label: 'Planned Investment', type: 'select', options: ['Under ₹15 lakh', '₹15-25 lakh', '₹25-40 lakh', 'Above ₹40 lakh', 'Prefer to discuss'] },
  { name: 'timeline', label: 'Hoping to Open', type: 'select', required: true, options: ['Within 6 months', '6-12 months', 'More than a year', 'Just exploring for now'] },
  { name: 'experience', label: 'Have you worked in education before?', type: 'radio', options: ['Yes', 'No'] },
  { name: 'message', label: 'Anything else we should know?', type: 'textarea', rows: 5 },
]

export const TRAINING_FIELDS: FieldDef[] = [
  { name: 'name', label: 'Full Name', required: true, autoComplete: 'name' },
  { name: 'dob', label: 'Date of Birth', type: 'date', required: true, autoComplete: 'bday' },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
  { name: 'district', label: 'District', type: 'select', required: true, options: DISTRICTS, wide: true },
  { name: 'qualification', label: 'Highest Qualification', type: 'select', required: true, options: QUALIFICATIONS },
  { name: 'experience', label: 'Teaching Experience', type: 'select', required: true, options: EXPERIENCE },
  { name: 'stage', label: "Stage You'd Like to Teach", type: 'select', options: [...ACADEMIC_STAGES.map((s) => `${s.title} (${s.range})`), 'Any stage'], wide: true },
  { name: 'arabic', label: 'Can you read and teach Arabic?', type: 'radio', options: ['Yes', 'A little', 'No'] },
  { name: 'message', label: 'Why would you like to teach?', type: 'textarea', rows: 4 },
]
