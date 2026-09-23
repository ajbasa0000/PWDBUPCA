import { 
  WorkshopLocation, 
  EquipmentAsset, 
  SupplyItem, 
  StoreProduct, 
  StoreOrder, 
  DTRRecord, 
  PayrollRecord,
  UserProfile 
} from '@/types';

export const mockLocations: WorkshopLocation[] = [
  {
    id: 'loc-1',
    name: 'UP CHE Community Workshop',
    address: 'UP College of Home Economics, Alonso Hall, UP Diliman, Quezon City',
    lat: 14.6548,
    lng: 121.0682,
    contactPerson: 'Ate Gloria (Supervisor)',
    phone: '+63 917 123 4567',
    activeAssetsCount: 4,
  },
  {
    id: 'loc-2',
    name: 'Barangay UP Campus Area 2 Center',
    address: 'J.P. Laurel St., Area 2, Brgy. UP Campus, Diliman, Quezon City',
    lat: 14.6591,
    lng: 121.0715,
    contactPerson: 'Kuya Ramon (Logistics Lead)',
    phone: '+63 918 987 6543',
    activeAssetsCount: 3,
  },
  {
    id: 'loc-3',
    name: 'PWD BUPCA Main Headquarters & Hub',
    address: 'Pook Dagohoy, Brgy. UP Campus, Diliman, Quezon City',
    lat: 14.6515,
    lng: 121.0645,
    contactPerson: 'Pres. Marilyn Morales',
    phone: '+63 920 555 1212',
    activeAssetsCount: 2,
  },
];

export const mockAssets: EquipmentAsset[] = [
  {
    id: 'ast-1',
    assetTag: 'BUPCA-SEW-01',
    name: 'Juki High-Speed Industrial Lockstitch #1',
    category: 'High-Speed Sewing Machine',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'online',
    currentOperator: {
      id: 'usr-101',
      name: 'Elena Santos (PWD Member - Hearing Impaired)',
      clockedInAt: '08:15 AM Today',
    },
    lastMaintenance: '2026-03-10',
    specifications: 'Direct-drive high-speed industrial lockstitch for heavy canvas & denim upcycling.',
    weeklyRelocationHistory: [
      { date: '2026-03-01', from: 'PWD BUPCA Main HQ', to: 'UP CHE Community Workshop', reason: 'Assigned for CHE partnership training session' }
    ]
  },
  {
    id: 'ast-2',
    assetTag: 'BUPCA-EDGE-01',
    name: 'Siruba 4-Thread Overlock Edging Machine',
    category: 'Edging Machine',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'online',
    currentOperator: {
      id: 'usr-102',
      name: 'Ramil Bautista (PWD Member - Mobility Impaired)',
      clockedInAt: '08:45 AM Today',
    },
    lastMaintenance: '2026-02-18',
    specifications: 'High-speed differential feed overedging for clean eco-bag seam finishes.',
  },
  {
    id: 'ast-3',
    assetTag: 'BUPCA-SEW-02',
    name: 'Juki High-Speed Industrial Lockstitch #2',
    category: 'High-Speed Sewing Machine',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'idle',
    lastMaintenance: '2026-03-12',
    specifications: 'Servo motor with ergonomic accessible knee lifter.',
  },
  {
    id: 'ast-4',
    assetTag: 'BUPCA-CUT-01',
    name: 'Master Industrial Fabric Rotary Cutting Table',
    category: 'Heavy Cutting Table',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'in_use',
    currentOperator: {
      id: 'usr-103',
      name: 'Carla De Leon (PWD Member - Low Vision)',
      clockedInAt: '09:00 AM Today',
    },
    lastMaintenance: '2026-01-20',
    specifications: 'Adjustable height table for wheelchair accessibility with high-contrast measurement grid.',
  },
  {
    id: 'ast-5',
    assetTag: 'BUPCA-PRESS-01',
    name: 'Digital Clamshell Heat Press (Labeling)',
    category: 'Heat Press',
    locationId: 'loc-3',
    locationName: 'PWD BUPCA Main Headquarters & Hub',
    status: 'maintenance',
    lastMaintenance: '2026-03-15',
    specifications: 'Transfers official BUPCA UP Gawad Tsanselor badges and woven labels to finished bags.',
  }
];

