# Internationalization (i18n) Guide

This template uses a JSON file-based internationalization system, making it easy for LangChain to translate based on the detected language of the niche/domain.

## How It Works

1. **Translation Files**: Each language has a JSON file in `src/locales/{locale}.json`
2. **i18n System**: The service in `src/lib/i18n.ts` loads and manages translations
3. **React Hook**: Use `useTranslation()` in components to access translations
4. **Automatic Locale**: The locale is defined via `VITE_LOCALE` (configured during scaffold)

## Translation File Structure

Each JSON file follows a hierarchical structure:

```json
{
  "common": {
    "loading": "Loading...",
    "error": "Error"
  },
  "nav": {
    "home": "Home",
    "articles": "Articles"
  },
  "home": {
    "title": "Welcome",
    "newsletter": {
      "title": "Free Newsletter"
    }
  }
}
```

## How AI Should Create New Translation Files

When LangChain detects a new language (e.g., `es-ES`, `fr-FR`), it should:

1. **Copy the base file** (`en-US.json` or `pt-BR.json`)
2. **Translate all values** while maintaining the key structure
3. **Save as** `src/locales/{locale}.json`

### Example Prompt for AI:

```
Translate the file src/locales/en-US.json to Spanish (es-ES).
Keep all JSON keys exactly the same, translating only the values.
Save the result in src/locales/es-ES.json.
```

## How to Use in Components

```tsx
import { useTranslation } from "@/lib/i18n";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <p>{t("home.subtitle")}</p>
      <button>{t("common.submit")}</button>
    </div>
  );
}
```

## Translations with Parameters

For translations that need dynamic values:

```json
{
  "search": {
    "resultsFor": "Results for {{query}}"
  }
}
```

```tsx
{t("search.resultsFor", { query: "finance" })}
// Result: "Results for finance"
```

## Supported Locales

- `en-US` - US English (default)
- `pt-BR` - Brazilian Portuguese
- `es-ES` - Spanish (Spain)
- `es-MX` - Spanish (Mexico)
- `fr-FR` - French (France)
- `de-DE` - German
- `it-IT` - Italian
- `ja-JP` - Japanese
- `zh-CN` - Simplified Chinese

## Initialization

i18n is automatically initialized in `main.tsx` using `VITE_LOCALE`:

```tsx
const locale = import.meta.env.VITE_LOCALE || 'en-US';
i18n.init(locale).then(() => {
  // App starts after i18n is ready
});
```

## Advantages of This Approach

1. **Easy for AI**: Just create a translated JSON file
2. **Structured**: Keys organized by section
3. **Type-safe**: TypeScript helps avoid errors
4. **Performant**: Translations loaded once and cached
5. **Fallback**: If a locale doesn't exist, uses en-US as fallback
