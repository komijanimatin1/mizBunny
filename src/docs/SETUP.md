# Project Setup & Structure

## 📁 Folder Structure

This project follows a feature-based organization structure for better maintainability and scalability.

### Components Organization

```
src/components/
├── home/           # Home-related components
│   ├── HomeElements.tsx
│   ├── ToolbarSection.tsx
│   └── SplashScreen.tsx
├── my-services/    # Your app's core services
│   ├── ServicesSection.tsx
│   └── ServiceDetails.tsx
├── third-party/    # External service integrations
│   └── FacilitiesScroll.tsx
├── ui/             # Reusable UI components
│   ├── ConfirmationModal.tsx
│   └── HorizontalScroll.tsx
└── ai/             # AI-related components
    └── AIComponent.tsx
```

### Key Benefits

1. **Clear Separation**: Your services vs third-party services
2. **Logical Grouping**: Related components are grouped together
3. **Easy Navigation**: Developers can quickly find components
4. **Scalability**: Easy to add new features without cluttering

### Import Examples

```typescript
// Import from specific feature folders
import { ServicesSection } from '@/components/my-services';
import { FacilitiesScroll } from '@/components/third-party';
import { ConfirmationModal } from '@/components/ui';

// Or import all components
import { ServicesSection, FacilitiesScroll, ConfirmationModal } from '@/components';
```

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## 📱 Platform Support

- **Web**: React + Vite
- **Mobile**: Capacitor + Ionic
- **iOS**: Native iOS app
- **Android**: Native Android app