export const mockDTRRecords: DTRRecord[] = [
  {
    id: 'dtr-1',
    assetId: 'ast-1',
    assetName: 'Juki High-Speed Lockstitch #1',
    operatorId: 'usr-101',
    operatorName: 'Elena Santos',
    clockIn: '2026-03-22 08:15',
    durationHours: 4.5,
    materialsUsed: [
      { itemName: 'Recycled Denim Scraps', quantity: 3.5, unit: 'meters' },
      { itemName: 'Heavy-Duty Nylon Thread', quantity: 1, unit: 'spool' }
    ],
    unitsProduced: 12,
    productType: 'Upcycled Denim Eco-Tote',
    notes: 'Morning batch completed. Machines running smoothly.'
  },
  {
    id: 'dtr-2',
    assetId: 'ast-2',
    assetName: 'Siruba 4-Thread Overlock Machine',
    operatorId: 'usr-102',
    operatorName: 'Ramil Bautista',
    clockIn: '2026-03-22 08:45',
    durationHours: 4.0,
    materialsUsed: [
      { itemName: 'Cotton Scrap Liners', quantity: 2.0, unit: 'meters' }
    ],
    unitsProduced: 16,
    productType: 'Handwoven Cloth Storage Basket',
    notes: 'Edged seams for all baskets.'
  }
];

export const mockSupplies: SupplyItem[] = [
  {
    id: 'sup-1',
    name: 'Donated Upcycled Denim & Canvas Scraps',
    category: 'Raw Fabrics',
    unit: 'meters',
    stock: 245,
    minThreshold: 50,
    costPerUnit: 0,
    isSubsidized: true,
  },
  {
    id: 'sup-2',
    name: 'Heavy Duty Reinforced Thread (Black & Beige)',
    category: 'Notions',
    unit: 'spools',
    stock: 48,
    minThreshold: 15,
    costPerUnit: 45,
    isSubsidized: true,
  },
  {
    id: 'sup-3',
    name: 'Brass Heavy-Duty Zippers (8-inch)',
    category: 'Hardware',
    unit: 'pieces',
    stock: 120,
    minThreshold: 30,
    costPerUnit: 18,
    isSubsidized: true,
  },
  {
    id: 'sup-4',
    name: 'PWD BUPCA Official Woven Label Tags',
    category: 'Branding',
    unit: 'pieces',
    stock: 350,
    minThreshold: 100,
    costPerUnit: 8,
    isSubsidized: true,
  },
  {
    id: 'sup-5',
    name: 'Cotton Webbing Straps (1.5 inch)',
    category: 'Handles & Straps',
    unit: 'meters',
    stock: 180,
    minThreshold: 40,
    costPerUnit: 15,
    isSubsidized: true,
  }
];

