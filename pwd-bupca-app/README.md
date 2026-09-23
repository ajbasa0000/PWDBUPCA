# PWD BUPCA Inc. Platform & Command Center

Official Web Platform and Operational Command Center for **PWD BUPCA Inc.** (Persons with Disabilities - Barangay UP Campus Association).

Recipient of the **UP Gawad Tsanselor 2025: Natatanging Lingkod Komunidad**, PWD BUPCA shifts the mindset of Persons with Disabilities from dependency to empowerment through accredited industrial machine training, upcycled eco-products, and cooperative technology.

---

## 🌟 Architecture & Completed Modules

### 1. Public Web Portal & Mini Virtual Store
- **Advocacy & Landing Page (`/`):** Features editorial typography (Plus Jakarta Sans + Newsreader), Gawad Tsanselor recognition badge, sustainable pillars, community statistics, and verified artisan testimonials.
- **Livelihood Trainings (`/programs`):** Showcases machine training courses (industrial lockstitch, differential overlock edging, zero-waste cutting) in partnership with the UP College of Home Economics (UP CHE) and UP College of Fine Arts.
- **Mini Virtual Store (`/store`):**
  - Catalog of upcycled artisan products (Denim Totes, Bread Baskets, Pouches, Aprons).
  - Category filters, artisan story modals, real-time shopping cart, and 2-step checkout (GCash, BPI UP Campus, Cash on Pickup).

### 2. Design System & Accessibility (WCAG 2.1 AA/AAA)
- **Light & Dark Theme Switcher:** One-click Sun/Moon toggle in the navigation bar and sidebar, fully persisted in `localStorage` and configured with Tailwind v4 `@custom-variant dark`.
- **Human Warm Typography:** Plus Jakarta Sans interface font paired with Newsreader editorial serif.
- **Floating Accessibility Drawer (`AccessibilityToolbar.tsx`):**
  - **High-Contrast Themes:** Standard, High-Contrast Black & Yellow (low vision standard), and Pure Dark.
  - **Text Resizing:** 100%, 125%, 150% dynamic zoom.
  - **Dyslexia-Friendly Font:** Enhanced letter distinction and word kerning.
  - **Audio Cues & Voice Briefing:** Web Audio chimes on actions + Text-to-Speech vocal feedback.

### 3. Main Command Center (`/admin`)
Configured with an intuitive, responsive **Sidebar Navigation**:

- **2a. Asset Operations & Interactive Map Tracker:**
  - OpenStreetMap & Leaflet interactive map showing UP Diliman workshop locations (*UP CHE Workshop*, *Area 2 Center*, *BUPCA Hub*).
  - Real-time machinery operational states (*Online / In-Use*, *Idle / Standby*, *Maintenance*).
  - **Asset-Linked DTR:** Members clock in at their assigned equipment, logging hours, fabric meters used, and completed unit counts.
  - **Relocation Tracker:** Records machine transfers between workshop hubs with reason logging.
  - **Map / Grid Toggle:** Instant switch between interactive map and card view.
- **2b. Supplies Inventory & Basic Ordering:**
  - Catalog of 100% organization-subsidized raw materials (denim scraps, thread, zippers, tags).
  - Member request forms with big-touch inputs and admin 1-click approval.
- **2c. Shopping Hub & Order Processing:**
  - Order status pipeline (`pending` $\rightarrow$ `in_production` $\rightarrow$ `ready_for_pickup` $\rightarrow$ `completed`) with customer notes and revenue tracking.
- **2d. Accounting & Member Payroll:**
  - Automated piece-rate earnings + hourly allowance calculations with interactive, printable official pay slips.
- **2e. Website Content Manager (CMS):**
  - Accessible CMS for staff to update landing page headlines, stories, mission/vision statements, and impact stats with 1-click publishing.
- **2f. Developer & Master Database:**
  - Master CRUD management interface for configuring raw records across machinery, member/user profiles, store catalog items, and raw inventory supplies.

---

## 🚀 Running the Project

```bash
# Enter project directory
cd pwd-bupca-app

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) for the public portal or [http://localhost:3000/admin](http://localhost:3000/admin) for the Command Center.

## 🗄️ Database
Full PostgreSQL schema with PostGIS and RBAC tables is documented in [`supabase_schema.sql`](../supabase_schema.sql).
