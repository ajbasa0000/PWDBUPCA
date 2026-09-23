import { LivelihoodProgram, NewsItem, CommunityMember } from '@/types';

export interface WebsiteContent {
  heroTitlePrefix: string;
  heroHighlight: string;
  heroSubheadline: string;
  awardNotice: string;
  missionText: string;
  visionText: string;
  partnerCalloutTitle: string;
  partnerCalloutDesc: string;
  stats: { label: string; value: string; desc: string }[];
  testimonials: { name: string; role: string; story: string; avatar: string; tag: string }[];
  programs: LivelihoodProgram[];
  news: NewsItem[];
  communityMembers: CommunityMember[];
}

export const defaultWebsiteContent: WebsiteContent = {
  heroTitlePrefix: "From Dependency to",
  heroHighlight: "Empowerment.",
  heroSubheadline: "PWD BUPCA Inc. is a grassroots community association of Persons with Determination in Barangay UP Campus, Diliman. We transform discarded denims and textile off-cuts into functional, design-forward lifestyle products using industrial machinery and collective mastery.",
  awardNotice: "UP Gawad Tsanselor 2025: Natatanging Lingkod Komunidad",
  missionText: "To shift the societal mindset regarding Persons with Disabilities from dependency into active community leadership and economic independence through high-standard vocational training, modern machine operation, sustainable entrepreneurship, and mutual support.",
  visionText: "A barrier-free, inclusive Philippines where persons with all forms of disability are recognized as skilled master craftspeople, innovators of ecological solutions, and self-reliant contributors to national development.",
  partnerCalloutTitle: "Bulk Corporate Orders, Fabric Donations & Training Sponsorships.",
  partnerCalloutDesc: "Whether you represent a University department, financial institution, or an enterprise seeking eco-friendly corporate gifts, we manufacture high-capacity batches with verified impact.",
  stats: [
    { label: "100% PWD Artisan Made", desc: "Every single piece sewn and crafted by members with determination", value: "100%" },
    { label: "Post-Consumer Textiles", desc: "Diverted from landfills via circular design & upcycling", value: "2.4+ Tons" },
    { label: "Active Workshop Hubs", desc: "Located throughout the University of the Philippines Diliman", value: "3 Hubs" },
    { label: "Fair Living Wage", desc: "Guaranteed piece-rates plus continuous equipment mastery", value: "100% Direct" },
  ],
  testimonials: [
    {
      name: "Elena Santos",
      role: "Lead Master Artisan • Hearing Impaired",
      story: "Through PWD BUPCA and the UP CHE training, I mastered the high-speed lockstitch machine. Today, I create eco-totes and generate consistent income for my family with complete independence and dignity.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
      tag: "Lockstitch Specialist"
    },
    {
      name: "Ramil Bautista",
      role: "Overlock Edging Specialist • Mobility Impaired",
      story: "The adaptive workstation setup at Area 2 UP Campus allows me to operate the overlock machine easily. We don't need charity—we need opportunities and tools. BUPCA provides both.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      tag: "Overlock Operator"
    }
  ],
  programs: [
    {
      id: 'prog-1',
      title: "High-Speed Machine Operation & Mastery",
      partner: "UP College of Home Economics (UP CHE)",
      description: "Comprehensive hands-on certification on single needle industrial lockstitch, differential feed 4-thread overlock edging, and electric cloth cutting machines. Tailored specifically with ergonomic adaptations for mobility and sensory impaired members.",
      deliverables: ["24-Hour Supervised Machine Hours", "Safety and Basic Preventative Maintenance", "Ergonomic Posture Accommodations"],
      duration: "6 Weeks (Intensive)",
      capacity: 12,
      activeStatus: true
    },
    {
      id: 'prog-2',
      title: "Eco-Upcycling and Zero-Waste Textile Crafting",
      partner: "UP College of Fine Arts & UP Center for Women's Studies",
      description: "Converting post-consumer denim garments, donated academic uniform excess, and institutional textile scraps into market-ready utilitarian goods such as eco-totes, cutlery rolls, and home organizer baskets.",
      deliverables: ["Fabric Sorting & Deconstruction", "Pattern Grading for Zero-Waste Layouts", "Reinforced Seam Engineering"],
      duration: "4 Weeks (Hands-on)",
      capacity: 15,
      activeStatus: true
    },
    {
      id: 'prog-3',
      title: "Digital Inventory, DTR & Cooperative Accounting",
      partner: "Barangay UP Campus Leadership & Local Enterprise Allies",
      description: "Enabling PWD members to directly interact with our accessible operational platform: tracking material consumption, logging daily time records at designated machinery, and reviewing transparent piece-rate compensation.",
      deliverables: ["Asset Management & Terminal DTR Use", "Supply Request Procedures", "Transparent Piece-Rate Accounting"],
      duration: "3 Weeks (Hybrid)",
      capacity: 20,
      activeStatus: true
    }
  ],
  news: [
    {
      id: 'news-1',
      title: 'PWD BUPCA Conferred UP Gawad Tsanselor 2025 para sa Natatanging Samahang Pangkomunidad',
      slug: 'gawad-tsanselor-2025-award',
      summary: 'The University of the Philippines Diliman honors PWD BUPCA for pioneering sustainable circular crafts and championing dignified livelihoods for persons with determination.',
      content: 'During the annual Linggo ng Parangal, UP Diliman officially conferred the Gawad Tsanselor 2025 to PWD BUPCA Inc. The award recognizes the grassroots association for converting tons of discarded textiles into marketable goods while proving that disability is never an obstacle to industrial mastery.',
      category: 'Milestone',
      publishedDate: '2026-02-28',
      eventDate: '2026-02-26',
      eventLocation: 'University Theater, UP Diliman',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      featured: true,
      author: 'Pres. Marilyn Morales'
    },
    {
      id: 'news-2',
      title: 'UP CHE and PWD BUPCA Launch Cohort 6 Industrial Lockstitch Certification',
      slug: 'cohort-6-industrial-lockstitch',
      summary: '15 new PWD apprentice sewers begin hands-on machine training at Alonso Hall with specialized ergonomic accommodation rigs.',
      content: 'In collaboration with the Department of Clothing, Textiles and Interior Design (UP CHE), Cohort 6 opens with 15 participants. The curriculum includes differential feed overlocking, preventative oiling maintenance, and zero-waste pattern layouts.',
      category: 'Training',
      publishedDate: '2026-03-10',
      eventDate: '2026-04-05',
      eventLocation: 'Alonso Hall Workshop, UP CHE',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      featured: true,
      author: 'Ate Gloria Mendoza'
    },
    {
      id: 'news-3',
      title: 'Campus-Wide Denim Donation Drive Reaches 2.4-Ton Milestone',
      slug: 'denim-donation-2-tons-milestone',
      summary: 'Over 1,200 UP students, faculty, and Quezon City residents drop off discarded jeans and uniforms for circular upcycling.',
      content: 'Barangay UP Campus and surrounding academic colleges celebrated a landmark achievement in ecological circularity. Donated denim garments are sorted and deconstructed at Area 2 into raw canvas bases and tote panels, guaranteeing zero fabric sent to landfills.',
      category: 'Advocacy',
      publishedDate: '2026-03-18',
      eventDate: '2026-03-15',
      eventLocation: 'Pook Dagohoy Hub & Area 2 Center',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      featured: false,
      author: 'PWD BUPCA Communications Desk'
    }
  ],
  communityMembers: [
    {
      id: 'mem-1',
      preferredName: 'Elena Santos',
      artisanRole: 'Master Artisan & Lockstitch Lead',
      determinationFocus: 'Artisan with Hearing Determination',
      bio: 'Deaf-mute master artisan who completed the UP CHE vocational mastery program. Elena operates single-needle industrial lockstitch machines and specializes in double-stitched reinforced denim tote bags.',
      workshopStation: 'UP CHE Community Workshop',
      specialties: ['Heavy Lockstitch', 'Tactile Edge Alignment', 'Lining Installation'],
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      featuredProducts: ['prod-1'],
      joinedYear: '2022',
      consentSigned: true
    },
    {
      id: 'mem-2',
      preferredName: 'Ramil Bautista',
      artisanRole: 'Overlock & Fabric Edging Specialist',
      determinationFocus: 'Artisan with Mobility Determination',
      bio: 'Using an adapted wheelchair-accessible workstation at Area 2, Ramil leads precision 4-thread differential overlock edging and structural folding for fabric storage baskets.',
      workshopStation: 'Area 2 Community Center',
      specialties: ['Siruba 4-Thread Overlock', 'Fabric Basket Folding', 'Quality Assurance'],
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      featuredProducts: ['prod-2'],
      joinedYear: '2023',
      consentSigned: true
    },
    {
      id: 'mem-3',
      preferredName: 'Carla De Leon',
      artisanRole: 'Zero-Waste Pattern & Pouch Artisan',
      determinationFocus: 'Artisan with Low-Vision Focus',
      bio: 'Carla utilizes high-contrast measuring grids and textured cutting guides to fabricate multi-compartment denim utility pouches with zero waste.',
      workshopStation: 'PWD BUPCA Main Hub',
      specialties: ['Tactile Grid Cutting', 'Brass Zipper Attachment', 'Utility Pouch Assembly'],
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      featuredProducts: ['prod-3'],
      joinedYear: '2023',
      consentSigned: true
    },
    {
      id: 'mem-4',
      preferredName: 'Nanay Linda & Sewing Circle',
      artisanRole: 'Patchwork & Assembly Apprentices',
      determinationFocus: 'Community Senior & Sensory Determination',
      bio: 'Collaborative team of 4 apprentice sewers mastering industrial machinery while creating community patchwork work aprons from denim and twill remnants.',
      workshopStation: 'UP CHE Community Workshop',
      specialties: ['Patchwork Tessellation', 'Multi-pocket Aprons', 'Apprentice Mentorship'],
      photo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400',
      featuredProducts: ['prod-4'],
      joinedYear: '2024',
      consentSigned: true
    }
  ]
};
