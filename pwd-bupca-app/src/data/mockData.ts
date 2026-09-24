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
  // 1. Old Sewing Machines
  {
    id: 'ast-1',
    assetTag: 'SM-OM-2024-01',
    name: 'Old Sewing Machine (Lola Makina) #1',
    category: 'Old Sewing Machine',
    brand: 'CHINA',
    modelOrClass: 'LOLA MAKINA',
    color: 'BLACK',
    madeIn: 'CHINA',
    issuedTo: 'ROSA ZALUN',
    mrNumber: 'MR-2024-001',
    purpose: 'Traditional Lockstitch Production & Patchwork',
    dateIssued: '2024-04-10',
    conditionUponIssue: 'Good Condition',
    locationId: 'loc-3',
    locationName: 'Pook Palaris, UP Campus',
    status: 'in_use',
    currentOperator: {
      id: 'usr-rosa',
      name: 'Rosa Zalun (Senior Artisan)',
      clockedInAt: '08:00 AM Today'
    },
    lastMaintenance: '2026-02-15',
    specifications: 'Heavy-duty manual treadle & motor lockstitch machine.'
  },
  {
    id: 'ast-2',
    assetTag: 'SM-OM-2025-02',
    name: 'Singer Old Sewing Machine (Lola Makina) #2',
    category: 'Old Sewing Machine',
    brand: 'SINGER',
    modelOrClass: 'LOLA MAKINA',
    color: 'BLACK',
    madeIn: 'CHINA',
    issuedTo: 'AMELIA GALICIA',
    mrNumber: 'MR-2025-002',
    purpose: 'Garment Repairs & Community Sewing',
    dateIssued: '2025-01-15',
    conditionUponIssue: 'Good Condition',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'idle',
    lastMaintenance: '2026-01-20',
    specifications: 'Classic cast-iron Singer lockstitch mechanism.'
  },

  // 2. Portable Sewing Machines (Singer)
  {
    id: 'ast-3',
    assetTag: 'SM-PM-2025-01',
    name: 'Singer Portable Sewing Machine (White)',
    category: 'Portable Sewing Machine',
    brand: 'SINGER',
    color: 'WHITE',
    issuedTo: 'WENG BUSTAMANTE',
    mrNumber: 'MR-2025-003',
    purpose: 'Utility Pouches & Home Accessories',
    dateIssued: '2025-03-01',
    conditionUponIssue: 'Slightly Used',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'in_use',
    currentOperator: {
      id: 'usr-weng',
      name: 'Weng Bustamante (Artisan Operator)',
      clockedInAt: '08:30 AM Today'
    },
    lastMaintenance: '2026-03-01',
    specifications: 'Lightweight multi-stitch portable sewing unit with variable foot pedal.'
  },
  {
    id: 'ast-4',
    assetTag: 'SM-PM-2025-02',
    name: 'Singer Portable Sewing Machine (Denim Gray)',
    category: 'Portable Sewing Machine',
    brand: 'SINGER',
    modelOrClass: 'DENIM',
    color: 'GRAY',
    issuedTo: 'TESS RABE',
    mrNumber: 'MR-2025-004',
    purpose: 'Heavy Denim Canvas Crafting',
    dateIssued: '2025-03-05',
    conditionUponIssue: 'Brand New',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'in_use',
    currentOperator: {
      id: 'usr-tess',
      name: 'Tess Rabe (Lead Denim Artisan)',
      clockedInAt: '09:00 AM Today'
    },
    lastMaintenance: '2026-03-05',
    specifications: 'Reinforced needle bar & motor specifically engineered for denim layers.'
  },
  {
    id: 'ast-5',
    assetTag: 'SM-PM-2025-03',
    name: 'Singer Portable Sewing Machine #3 (Red)',
    category: 'Portable Sewing Machine',
    brand: 'SINGER',
    color: 'RED',
    issuedTo: 'GAYZELLE CALABIO',
    mrNumber: 'MR-2025-005',
    purpose: 'Specialized Small Goods Production',
    dateIssued: '2025-04-12',
    conditionUponIssue: 'Brand New',
    locationId: 'loc-2',
    locationName: '8B CV Francisco St., Pook Amorsolo, UP Campus',
    status: 'in_use',
    currentOperator: {
      id: 'usr-gayzelle',
      name: 'Gayzelle Calabio (Artisan)',
      clockedInAt: '08:45 AM Today'
    },
    lastMaintenance: '2026-02-28',
    specifications: 'Compact domestic sewing unit assigned under home-based livelihood cell.'
  },
  {
    id: 'ast-6',
    assetTag: 'SM-PM-2025-04',
    name: 'Singer Portable Sewing Machine #4 (Red)',
    category: 'Portable Sewing Machine',
    brand: 'SINGER',
    color: 'RED',
    issuedTo: 'MONINA DOMASIG',
    mrNumber: 'MR-2025-006',
    purpose: 'Patchwork & Eco-Tote Straps',
    dateIssued: '2025-04-12',
    conditionUponIssue: 'Brand New',
    locationId: 'loc-2',
    locationName: '9B Duplex CV Francisco, Pook Amorsolo',
    status: 'in_use',
    currentOperator: {
      id: 'usr-monina',
      name: 'Monina Domasig (Artisan)',
      clockedInAt: '09:15 AM Today'
    },
    lastMaintenance: '2026-02-28',
    specifications: 'Home-based unit for Pook Amorsolo satellite production cell.'
  },
  {
    id: 'ast-7',
    assetTag: 'SM-PM-2025-05',
    name: 'Singer Portable Sewing Machine #5 (Red)',
    category: 'Portable Sewing Machine',
    brand: 'SINGER',
    color: 'RED',
    issuedTo: 'EVELYN FONSECA',
    mrNumber: 'MR-2025-007',
    purpose: 'Lining & Inner Pocket Assembly',
    dateIssued: '2025-05-02',
    conditionUponIssue: 'Brand New',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'idle',
    lastMaintenance: '2026-03-01',
    specifications: 'Portable high-precision machine for pouch assembly.'
  },
  {
    id: 'ast-8',
    assetTag: 'SM-PM-2025-06',
    name: 'Singer Portable Sewing Machine #6 (Red)',
    category: 'Portable Sewing Machine',
    brand: 'SINGER',
    color: 'RED',
    issuedTo: 'ENGRACIA SALAZAR',
    mrNumber: 'MR-2025-008',
    purpose: 'Crafts & Apron Stitches',
    dateIssued: '2025-05-02',
    conditionUponIssue: 'Brand New',
    locationId: 'loc-3',
    locationName: 'PWD BUPCA Main Headquarters & Hub',
    status: 'idle',
    lastMaintenance: '2026-03-02',
    specifications: 'Assigned for central workshop training cohorts.'
  },

  // 3. Industrial Edging Machines (Siruba & Juki M1-424NS-F)
  {
    id: 'ast-9',
    assetTag: 'SM-EM-2026-01',
    name: 'Siruba Industrial Overlock Edging Machine',
    category: 'Industrial Edging Machine',
    brand: 'SIRUBA',
    color: 'WHITE',
    datePurchased: '2026-07-29',
    issuedTo: 'JOYZEL SAN VALENTIN',
    mrNumber: 'MR-2026-009',
    purpose: 'Heavy-Duty Edge Finishing & Overlocking',
    dateIssued: '2026-08-01',
    conditionUponIssue: 'Refurbished good as New',
    locationId: 'loc-3',
    locationName: 'Hardin ng Doña Aurora, UP Campus',
    status: 'in_use',
    currentOperator: {
      id: 'usr-joyzel',
      name: 'Joyzel San Valentin (Edging Specialist)',
      clockedInAt: '08:10 AM Today'
    },
    lastMaintenance: '2026-08-15',
    specifications: 'High-speed differential-feed overlock machine with auto-lubrication.'
  },
  {
    id: 'ast-10',
    assetTag: 'SM-EM-2026-02',
    name: 'Juki Industrial Edging Machine M1-424NS-F #1',
    category: 'Industrial Edging Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'M1-424NS-F',
    serialNo: 'Mfg. No. E2200104102',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'online',
    lastMaintenance: '2026-03-10',
    specifications: 'Direct drive 4-thread overedging machine. Batch 2026 asset.'
  },
  {
    id: 'ast-11',
    assetTag: 'SM-EM-2026-03',
    name: 'Juki Industrial Edging Machine M1-424NS-F #2',
    category: 'Industrial Edging Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'M1-424NS-F',
    serialNo: 'Mfg. No. E2200104070',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'online',
    lastMaintenance: '2026-03-10',
    specifications: 'Direct drive 4-thread overedging machine. Batch 2026 asset.'
  },
  {
    id: 'ast-12',
    assetTag: 'SM-EM-2026-04',
    name: 'Juki Industrial Edging Machine M1-424NS-F #3',
    category: 'Industrial Edging Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'M1-424NS-F',
    serialNo: 'Mfg. No. E2200104137',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'idle',
    lastMaintenance: '2026-03-12',
    specifications: 'Direct drive 4-thread overedging machine. Batch 2026 asset.'
  },
  {
    id: 'ast-13',
    assetTag: 'SM-EM-2026-05',
    name: 'Juki Industrial Edging Machine M1-424NS-F #4',
    category: 'Industrial Edging Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'M1-424NS-F',
    serialNo: 'Mfg. No. E2200104157',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'idle',
    lastMaintenance: '2026-03-12',
    specifications: 'Direct drive 4-thread overedging machine. Batch 2026 asset.'
  },
  {
    id: 'ast-14',
    assetTag: 'SM-EM-2026-06',
    name: 'Juki Industrial Edging Machine M1-424NS-F #5',
    category: 'Industrial Edging Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'M1-424NS-F',
    serialNo: 'Mfg. No. E2200104067',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-3',
    locationName: 'PWD BUPCA Main Headquarters & Hub',
    status: 'idle',
    lastMaintenance: '2026-03-15',
    specifications: 'Direct drive 4-thread overedging machine. Batch 2026 asset.'
  },

  // 4. Industrial High-Speed Lockstitch Machines (Juki L-1A / MA-F)
  {
    id: 'ast-15',
    assetTag: 'SM-HS-2026-01',
    name: 'Juki Industrial High-Speed Lockstitch L-1A #1',
    category: 'Industrial High Speed Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'L-1A / MA-F',
    serialNo: 'Mfg. No. 1LL9TF1730',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'online',
    currentOperator: {
      id: 'usr-elena',
      name: 'Elena Santos (Master Artisan)',
      clockedInAt: '08:15 AM Today'
    },
    lastMaintenance: '2026-03-18',
    specifications: 'Direct-drive industrial lockstitch machine for upcycled denim and twill.'
  },
  {
    id: 'ast-16',
    assetTag: 'SM-HS-2026-02',
    name: 'Juki Industrial High-Speed Lockstitch L-1A #2',
    category: 'Industrial High Speed Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'L-1A / MA-F',
    serialNo: 'Mfg. No. 1LL9TE9523',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-1',
    locationName: 'UP CHE Community Workshop',
    status: 'online',
    lastMaintenance: '2026-03-18',
    specifications: 'High-speed 5,000 rpm lockstitch with silent servo motor.'
  },
  {
    id: 'ast-17',
    assetTag: 'SM-HS-2026-03',
    name: 'Juki Industrial High-Speed Lockstitch L-1A #3',
    category: 'Industrial High Speed Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'L-1A / MA-F',
    serialNo: 'Mfg. No. 1LL9TF0814',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'idle',
    lastMaintenance: '2026-03-19',
    specifications: 'Direct-drive industrial lockstitch machine with LED sewing light.'
  },
  {
    id: 'ast-18',
    assetTag: 'SM-HS-2026-04',
    name: 'Juki Industrial High-Speed Lockstitch L-1A #4',
    category: 'Industrial High Speed Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'L-1A / MA-F',
    serialNo: 'Mfg. No. 1LL9TF1590',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-2',
    locationName: 'Barangay UP Campus Area 2 Center',
    status: 'idle',
    lastMaintenance: '2026-03-19',
    specifications: 'Equipped with heavy needle bar for multi-layer denim sewing.'
  },
  {
    id: 'ast-19',
    assetTag: 'SM-HS-2026-05',
    name: 'Juki Industrial High-Speed Lockstitch L-1A #5',
    category: 'Industrial High Speed Machine',
    brand: 'JUKI INTERNATIONAL',
    modelOrClass: 'L-1A / MA-F',
    serialNo: 'Mfg. No. 1LL9TF2058',
    color: 'WHITE & BLUE',
    madeIn: 'CHINA',
    locationId: 'loc-3',
    locationName: 'PWD BUPCA Main Headquarters & Hub',
    status: 'idle',
    lastMaintenance: '2026-03-20',
    specifications: 'Central hub standby production unit for batch orders.'
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
    username: 'grootadmin',
    password: 'xiarabasa12',
    email: 'ajbasa@up.edu.ph',
    role: 'superuser',
    disability: 'None',
    phone: '+63 917 888 0000',
  },
  {
    id: 'usr-admin',
    fullName: 'Pres. Marilyn Morales',
    username: 'admin',
    password: 'determination2026',
    email: 'admin@pwd-bupca.org',
    role: 'admin',
    disability: 'None',
    phone: '+63 917 555 8888',
  },
  {
    id: 'usr-1',
    fullName: 'Artisan User 1 (Elena Santos)',
    username: 'user1',
    password: 'determination2026',
    email: 'user1@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Hearing',
    phone: '+63 917 111 0001',
  },
  {
    id: 'usr-2',
    fullName: 'Artisan User 2 (Ramil Bautista)',
    username: 'user2',
    password: 'determination2026',
    email: 'user2@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Physical/Motor',
    phone: '+63 918 222 0002',
  },
  {
    id: 'usr-3',
    fullName: 'Artisan User 3 (Carla De Leon)',
    username: 'user3',
    password: 'determination2026',
    email: 'user3@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Visual',
    phone: '+63 920 333 0003',
  },
  {
    id: 'usr-4',
    fullName: 'Artisan User 4 (Nanay Linda)',
    username: 'user4',
    password: 'determination2026',
    email: 'user4@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Hearing',
    phone: '+63 922 444 0004',
  },
  {
    id: 'usr-5',
    fullName: 'Artisan User 5 (Kuya Ramon)',
    username: 'user5',
    password: 'determination2026',
    email: 'user5@pwd-bupca.org',
    role: 'member_operator',
    disability: 'Physical/Motor',
    phone: '+63 925 555 0005',
  }
];

