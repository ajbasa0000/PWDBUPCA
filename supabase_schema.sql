-- ==============================================================================
-- PWD BUPCA Inc. Database Schema (Supabase / PostgreSQL)
-- Accessible Platform for Persons with Disabilities - Barangay UP Campus Association
-- ==============================================================================

-- Enable UUID and PostGIS extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. USER PROFILES & ACCESSIBILITY PREFERENCES
CREATE TYPE user_role AS ENUM ('superuser', 'admin', 'member_operator', 'customer');
CREATE TYPE disability_type AS ENUM ('Visual', 'Hearing', 'Physical/Motor', 'Speech', 'Cognitive/Neurodivergent', 'Multiple', 'None');

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    disability disability_type DEFAULT 'None',
    role user_role DEFAULT 'member_operator',
    contact_number TEXT,
    preferred_font_size TEXT DEFAULT 'default', -- 'default', 'large', 'xlarge'
    high_contrast BOOLEAN DEFAULT FALSE,
    screen_reader_opt_in BOOLEAN DEFAULT FALSE,
    active_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. WORKSHOPS / LOCATIONS (Stationary asset nodes)
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, -- e.g., 'UP CHE Workshop', 'Area 2 Community Hall', 'PWD BUPCA Center'
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    contact_person TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ASSETS & MACHINERY (High-speed sewing machines, edging, cutting, etc.)
CREATE TYPE asset_status AS ENUM ('online', 'in_use', 'idle', 'maintenance', 'offline');
CREATE TYPE asset_category AS ENUM ('High-Speed Sewing Machine', 'Edging Machine', 'Cutting Table', 'Heat Press', 'Computer Terminal', 'General Tool');

CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_tag TEXT UNIQUE NOT NULL, -- e.g. 'BUPCA-SEW-01'
    name TEXT NOT NULL,
    category asset_category DEFAULT 'High-Speed Sewing Machine',
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    status asset_status DEFAULT 'idle',
    current_operator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    last_maintenance_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ASSET OPERATION LOGS & DAILY TIME RECORD (DTR)
CREATE TABLE IF NOT EXISTS asset_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    clock_in TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    clock_out TIMESTAMP WITH TIME ZONE,
    hours_worked NUMERIC(5,2) DEFAULT 0,
    materials_consumed JSONB DEFAULT '{}'::jsonb, -- e.g., {"denim_scraps_meters": 2.5, "thread_spools": 1}
    units_produced INTEGER DEFAULT 0, -- e.g., 10 finished eco-bags
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. RAW MATERIALS & SUPPLIES (Subsidized by Organization)
CREATE TABLE IF NOT EXISTS supplies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL, -- 'Recycled Fabric Scraps', 'Heavy Duty Zippers', 'Thread Cones'
    category TEXT DEFAULT 'Fabric & Notions',
    unit TEXT NOT NULL, -- 'meters', 'pieces', 'cones', 'kg'
    current_stock NUMERIC(10,2) DEFAULT 0,
    min_threshold NUMERIC(10,2) DEFAULT 10,
    cost_per_unit NUMERIC(10,2) DEFAULT 0.00, -- subsidized cost
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MEMBER SUPPLY REQUESTS
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'fulfilled', 'rejected');

CREATE TABLE IF NOT EXISTS supply_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    supply_id UUID REFERENCES supplies(id) ON DELETE CASCADE,
    quantity_requested NUMERIC(10,2) NOT NULL,
    purpose TEXT, -- e.g. 'Batch of 50 Eco-Baskets'
    status request_status DEFAULT 'pending',
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MINI VIRTUAL STORE: PRODUCTS & ORDERS
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Eco Bags',
    price NUMERIC(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    artisan_attribution TEXT, -- e.g., 'Handcrafted by Nanay Elena & PWD BUPCA Upcycling Team'
    featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'in_production', 'ready_pickup', 'completed', 'cancelled');
CREATE TYPE payment_channel AS ENUM ('GCash', 'Bank Transfer', 'Cash on Pickup');

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    delivery_address TEXT,
    total_amount NUMERIC(10,2) NOT NULL,
    payment_method payment_channel DEFAULT 'GCash',
    payment_proof_url TEXT,
    status order_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL
);

-- 8. ACCOUNTING & PAYROLL FOR PWD MEMBERS
CREATE TYPE payroll_status AS ENUM ('draft', 'approved', 'disbursed');

CREATE TABLE IF NOT EXISTS payroll_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    total_units_produced INTEGER DEFAULT 0,
    total_hours_worked NUMERIC(6,2) DEFAULT 0,
    gross_earnings NUMERIC(10,2) DEFAULT 0.00,
    material_deductions NUMERIC(10,2) DEFAULT 0.00,
    net_payout NUMERIC(10,2) DEFAULT 0.00,
    status payroll_status DEFAULT 'draft',
    processed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    disbursed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
