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
  assetTag: string; // e.g. BUPCA-SEW-01
  name: string;
  category: 'High-Speed Sewing Machine' | 'Edging Machine' | 'Heavy Cutting Table' | 'Heat Press' | 'Crafting Station';
  locationId: string;
  locationName: string;
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
