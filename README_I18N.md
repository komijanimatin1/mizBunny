# Internationalization (i18n) Setup

This project uses `next-intl` for multilingual support with Persian (fa) and English (en) languages.

## Usage

### Using Translations in Components

```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('navigation'); // Namespace from JSON
  
  return (
    <div>
      <h1>{t('home')}</h1>
    </div>
  );
}
```

### Adding New Translations

1. Open `src/messages/fa.json` for Persian
2. Open `src/messages/en.json` for English
3. Add your new translation key with the same structure in both files

Example:
```json
{
  "mySection": {
    "title": "عنوان",
    "description": "توضیحات"
  }
}
```

### Switching Languages

Use the `LanguageSwitcher` component anywhere in your app:

```tsx
import LanguageSwitcher from './components/LanguageSwitcher';

function MyPage() {
  return (
    <div>
      <LanguageSwitcher />
      {/* Other content */}
    </div>
  );
}
```

Or programmatically:

```tsx
import { useLocale } from './i18n/I18nProvider';

function MyComponent() {
  const { locale, setLocale } = useLocale();
  
  const switchToEnglish = () => setLocale('en');
  const switchToPersian = () => setLocale('fa');
  
  return <div>Current language: {locale}</div>;
}
```

## Translation Namespaces

- `app`: Application name and tagline
- `navigation`: Navigation labels (home, profile, assistant)
- `auth`: Authentication-related text
- `profile`: User profile section
- `thirdParty`: Third-party services section
- `events`: Events and workshops
- `transfer`: Transfer page
- `ai`: AI assistant
- `common`: Common text used across the app

## Language Persistence

The selected language is automatically saved to `localStorage` and will persist across sessions.

## Default Language

The default language is Persian (fa). If no language preference is stored, the app will use Persian.

