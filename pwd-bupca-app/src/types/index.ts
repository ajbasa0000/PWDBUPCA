export type UserRole = 'superuser' | 'admin' | 'member_operator' | 'customer';

export type DisabilityType = 
  | 'Visual'
  | 'Hearing'
  | 'Physical/Motor'
  | 'Speech'
  | 'Cognitive/Neurodivergent'
  | 'Multiple'
  | 'None';

export interface UserProfile {
  id: string;
  fullName: string;
  username?: string;
  password?: string;
  email?: string;
  role: UserRole;
  disability: DisabilityType;
  phone: string;
  avatar?: string;
}

export type AssetStatus = 'online' | 'in_use' | 'idle' | 'maintenance' | 'offline';

export interface WorkshopLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  contactPerson: string;
  phone: string;
  activeAssetsCount: number;
}

export interface EquipmentAsset {
  id: string;
  assetTag: string; // FA NUMBER: e.g. SM-OM-2024-01, SM-EM-2026-01, SM-HS-2026-01
  name: string;
  category: 
    | 'Industrial High Speed Machine' 
    | 'Industrial Edging Machine' 
    | 'Portable Sewing Machine' 
    | 'Old Sewing Machine' 
    | 'Heavy Cutting Table' 
    | 'Heat Press' 
    | 'Crafting Station';
  brand: 'JUKI INTERNATIONAL' | 'SIRUBA' | 'SINGER' | 'CHINA' | 'OTHER';
  modelOrClass?: string; // e.g. M1-424NS-F, L-1A / MA-F, LOLA MAKINA, DENIM
  serialNo?: string; // e.g. Mfg. No. 1LL9TF1730, Mfg. No. E2200104102
  color?: string; // e.g. WHITE & BLUE, RED, BLACK, GRAY
  madeIn?: string; // e.g. CHINA
  datePurchased?: string;
  
  // Accountability / Memorandum Receipt (MR)
  mrNumber?: string; // MR NO: (Memorandum Receipt)
  issuedTo?: string; // Real Custodian: ROSA ZALUN, JOYZEL SAN VALENTIN, GAYZELLE CALABIO, etc.
  dateIssued?: string;
  purpose?: string;
  conditionUponIssue?: 'Brand New' | 'Slightly Used' | 'Refurbished good as New' | 'Good Condition';
  dateReturned?: string;
  conditionUponReturn?: string;

  // Location & Operational Status
  locationId: string;
  locationName: string; // Specific Pook: 8B CV Francisco Pook Amorsolo, Hardin ng Doña Aurora, Main Hub, etc.
  status: AssetStatus;
  currentOperator?: {
    id: string;
    name: string;
    clockedInAt: string;
  };
  lastMaintenance: string;
  specifications: string;
  weeklyRelocationHistory?: { date: string; from: string; to: string; reason: string }[];
}

export interface DTRRecord {
  id: string;
  assetId: string;
  assetName: string;
  operatorId: string;
  operatorName: string;
  clockIn: string;
  clockOut?: string;
  durationHours?: number;
  materialsUsed: { itemName: string; quantity: number; unit: string }[];
  unitsProduced: number;
  productType: string;
  notes?: string;
}

export interface SupplyItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
  minThreshold: number;
  costPerUnit: number;
  isSubsidized: boolean;
}

export interface SupplyRequest {
  id: string;
  operatorId: string;
  operatorName: string;
  supplyId: string;
  supplyName: string;
  quantityRequested: number;
  unit: string;
  purpose: string;
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected';
  requestDate: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Upcycled Eco-Bags' | 'Fabric Baskets' | 'Denim Pouches' | 'Upcycled Home Crafts';
  image: string;
  stock: number;
  artisanName: string;
  artisanStory: string;
  materialsUsed: string;
  featured?: boolean;
  defaultPieceRate?: number; // Labor piece rate compensation per finished unit (e.g. ₱75/unit)
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'in_production' | 'ready_for_pickup' | 'completed';
  paymentMethod: 'GCash' | 'Bank Transfer' | 'Cash on Pickup';
  paymentProofUrl?: string;
  createdAt: string;
}

export interface ProductProductionOutput {
  productId: string;
  productName: string;
  unitsProduced: number;
  pieceRate: number; // e.g. ₱75 per Signature Eco-Tote, ₱45 per Pouch
  totalEarned: number;
}

export interface PayrollRecord {
  id: string;
  operatorId: string;
  operatorName: string;
  payPeriod: string;
  hoursWorked: number;
  hourlyRate: number; // default ₱85/hr
  hourlyAllowance: number;
  productBreakdown: ProductProductionOutput[];
  totalUnitsProduced: number;
  totalPieceRateEarnings: number;
  materialsSubsidizedValue: number; // 100% grant subsidy covered
  grossPay: number;
  adjustmentsOrBonus?: number;
  netPayout: number;
  status: 'draft' | 'approved' | 'disbursed';
  generatedDate?: string;
}

export interface LivelihoodProgram {
  id: string;
  title: string;
  partner: string;
  description: string;
  deliverables: string[];
  duration?: string;
  capacity?: number;
  activeStatus?: boolean;
}

export interface PartnerClient {
  id: string;
  name: string;
  category: 'Academic & UP Units' | 'Government & City Units' | 'Corporate & Banking' | 'NGO & Civil Society' | 'Community & Fraternal';
  logo: string;
  description?: string;
  collaborationType: 'Training & Facilities' | 'Orders & Client' | 'Advocacy & Grants' | 'Community Partner' | 'Institutional Partner' | 'LGU & Government Sponsor' | 'Corporate Client / Patron' | 'Advocacy & Community';
  websiteUrl?: string;
  activeStatus: boolean;
}