export const mockProducts: StoreProduct[] = [
  {
    id: 'prod-1',
    name: 'BUPCA Signature Upcycled Denim Tote Bag',
    description: 'Eco-friendly and durable tote bag crafted from upcycled jeans and donated heavy canvas. Features double-stitched cotton webbing handles, inner pocket, and authentic BUPCA artisan woven patch.',
    price: 380,
    category: 'Upcycled Eco-Bags',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    stock: 35,
    artisanName: 'Elena Santos & Nanay Linda',
    artisanStory: 'Crafted at UP CHE Workshop. Elena is deaf-mute artisan who mastered high-speed sewing machine operation through UP CHE and BUPCA livelihood trainings.',
    materialsUsed: 'Upcycled denim remnants, 100% cotton lining, heavy duty canvas base.',
    featured: true,
    defaultPieceRate: 75
  },
  {
    id: 'prod-2',
    name: 'Handcrafted Foldable Fabric Bread & Storage Basket',
    description: 'Flexible storage basket made of interwoven repurposed textile trimmings. Perfect for tabletop organizing, pantry goods, or planters.',
    price: 250,
    category: 'Fabric Baskets',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    stock: 22,
    artisanName: 'Ramil Bautista',
    artisanStory: 'Ramil, who uses a wheelchair, leads overlock edging and precision fabric folding at Area 2 Community Center.',
    materialsUsed: 'Repurposed floral cotton textiles, reinforced interlining.',
    featured: true,
    defaultPieceRate: 55
  },
  {
    id: 'prod-3',
    name: 'Compact Multi-Compartment Denim Utility Pouch',
    description: 'Zip pouch tailored for art pens, makeup, toiletries, or tech cables. Built with robust brass zippers and scratch-resistant recycled denim.',
    price: 195,
    category: 'Denim Pouches',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    stock: 40,
    artisanName: 'Carla De Leon',
    artisanStory: 'Carla utilizes high-contrast measuring grids to craft symmetrical pouch designs with zero fabric waste.',
    materialsUsed: 'Heavy denim cuts, brass zipper, waterproof polyester liner.',
    featured: true,
    defaultPieceRate: 45
  },
  {
    id: 'prod-4',
    name: 'PWD BUPCA Community Patchwork Apron',
    description: 'Artisan work apron stitched from durable canvas offcuts. Designed with wide multi-tool pockets, adjustable neck strap, and reinforced stress points.',
    price: 420,
    category: 'Upcycled Home Crafts',
    image: 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?auto=format&fit=crop&q=80&w=800',
    stock: 18,
    artisanName: 'PWD BUPCA Sewing Circle',
    artisanStory: 'Joint production batch made by a team of 4 PWD member apprentices earning while learning industrial sewing.',
    materialsUsed: 'Heavyweight upcycled twill and duck canvas.',
    featured: false,
    defaultPieceRate: 85
  }
];

export const mockOrders: StoreOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'BUPCA-2026-089',
    customerName: 'Prof. Maria Cristina Fernandez (UP Diliman)',
    phone: '+63 917 888 2233',
    address: 'Faculty Center, UP Diliman, Quezon City',
    items: [
      { productId: 'prod-1', productName: 'BUPCA Signature Upcycled Denim Tote Bag', price: 380, quantity: 2 },
      { productId: 'prod-3', productName: 'Compact Denim Utility Pouch', price: 195, quantity: 1 }
    ],
    totalAmount: 955,
    status: 'in_production',
    paymentMethod: 'GCash',
    createdAt: '2026-03-21 14:20',
  },
  {
    id: 'ord-1002',
    orderNumber: 'BUPCA-2026-090',
    customerName: 'BPI UP Campus Branch',
    phone: '+63 920 444 1122',
    address: 'BPI Bldg., E. Jacinto St., UP Diliman, Quezon City',
    items: [
      { productId: 'prod-1', productName: 'BUPCA Signature Upcycled Denim Tote Bag', price: 380, quantity: 15 }
    ],
    totalAmount: 5700,
    status: 'ready_for_pickup',
    paymentMethod: 'Bank Transfer',
    createdAt: '2026-03-20 10:15',
  }
];

