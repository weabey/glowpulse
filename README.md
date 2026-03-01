# Ceylon Beauty

A modern web application for discovering salons, tattoo parlors, piercing studios, and beauty businesses across Sri Lanka. Built with React, Vite, Tailwind CSS, and Supabase.

## Tech Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS 3
- **Routing:** React Router v6
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **Hosting:** Vercel

## Project Structure

```
src/
├── components/             # Reusable React components
│   ├── auth/               # Authentication-related components
│   │   └── ProtectedRoute.jsx   # Route guard — redirects unauthenticated users to /login
│   ├── layout/             # App shell / structural components
│   │   ├── Navbar.jsx      # Top navigation bar with auth state, mobile menu, user dropdown
│   │   ├── Footer.jsx      # Site footer with links and branding
│   │   └── Logo.jsx        # SVG logo component (teal rounded square with swirl icon)
│   └── ui/                 # Shared, reusable UI components
│       ├── AdCard.jsx      # Listing card used in grids (image, title, price, location)
│       ├── StarRating.jsx  # Interactive/read-only star rating component
│       ├── SearchBar.jsx   # Search input with category dropdown (used on Home & Listings)
│       └── FilterSidebar.jsx  # Sidebar filters for category, location, price, sort order
│
├── constants/              # Static data and configuration values
│   └── seedData.js         # Category list, location list, and seed ad/review data
│
├── context/                # React Context providers for global state
│   ├── AuthContext.jsx     # Authentication state — register, login, logout, updateProfile (Supabase Auth)
│   └── AdsContext.jsx      # Listings & reviews state — CRUD operations via Supabase queries
│
├── lib/                    # Third-party service configurations
│   └── supabase.js         # Supabase client instance (reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
│
├── pages/                  # Route-level page components (one per route)
│   ├── Home.jsx            # Landing page — hero section, category grid, all listings, CTA
│   ├── Listings.jsx        # Browse page — search, filters, paginated listing grid
│   ├── AdDetail.jsx        # Single listing view — details, seller contact, reviews, related ads
│   ├── PostAd.jsx          # Create listing form — images, details, auto-filled contact info (protected)
│   ├── Dashboard.jsx       # User dashboard — profile card, my listings, delete/edit (protected)
│   ├── Register.jsx        # Registration form — account details + business profile
│   └── Login.jsx           # Login form — email/password with redirect
│
├── App.jsx                 # Root component — providers, router, route definitions
├── main.jsx                # Entry point — renders App into DOM
└── index.css               # Global styles — Tailwind directives, custom component classes
```

### Root Files

```
├── .env.local              # Environment variables (Supabase URL & anon key) — not committed
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration (Tailwind)
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite bundler configuration
└── README.md               # This file
```

## Directory Conventions

| Directory | Purpose |
|-----------|---------|
| `components/auth/` | Components related to authentication flow (route guards, auth modals) |
| `components/layout/` | Persistent app shell components that appear on every page (navbar, footer, logo) |
| `components/ui/` | Reusable, stateless UI building blocks shared across multiple pages |
| `constants/` | Static arrays, enums, and configuration that don't change at runtime |
| `context/` | React Context providers managing global application state |
| `lib/` | Third-party client initializations and service configurations |
| `pages/` | Top-level route components, one file per URL path |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase project URL and anon key

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public API key |