export const mockApplications: import('@/types').MembershipApplication[] = [
  {
    id: 'app-001',
    referenceNumber: 'BUPCA-APP-2026-001',
    applicationType: 'both',
    fullName: 'Joyzel San Valentin',
    gender: 'Babae (Female)',
    birthdate: '1984-06-18',
    address: 'Hardin ng Doña Aurora, UP Campus, Diliman, Quezon City',
    contactNo: '+63 917 456 7891',
    isPwd: true,
    hasPwdId: 'may_id',
    pwdIdNo: 'QC-137404-2023-0089',
    disabilityVisibility: 'apparent',
    disabilityCategories: ['Physical'],
    sectors: ['PWD', 'Women Sector'],
    economicStatus: 'Nagtatrabaho (Employed)',
    existingSkills: ['Industrial Edging', 'Overlock Stitching', 'Fabric Trimming'],
    skillsToLearn: ['Industrial High-Speed Sewing', 'Advanced Garment Finishing'],
    isLivelihoodMemberInterest: true,
    status: 'approved',
    assignedMembershipNo: 'BUPCA-MEM-2026-009',
    submissionDate: '2026-03-10',
    reviewedDate: '2026-03-12',
    reviewedBy: 'Aaron Christian J. Basa',
    reviewNotes: 'Assigned to Siruba Edging Machine SM-EM-2026-01 at Hardin ng Doña Aurora workshop.',
    dpaConsent: true,
  },
  {
    id: 'app-002',
    referenceNumber: 'BUPCA-APP-2026-002',
    applicationType: 'both',
    fullName: 'Gayzelle Calabio',
    gender: 'Babae (Female)',
    birthdate: '1990-11-24',
    address: '8B CV Francisco St., Pook Amorsolo, UP Campus, Quezon City',
    contactNo: '+63 918 345 6789',
    isPwd: true,
    hasPwdId: 'may_id',
    pwdIdNo: 'QC-137404-2024-0412',
    disabilityVisibility: 'non_apparent',
    disabilityCategories: ['Hard of Hearing'],
    sectors: ['PWD', 'Solo Parent'],
    economicStatus: 'Nagnenegosyo (Self-Employed / Business)',
    existingSkills: ['Portable Sewing Machine Operation', 'Patchwork', 'Zipper Assembly'],
    skillsToLearn: ['Heavy Denim Production', 'Zero-Waste Pattern Grading'],
    isLivelihoodMemberInterest: true,
    status: 'approved',
    assignedMembershipNo: 'BUPCA-MEM-2026-005',
    submissionDate: '2026-03-14',
    reviewedDate: '2026-03-15',
    reviewedBy: 'Aaron Christian J. Basa',
    reviewNotes: 'Issued Singer Portable Sewing Machine SM-PM-2025-03 under MR protocol at Pook Amorsolo.',
    dpaConsent: true,
  },
  {
    id: 'app-003',
    referenceNumber: 'BUPCA-APP-2026-003',
    applicationType: 'pwd_membership',
    fullName: 'Monina Domasig',
    gender: 'Babae (Female)',
    birthdate: '1976-03-08',
    address: '9B Duplex CV Francisco, Pook Amorsolo, UP Campus, Quezon City',
    contactNo: '+63 920 123 4567',
    isPwd: true,
    hasPwdId: 'may_id',
    pwdIdNo: 'QC-137404-2022-0199',
    disabilityVisibility: 'apparent',
    disabilityCategories: ['Physical', 'Speech and Language'],
    sectors: ['PWD', 'Senior'],
    economicStatus: 'Nagtatrabaho (Employed)',
    existingSkills: ['Basic Sewing', 'Hemming'],
    skillsToLearn: ['Industrial Edging', 'Tote Bag Assembly'],
    isLivelihoodMemberInterest: true,
    status: 'pending_review',
    submissionDate: '2026-03-22',
    reviewNotes: 'Pending site verification at CV Francisco. Requested Portable Machine allocation.',
    dpaConsent: true,
  },
  {
    id: 'app-004',
    referenceNumber: 'BUPCA-APP-2026-004',
    applicationType: 'livelihood_membership',
    fullName: 'Joshua Miguel Santos',
    gender: 'Lalaki (Male)',
    birthdate: '2004-09-12',
    address: 'Area 2, Dagohoy St., UP Campus, Diliman, Quezon City',
    contactNo: '+63 927 987 6543',
    isPwd: false,
    hasPwdId: 'wala',
    disabilityCategories: [],
    sectors: ['Youth Sector', 'Out of School Youth'],
    economicStatus: 'Out of School Youth',
    existingSkills: ['Manual Cutting', 'Packing', 'Basic Hand Stitching'],
    skillsToLearn: ['High-Speed Lockstitch Machine Operation', 'Screen Printing', 'Equipment Maintenance'],
    isLivelihoodMemberInterest: true,
    guardianName: 'Teresita Santos',
    guardianSkills: ['Handicrafts', 'Food Processing'],
    guardianContact: '+63 927 987 6540',
    status: 'pending_review',
    submissionDate: '2026-03-23',
    reviewNotes: 'OSY Youth applicant for youth apprenticeship livelihood slot.',
    dpaConsent: true,
  },
  {
    id: 'app-005',
    referenceNumber: 'BUPCA-APP-2026-005',
    applicationType: 'both',
    fullName: 'Rosa Zalun',
    gender: 'Babae (Female)',
    birthdate: '1962-08-15',
    address: 'Pook Palaris, UP Campus, Diliman, Quezon City',
    contactNo: '+63 916 555 1234',
    isPwd: true,
    hasPwdId: 'may_id',
    pwdIdNo: 'QC-137404-2021-0042',
    disabilityVisibility: 'apparent',
    disabilityCategories: ['Visual Disability', 'Physical'],
    sectors: ['PWD', 'Senior', 'Women Sector'],
    economicStatus: 'Nagtatrabaho (Employed)',
    existingSkills: ['Lola Makina Traditional Lockstitch', 'Apron Sewing', 'Quilting'],
    skillsToLearn: ['Electric Machine Modernization', 'Cord Organizer Crafting'],
    isLivelihoodMemberInterest: true,
    status: 'approved',
    assignedMembershipNo: 'BUPCA-MEM-2024-001',
    submissionDate: '2026-02-15',
    reviewedDate: '2026-02-18',
    reviewedBy: 'Aaron Christian J. Basa',
    reviewNotes: 'Assigned to Old Sewing Machine SM-OM-2024-01.',
    dpaConsent: true,
  }
];