export const mockPayrolls: PayrollRecord[] = [
  {
    id: 'pay-01',
    operatorId: 'usr-101',
    operatorName: 'Elena Santos',
    payPeriod: 'March 01 - March 15, 2026',
    hoursWorked: 48,
    hourlyRate: 85,
    hourlyAllowance: 48 * 85, // ₱4,080
    productBreakdown: [
      {
        productId: 'prod-1',
        productName: 'BUPCA Signature Upcycled Denim Tote Bag',
        unitsProduced: 40,
        pieceRate: 75,
        totalEarned: 40 * 75 // ₱3,000
      },
      {
        productId: 'prod-3',
        productName: 'Compact Denim Utility Pouch',
        unitsProduced: 25,
        pieceRate: 45,
        totalEarned: 25 * 45 // ₱1,125
      }
    ],
    totalUnitsProduced: 65,
    totalPieceRateEarnings: (40 * 75) + (25 * 45), // ₱4,125
    materialsSubsidizedValue: 1250, // 100% funded by PWD BUPCA grant
    grossPay: (48 * 85) + (40 * 75) + (25 * 45), // ₱4,080 + ₱4,125 = ₱8,205
    adjustmentsOrBonus: 200, // Quality craftsmanship bonus
    netPayout: (48 * 85) + (40 * 75) + (25 * 45) + 200, // ₱8,405
    status: 'disbursed',
    generatedDate: '2026-03-16'
  },
  {
    id: 'pay-02',
    operatorId: 'usr-102',
    operatorName: 'Ramil Bautista',
    payPeriod: 'March 01 - March 15, 2026',
    hoursWorked: 42,
    hourlyRate: 85,
    hourlyAllowance: 42 * 85, // ₱3,570
    productBreakdown: [
      {
        productId: 'prod-2',
        productName: 'Handcrafted Foldable Fabric Bread & Storage Basket',
        unitsProduced: 38,
        pieceRate: 55,
        totalEarned: 38 * 55 // ₱2,090
      },
      {
        productId: 'prod-4',
        productName: 'PWD BUPCA Community Patchwork Apron',
        unitsProduced: 20,
        pieceRate: 85,
        totalEarned: 20 * 85 // ₱1,700
      }
    ],
    totalUnitsProduced: 58,
    totalPieceRateEarnings: (38 * 55) + (20 * 85), // ₱3,790
    materialsSubsidizedValue: 980,
    grossPay: (42 * 85) + (38 * 55) + (20 * 85), // ₱3,570 + ₱3,790 = ₱7,360
    adjustmentsOrBonus: 0,
    netPayout: (42 * 85) + (38 * 55) + (20 * 85), // ₱7,360
    status: 'approved',
    generatedDate: '2026-03-16'
  },
  {
    id: 'pay-03',
    operatorId: 'usr-103',
    operatorName: 'Carla De Leon',
    payPeriod: 'March 01 - March 15, 2026',
    hoursWorked: 36,
    hourlyRate: 85,
    hourlyAllowance: 36 * 85, // ₱3,060
    productBreakdown: [
      {
        productId: 'prod-3',
        productName: 'Compact Denim Utility Pouch',
        unitsProduced: 50,
        pieceRate: 45,
        totalEarned: 50 * 45 // ₱2,250
      },
      {
        productId: 'prod-1',
        productName: 'BUPCA Signature Upcycled Denim Tote Bag',
        unitsProduced: 15,
        pieceRate: 75,
        totalEarned: 15 * 75 // ₱1,125
      }
    ],
    totalUnitsProduced: 65,
    totalPieceRateEarnings: (50 * 45) + (15 * 75), // ₱3,375
    materialsSubsidizedValue: 820,
    grossPay: (36 * 85) + (50 * 45) + (15 * 75), // ₱3,060 + ₱3,375 = ₱6,435
    adjustmentsOrBonus: 150, // Pouch zero-waste optimization incentive
    netPayout: (36 * 85) + (50 * 45) + (15 * 75) + 150, // ₱6,585
    status: 'draft',
    generatedDate: '2026-03-16'
  }
];

export const mockUsers: UserProfile[] = [
  {
    id: 'usr-super',
    fullName: 'Aaron Christian J. Basa',
    username: 'ajbasa',
    email: 'ajbasa@up.edu.ph',
    role: 'superuser',
    disability: 'None',
    phone: '+63 917 888 0000',
  },
  {
    id: 'usr-1',
    fullName: 'Artisan User 1 (Elena Santos)',
    username: 'user1',
    email: 'user1@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Hearing',
    phone: '+63 917 111 0001',
  },
  {
    id: 'usr-2',
    fullName: 'Artisan User 2 (Ramil Bautista)',
    username: 'user2',
    email: 'user2@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Physical/Motor',
    phone: '+63 918 222 0002',
  },
  {
    id: 'usr-3',
    fullName: 'Artisan User 3 (Carla De Leon)',
    username: 'user3',
    email: 'user3@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Visual',
    phone: '+63 920 333 0003',
  },
  {
    id: 'usr-4',
    fullName: 'Artisan User 4 (Nanay Linda)',
    username: 'user4',
    email: 'user4@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Hearing',
    phone: '+63 922 444 0004',
  },
  {
    id: 'usr-5',
    fullName: 'Artisan User 5 (Kuya Ramon)',
    username: 'user5',
    email: 'user5@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Physical/Motor',
    phone: '+63 925 555 0005',
  }
];
