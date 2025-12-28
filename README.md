# The Language Network - React Application

A modern, responsive language learning platform built with React, Vite, and TailwindCSS.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Multi-language Support**: Pages for French, German, Spanish, English, Japanese, Korean, and Mandarin
- **Interactive Components**:
  - Login form with authentication
  - Demo booking modal
  - Upcoming batches carousel
  - Language selection dropdown
  - Floating WhatsApp and phone CTAs
- **Comprehensive Sections**:
  - Hero section with login
  - Statistics bar
  - Why Learn With Us (8 feature cards)
  - Courses offered
  - Upcoming batches carousel
  - Language-specific pages
  - CEFR levels information

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Custom Components**: Reusable UI components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd language-network
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
language-network/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── FloatingCTA.jsx
│   │   └── sections/        # Page sections
│   │       ├── HeroSection.jsx
│   │       ├── StatisticsBar.jsx
│   │       ├── WhyLearnWithUs.jsx
│   │       ├── CoursesOffered.jsx
│   │       ├── UpcomingBatches.jsx
│   │       └── DemoForm.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   └── LanguagePage.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── package.json          # Dependencies

```

## Available Routes

- `/` - Homepage
- `/french` - French language page
- `/german` - German language page
- `/spanish` - Spanish language page
- `/english` - English language page
- `/japanese` - Japanese language page
- `/korean` - Korean language page
- `/mandarin` - Mandarin language page

## Customization

### Colors

The primary brand colors are defined in `tailwind.config.js`:

- Primary: `#17C3B2` (Teal)
- Primary Dark: `#14A89A`
- Primary Light: `#3DD0C1`
- Secondary Mint: `#E8F9F7`
- Secondary Yellow: `#FFD23F`
- Secondary Navy: `#0F1B35`

### Components

All components are modular and reusable. You can customize them by:

1. Editing the component files in `src/components/`
2. Passing different props to change appearance and behavior
3. Extending with additional features as needed

## Design System

### Typography

- H1: 48-56px, bold
- H2: 36-42px, bold
- H3: 28-32px, semi-bold
- Body: 16-18px, regular
- Small: 14px

### Spacing

- Section padding: 64px (py-16)
- Container max-width: 1440px
- Grid gaps: 24-32px

### Components

- Border radius (cards): 12px
- Border radius (buttons): 8px
- Card shadow: 0px 2px 8px rgba(0, 0, 0, 0.1)
- Hover shadow: 0px 4px 12px rgba(0, 0, 0, 0.15)

## Future Enhancements

- Add authentication backend integration
- Implement course enrollment system
- Add user dashboard
- Create admin panel
- Integrate payment gateway
- Add live chat support
- Implement search functionality
- Add blog section
- Create mobile app

## License

All rights reserved - The Language Network

## Contact

For questions or support, please contact The Language Network team.
