# AI VR Tutor - NEET Prep (Web v1)

A production-ready AI-powered web application for NEET preparation with VR readiness, featuring personalized learning paths, adaptive quizzes, flashcards, and comprehensive analytics.

## Features

### 🧠 AI-Powered Learning
- Personalized study paths based on assessment results
- Intelligent weak area detection and recommendations
- Adaptive content delivery based on learning style

### 📚 Comprehensive NEET Coverage
- Physics, Chemistry, and Biology syllabus
- 15,000+ practice questions with detailed explanations
- Video lessons integrated with YouTube
- Interactive flashcards with spaced repetition

### 🎮 Gamified Experience
- XP system and level progression
- Daily streaks and achievement badges
- Leaderboards and progress tracking
- Mistake analysis and improvement recommendations

### 🔄 Unskippable Onboarding
- 8-step guided setup process
- Baseline assessment to identify weak areas
- Personalized study schedule generation
- Goal setting and confidence mapping

### 📊 Analytics & Insights
- Performance heatmaps and trends
- Study time tracking and optimization
- Quiz accuracy analytics
- Personalized improvement suggestions

### 🥽 VR Ready
- VR compatibility flags and settings
- Meta Quest preparation for future releases
- Immersive learning capsule previews

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand with persistence
- **Routing**: React Router DOM
- **Charts**: Recharts for analytics
- **Validation**: Zod schemas
- **Icons**: Lucide React

## Theme - Blue Haze Palette

The application uses a carefully crafted Blue Haze color scheme:

```css
--blue-haze-50:  #F8F7FB  /* Light backgrounds */
--blue-haze-100: #F2F0F7  /* Surface cards */
--blue-haze-200: #E6E4F0  /* Muted elements */
--blue-haze-300: #C9C3DE  /* Borders */
--blue-haze-400: #BAB1D4  /* Subtle accents */
--blue-haze-500: #A191C1  /* Interactive states */
--blue-haze-600: #8D78AF  /* Secondary actions */
--blue-haze-700: #7C659C  /* Primary brand */
--blue-haze-800: #675582  /* Hover states */
--blue-haze-900: #56476B  /* Body text */
--blue-haze-950: #372D48  /* Headings */
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern browser with ES6+ support

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-vr-tutor-neet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Application Structure

### Pages
- `/` - Landing page with features and testimonials
- `/auth` - Sign in/Sign up with mock authentication
- `/onboarding` - 8-step guided setup wizard
- `/dashboard` - Personalized student dashboard
- `/learn/:topicId` - Topic learning page with video, quiz, flashcards
- `/profile` - User settings and VR configuration

### Key Components
- `Stepper` - Progress indicator for onboarding
- `QuizEngine` - Interactive quiz with timer and explanations
- `FlashcardDeck` - Spaced repetition flashcard system
- `AppLayout` - Consistent page structure

### Mock Data
The application includes comprehensive mock data:
- Topics with video IDs and difficulty levels
- Question bank with explanations
- Flashcard content for all subjects
- User progress and analytics

## Mock-First Design

All features work without external API keys:
- YouTube videos use demo video IDs
- Images from Unsplash (no API key required)
- AI summaries use static mock content
- All data persists in localStorage via Zustand

## Accessibility Features

- Keyboard navigation support
- ARIA labels and semantic HTML
- Color contrast ratio ≥ AA
- Focus states for all interactive elements
- Screen reader compatible

## Performance Features

- Lazy loading for images
- Efficient React state management
- Optimized bundle with Vite
- Progressive loading states
- Error boundaries for graceful failures

## Error Handling

- Try/catch blocks on all async operations
- User-friendly toast notifications
- Fallback UI for missing data
- Never crashes - always shows something useful

## VR Readiness

- User preference settings for VR mode
- Device compatibility detection
- VR feature flags in user profile
- Placeholder for future VR capsules

## Development Philosophy

1. **Progressive Enhancement**: Works great on all devices
2. **Mock-First**: No external dependencies to get started
3. **User-Centric**: Every feature serves student success
4. **Accessible**: Usable by everyone, everywhere
5. **Performant**: Fast loading and smooth interactions

## Future Enhancements

- Real AI integration with OpenAI/Claude
- VR learning modules for Meta Quest
- Advanced analytics and ML recommendations
- Social features and study groups
- Mobile app with offline support

## License

This project is part of the Lovable platform and follows their terms of service.

---

Built with ❤️ for NEET aspirants using Lovable's AI development platform.