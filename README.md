# Doc App - Medical Appointment System

A modern React-based medical appointment booking system built with Vite, featuring a clean UI and comprehensive medical specialty categories.

## Features

- 🏥 Medical specialty categories (General Care, Cardiology, Mental Health, etc.)
- 👥 User authentication (Patient/Doctor registration)
- 📅 Appointment booking and management
- 📱 Responsive design with modern UI components
- 🔥 Firebase integration for backend services
- 🎨 Beautiful gradient designs and animations

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **UI Components**: Radix UI, Lucide React icons
- **Backend**: Firebase (Authentication, Firestore)
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd doc-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Copy your Firebase config to `src/firebase/firebase.js`

4. Start the development server:
```bash
npm run dev
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Push to main branch**: The project will automatically build and deploy when you push changes to the `main` branch.

2. **GitHub Pages Setup**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - The site will be available at `https://yourusername.github.io/doc-app/`

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Configuration

The project is configured with:
- **Base path**: `/doc-app/` (update in `vite.config.js` if your repo name is different)
- **Build output**: `dist/` directory
- **GitHub Actions**: `.github/workflows/deploy.yml`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   └── ...             # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── firebase/           # Firebase configuration
├── assets/             # Images and static assets
└── utils/              # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
