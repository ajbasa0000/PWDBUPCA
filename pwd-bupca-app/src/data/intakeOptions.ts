import { OfficialDisabilityCategory, IntersectoralSector, EconomicStatus } from '@/types';

export const OFFICIAL_DISABILITY_CATEGORIES: { id: OfficialDisabilityCategory; filipino: string; english: string; desc: string }[] = [
  { id: 'Physical', filipino: 'Pisikal (Physical / Orthopedic)', english: 'Physical / Orthopedic', desc: 'Amputation, paralysis, polio, spinal conditions, mobility limitations' },
  { id: 'Visual Disability', filipino: 'Kapansanan sa Paningin (Visual Disability)', english: 'Visual Disability', desc: 'Low vision, legally blind, total blindness' },
  { id: 'Hard of Hearing', filipino: 'Mahina ang Pandinig (Hard of Hearing)', english: 'Hard of Hearing', desc: 'Mild to severe hearing loss needing hearing aids or quiet environment' },
  { id: 'Deaf', filipino: 'Bingi / Deaf (Sign Language)', english: 'Deaf (FSL / Sign Language)', desc: 'Pre-lingual or profound deafness, Filipino Sign Language users' },
  { id: 'Speech and Language', filipino: 'Pagsasalita at Wika (Speech and Language)', english: 'Speech and Language Impairment', desc: 'Stuttering, dysarthria, apraxia, cleft palate speech differences' },
  { id: 'Intellectual', filipino: 'Intelektwal (Intellectual Disability)', english: 'Intellectual Disability', desc: 'Down syndrome, developmental delay, cognitive development conditions' },
  { id: 'Learning Disability', filipino: 'Kahirapan sa Pagkatuto (Learning Disability)', english: 'Learning Disability', desc: 'Dyslexia, dyscalculia, dysgraphia, auditory processing' },
  { id: 'Psychosocial', filipino: 'Sikososyal (Psychosocial Disability)', english: 'Psychosocial Disability', desc: 'Bipolar disorder, clinical depression, PTSD, anxiety disorder' },
  { id: 'Mental', filipino: 'Kalusugan ng Pag-iisip (Mental Health / Psychiatric)', english: 'Mental Health Condition', desc: 'Chronic mental health conditions requiring medical regimen' },
  { id: 'Cancer', filipino: 'Kanser (Cancer Survivor / Patient)', english: 'Cancer (Under treatment / remission)', desc: 'Protected under RA 11215 and Magna Carta for PWDs' },
  { id: 'Chronic Kidney Disease', filipino: 'Malubhang Sakit sa Bato (CKD / Dialysis)', english: 'Chronic Kidney Disease (CKD)', desc: 'Dialysis patients or chronic stage kidney conditions' },
  { id: 'Multiple Disability', filipino: 'Maramihang Kapansanan (Multiple Disabilities)', english: 'Multiple Disabilities', desc: 'Combination of two or more distinct disability categories' },
  { id: 'Others', filipino: 'Iba pang Kapansanan (Others - Pakitukoy)', english: 'Others (Please specify)', desc: 'Rare diseases, severe autoimmune conditions, and other impairments' },
];

export const INTERSECTORAL_SECTORS: { id: IntersectoralSector; filipino: string; english: string }[] = [
  { id: 'PWD', filipino: 'May Kapansanan (PWD)', english: 'Person with Disability (PWD)' },
  { id: 'Solo Parent', filipino: 'Solong Magulang (Solo Parent)', english: 'Solo Parent (RA 8972 / RA 11861)' },
  { id: 'Women Sector', filipino: 'Sektor ng Kababaihan', english: 'Women Sector' },
  { id: 'Youth Sector', filipino: 'Sektor ng Kabataan', english: 'Youth Sector (15-30 yrs old)' },
  { id: 'Senior', filipino: 'Nakatatanda / Senior Citizen (60+)', english: 'Senior Citizen (60+ years)' },
  { id: 'LGBTQ', filipino: 'LGBTQIA+ Community', english: 'LGBTQIA+ Community' },
  { id: "Women's Survivor", filipino: "Women's Survivor (Proteksyon at Lakas)", english: "Women's Survivor / GAD Support" },
  { id: 'Out of School Youth', filipino: 'Out of School Youth (OSY)', english: 'Out-of-School Youth (OSY)' },
];

export const ECONOMIC_STATUS_OPTIONS: { id: EconomicStatus; filipino: string; english: string }[] = [
  { id: 'Nagtatrabaho (Employed)', filipino: 'Nagtatrabaho (Employed / Wage Worker)', english: 'Employed / Wage Earner' },
  { id: 'Nagnenegosyo (Self-Employed / Business)', filipino: 'Nagnenegosyo (Sari-sari store, Online, Sideline, Crafts)', english: 'Self-Employed / Micro-business' },
  { id: 'Nag-aaral (Student)', filipino: 'Kasalukuyang Nag-aaral (Student)', english: 'Student (High School / College / TechVoc)' },
  { id: 'Out of School Youth', filipino: 'Out of School Youth (OSY)', english: 'Out-of-School Youth' },
  { id: 'Walang Hanapbuhay (Unemployed)', filipino: 'Walang Hanapbuhay / Naghahanap ng Pagkakakitaan', english: 'Currently Unemployed / Seeking livelihood' },
  { id: 'Iba pa (Others)', filipino: 'Iba pa (Pakitukoy sa ibaba)', english: 'Others (Specify below)' },
];

export const SKILLS_INVENTORY_OPTIONS = [
  'Basic Sewing (Manwal na Pananahi)',
  'High-Speed Lockstitch Machine (Makinang High-Speed)',
  'Industrial Edging / Overlock (Makinang Pang-Edging)',
  'Traditional Lola Makina (Makinang Padyak)',
  'Pattern Cutting & Fabric Laying (Paggupit ng Telas at Huwaran)',
  'Upcycled Denim & Canvas Crafting (Paggawa ng Tote Bags)',
  'Pouch & Utility Organizer Making',
  'Hand Embroidery & Fabric Patchwork',
  'Beadwork & Handicrafts',
  'Silkscreen / Heat Press Printing',
  'Quality Control & Final Trimming',
  'Packaging, Tagging & Inventory',
  'Basic Accounting & Sales Recording',
  'Computer & Social Media Marketing',
];

export const SKILLS_TO_LEARN_OPTIONS = [
  'Industrial High-Speed Sewing Operation',
  'Industrial Overlock / Edging Mastery',
  'Professional Tote Bag & Backpack Construction',
  'Zero-Waste Fabric Cutting Techniques',
  'Maintenance & Oiling of Sewing Machinery',
  'Heat Press & Sublimation Printing',
  'Product Costing, Pricing & Bookkeeping',
  'Digital Commerce & Shopee/TikTok Live Selling',
  'Design & Color Coordinated Patchwork',
  'Sign Language (FSL) in the Workshop',
];