export const mockTrainingCohorts: import('@/types').TrainingCohort[] = [
  {
    id: 'ch-01',
    title: 'Industrial High-Speed Lockstitch Apprenticeship (Batch 1)',
    targetSkill: 'Industrial High-Speed Sewing Operation',
    partnerLead: 'UP College of Home Economics (CHE) & DTI Shared Service',
    locationName: 'UP CHE Community Workshop',
    schedule: 'Saturdays, 8:00 AM - 12:00 PM',
    capacity: 6,
    enrolledApplicantIds: ['app-001', 'app-003', 'app-004'],
    assignedAssetTags: ['SM-HS-2026-01', 'SM-HS-2026-02', 'SM-HS-2026-03'],
    status: 'active',
    startDate: '2026-04-04',
    notes: 'Hands-on direct drive operation, needle safety guards, and denim seam construction.'
  },
  {
    id: 'ch-02',
    title: 'Differential Overlock & Edging Mastery (Batch 1)',
    targetSkill: 'Industrial Overlock / Edging Mastery',
    partnerLead: 'Barangay UP Campus GAD Council',
    locationName: 'Barangay UP Campus Area 2 Center',
    schedule: 'Wednesdays & Fridays, 1:00 PM - 4:00 PM',
    capacity: 5,
    enrolledApplicantIds: ['app-001', 'app-003'],
    assignedAssetTags: ['SM-EM-2026-01', 'SM-EM-2026-02'],
    status: 'active',
    startDate: '2026-04-08',
    notes: 'Mastery of 4-thread overedging for tote bag raw edges and durability.'
  },
  {
    id: 'ch-03',
    title: 'Zero-Waste Pattern Grading & Heavy Denim Crafting',
    targetSkill: 'Zero-Waste Fabric Cutting Techniques',
    partnerLead: 'BUPCA Design Guild',
    locationName: 'PWD BUPCA Main Headquarters & Hub',
    schedule: 'Tuesdays, 9:00 AM - 12:00 PM',
    capacity: 8,
    enrolledApplicantIds: ['app-002', 'app-005'],
    assignedAssetTags: ['SM-PM-2025-02', 'SM-PM-2025-03'],
    status: 'planning',
    startDate: '2026-04-20',
    notes: 'Pattern nesting to maximize donated denim offcuts without textile waste.'
  }
];


