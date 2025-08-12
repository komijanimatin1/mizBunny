# 🐰 MizBunny - اتاق دیجیتال

A modern React/Ionic application built with Capacitor for cross-platform mobile and web development.

## 🚀 Features

- **Cross-Platform**: Web, iOS, and Android support
- **Modern UI**: Built with React and Ionic components
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Tailwind CSS for styling
- **AI Integration**: AI-powered features
- **Service Management**: Internal and third-party service integrations

## 📁 Project Structure

```
mizBunny/
├── 📱 android/           # Android platform files
├── 🍎 ios/               # iOS platform files
├── 📦 public/            # Static assets
├── 📚 src/
│   ├── 🎨 components/    # UI Components
│   │   ├── home/         # Home-related components
│   │   ├── my-services/  # Your core services
│   │   ├── third-party/  # External integrations
│   │   ├── ui/           # Reusable UI components
│   │   └── ai/           # AI components
│   ├── 📄 pages/         # Page components
│   ├── 🪝 hooks/         # Custom React hooks
│   ├── 🔧 services/      # Business logic & API services
│   ├── 🎨 theme/         # Styling & theming
│   ├── 📝 types/         # TypeScript definitions
│   ├── 🛠️ utils/         # Utility functions
│   └── 📋 docs/          # Documentation
├── 🧪 cypress/           # E2E testing
└── 📋 docs/              # Project documentation
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **UI Framework**: Ionic React
- **Mobile**: Capacitor
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Cypress + Vitest
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mizBunny
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Mobile Development

1. **Add platforms**
   ```bash
   npx cap add android
   npx cap add ios
   ```

2. **Sync changes**
   ```bash
   npx cap sync
   ```

3. **Open in native IDEs**
   ```bash
   npx cap open android
   npx cap open ios
   ```

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test.unit` - Run unit tests
- `npm run test.e2e` - Run E2E tests
- `npm run lint` - Run ESLint

## 🎯 Core Services

- **کارتابل** (Kartabel) - User dashboard
- **رسانه** (Media) - Media services
- **مشاوره** (Counseling) - Counseling services
- **آموزش** (Education) - Educational content
- **رویداد** (Events) - Event management

## 🔧 Configuration

- **Capacitor**: `src/config/capacitor.config.ts`
- **Vite**: `src/config/vite.config.ts`
- **Tailwind**: `src/config/tailwind.config.js`
- **ESLint**: `src/config/eslint.config.js`

## 📚 Documentation

- [Setup Guide](src/docs/SETUP.md)
- [Font Usage Guide](src/docs/FONT_USAGE_GUIDE.md)
- [In-App Browser Guide](src/docs/INAPPBROWSER_README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
