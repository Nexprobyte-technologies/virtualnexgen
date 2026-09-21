# Virtual Nexgen Solutions

Virtual assistant and AI automation services website built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4
- **Animations:** GSAP (ScrollTrigger), Framer Motion
- **Calendar:** react-day-picker + date-fns
- **Icons:** Lucide React
- **Storage:** JSON file-based (no database)

## Features

### Public Site
- Responsive navbar with services dropdown and booking modal
- Hero section with animated content
- Auto-scrolling client logos carousel
- Counter stats and feature sections
- Auto-cycling testimonials with circular progress indicators
- FAQ accordion with glass-card UI
- International clients section with world map and animated dots
- NexBot chatbot with voice support

### Admin Panel (`/admin`)
- Dashboard with stats and quick actions
- Services CRUD (add/edit/delete with sections and images)
- Blog CRUD with rich text editor
- Appointments management (view/confirm/cancel/delete)
- Chatbot knowledge base manager with voice recording

### Booking System
- Calendar-based appointment picker
- Time slot selection
- Client details form
- Saves to `data/appointments.json`
- Admin can view and manage bookings

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: `/admin/login`
- Username: `admin`
- Password: `admin@123`

## Project Structure

```
src/
  app/
    page.tsx              # Home page
    layout.tsx            # Root layout
    admin/
      login/              # Admin login
      (panel)/
        dashboard/        # Admin dashboard
        services/         # Services CRUD
        blog/             # Blog CRUD
        appointments/     # Appointments management
    api/
      services/           # Services API
      blog/               # Blog API
      chatbot/            # Chatbot API
      appointments/       # Appointments API
      auth/               # Authentication
  components/
    Navbar.tsx            # Navigation bar
    Hero.tsx              # Hero section
    Marquee.tsx           # Scrolling text marquee
    ClientLogos.tsx       # Client logos carousel
    Features.tsx          # Features section
    About.tsx             # About section
    Services.tsx          # Services section
    Testimonials.tsx      # Testimonials carousel
    CTA.tsx               # FAQ + CTA section
    InternationalClients.tsx  # World map section
    BookingModal.tsx      # Appointment booking popup
    ChatBot.tsx           # NexBot chatbot widget
    Footer.tsx            # Footer
  lib/
    types.ts              # TypeScript types
    auth.ts               # Authentication
    services.ts           # Services data layer
    blog.ts               # Blog data layer
    chatbot.ts            # Chatbot data layer
    appointments.ts       # Appointments data layer
    gsap.ts               # GSAP configuration
data/
  services.json           # Services data
  blog.json               # Blog data
  chatbot.json            # Chatbot data
  appointments.json       # Appointments data
```

## Environment

No `.env` file required. All data is stored in local JSON files under `data/`.

## License

Private project — Virtual Nexgen Solutions.