export interface OrgMilestone {
  id: string;
  year: string;
  dateRange: string;
  title: string;
  subtitle?: string;
  category: 'Livelihood' | 'Renovation' | 'Disaster Response' | 'Institutional' | 'Enterprise';
  summary: string;
  achievements: string[];
  partnersInvolved: string[];
  beneficiaryCount?: number;
  grossIncome?: number;
  unitsProduced?: number;
  highlightIcon?: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'Milestone' | 'Event' | 'Training' | 'Partnership' | 'Advocacy';
  publishedDate: string;
  eventDate?: string;
  eventLocation?: string;
  image: string;
  featured?: boolean;
  author: string;
}

export interface CommunityMember {
  id: string;
  preferredName: string;
  artisanRole: string; // e.g. 'Lead Lockstitch Artisan', 'Precision Overlock Finisher'
  determinationFocus: string; // e.g. 'Hearing Determination', 'Mobility Determination', 'Visual Focus' (DPA-compliant celebration)
  bio: string;
  workshopStation: string; // e.g. 'UP CHE Workshop', 'Area 2 Center'
  specialties: string[];
  photo: string;
  featuredProducts?: string[]; // Product IDs linked to their creations
  joinedYear: string;
  consentSigned: boolean; // DPA RA 10173 explicit opt-in confirmation
}

export type ApplicationType = 'pwd_membership' | 'livelihood_membership' | 'both';

export type DisabilityVisibility = 'apparent' | 'non_apparent' | 'none';

export type OfficialDisabilityCategory =
  | 'Physical'
  | 'Intellectual'
  | 'Learning Disability'
  | 'Psychosocial'
  | 'Mental'
  | 'Hard of Hearing'
  | 'Deaf'
  | 'Visual Disability'
  | 'Speech and Language'
  | 'Cancer'
  | 'Chronic Kidney Disease'
  | 'Multiple Disability'
  | 'Others';

export type IntersectoralSector = 
  | 'PWD'
  | 'Solo Parent'
  | 'Women Sector'
  | 'Youth Sector'
  | 'Senior'
  | 'LGBTQ'
  | "Women's Survivor"
  | 'Out of School Youth';

export type EconomicStatus = 
  | 'Nagtatrabaho (Employed)'
  | 'Nagnenegosyo (Self-Employed / Business)'
  | 'Nag-aaral (Student)'
  | 'Out of School Youth'
  | 'Walang Hanapbuhay (Unemployed)'
  | 'Iba pa (Others)';

export type ApplicationStatus = 'pending_review' | 'approved' | 'needs_info' | 'rejected';

export interface MembershipApplication {
  id: string;
  referenceNumber: string; // e.g., APP-2026-0012
  applicationType: ApplicationType;
  
  // Demographics
  fullName: string; // PANGALAN
  gender: 'Lalaki (Male)' | 'Babae (Female)' | 'LGBTQ+' | 'Mas pinipiling huwag sabihin (Prefer not to say)';
  birthdate: string;
  address: string; // TIRAHAN (e.g. 8B CV Francisco St., Pook Amorsolo, UP Campus)
  contactNo: string;
  
  // PWD Details
  isPwd: boolean; // IKAW BA AY PWD?
  hasPwdId: 'may_id' | 'wala' | 'processing'; // MAY ID O WALA
  pwdIdNo?: string;
  disabilityVisibility?: DisabilityVisibility; // URI NG KAPANSANAN (APPARENT/NON APPARENT)
  disabilityCategories: OfficialDisabilityCategory[]; // KATEGORYA NG KAPANSANAN
  disabilitySpecifyOthers?: string;
  
  // Intersectoral & Economic Status
  sectors: IntersectoralSector[]; // SECTOR NA KINABIBILANGAN
  economicStatus: EconomicStatus;
  economicStatusOthers?: string;
  
  // Skills & Training Aspirations
  existingSkills: string[]; // ANU ANG IYONG SKILLS? (e.g. Basic Sewing, Pattern Cutting, Handicrafts)
  skillsToLearn: string[]; // ANU ANG MGA KASANAYAN NA GUSTONG MATUTUNAN (e.g. Industrial High-Speed Sewing, Edging/Overlock, Bag Making)
  isLivelihoodMemberInterest: boolean; // MIYEMBRO BA KAYO NG LIVELIHOOD PROGRAM O GUSTONG SUMALI?
  
  // Guardian / Parent Support (if assisted)
  guardianName?: string; // PANGALAN NG GUARDIAN/MAGULANG
  guardianSkills?: string[]; // ANU ANG SKILLS NG MAGULANG O GUARDIAN
  guardianContact?: string;
  
  // Metadata & Review Workflow
  assignedMembershipNo?: string; // When approved: e.g. BUPCA-MEM-2026-045
  status: ApplicationStatus;
  submissionDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  dpaConsent: boolean; // RA 10173 Data Privacy Act consent
}

export interface TrainingCohort {
  id: string;
  title: string;
  targetSkill: string; // e.g. Industrial High-Speed Sewing Operation
  partnerLead?: string; // e.g. UP College of Home Economics (CHE)
  locationName: string; // e.g. UP CHE Workshop or Area 2 Center
  schedule: string; // e.g. Saturdays, 8:00 AM - 12:00 PM
  capacity: number;
  enrolledApplicantIds: string[]; // Applicant IDs of enrolled members
  assignedAssetTags?: string[]; // e.g. SM-HS-2026-01, SM-EM-2026-02
  status: 'planning' | 'active' | 'completed';
  startDate?: string;
  notes?: string;
}


