// @ts-nocheck
/**
 * Internationalization (i18n) System
 *
 * This system allows the template to be easily translated by LangChain
 * based on the detected language of the niche/domain.
 *
 * The AI only needs to create a new file in src/locales/{locale}.json
 * translating the texts from the base file (en-US.json or pt-BR.json)
 */

export type Locale = 'en-US' | 'pt-BR' | 'es-ES' | string;

interface Translations {
  [key: string]: string | Translations;
}

// Loaded translations cache
const translationsCache: Map<Locale, Translations> = new Map();

/**
 * Loads translations for a specific locale
 */
async function loadTranslations(locale: Locale): Promise<Translations> {
  // Check cache
  if (translationsCache.has(locale)) {
    return translationsCache.get(locale)!;
  }

  try {
    // Try to load the translation file
    const module = await import(`../locales/${locale}.json`);
    const translations = module.default || module;
    translationsCache.set(locale, translations);
    return translations;
  } catch (error) {
    console.warn(`[i18n] Locale ${locale} not found, using en-US as fallback`);

    // Fallback to en-US
    if (locale !== 'en-US') {
      try {
        const fallback = await import('../locales/en-US.json');
        const translations = fallback.default || fallback;
        translationsCache.set(locale, translations);
        return translations;
      } catch {
        // If en-US also doesn't exist, return empty object
        return {};
      }
    }

    return {};
  }
}

/**
 * Main i18n service class
 */
class I18nService {
  private locale: Locale = 'en-US';
  private translations: Translations = {};
  private listeners: Set<() => void> = new Set();

  /**
   * Initializes the system with a locale
   */
  async init(locale: Locale): Promise<void> {
    this.locale = locale;
    this.translations = await loadTranslations(locale);
    this.notifyListeners();
  }

  /**
   * Gets a translation by key (supports dot notation: "home.title")
   */
  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: any = this.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // If not found, return the key
        console.warn(`[i18n] Translation not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters in {{param}} format
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  }

  /**
   * Gets the current locale
   */
  getLocale(): Locale {
    return this.locale;
  }

  /**
   * Registers a listener for locale changes
   */
  onLocaleChange(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }
}

// Singleton
export const i18n = new I18nService();

// Import React for the hook
import React from 'react';

/**
 * React hook to use translations
 */
export function useTranslation() {
  const [locale, setLocaleState] = React.useState<Locale>(i18n.getLocale());

  React.useEffect(() => {
    const unsubscribe = i18n.onLocaleChange(() => {
      setLocaleState(i18n.getLocale());
    });
    return unsubscribe;
  }, []);

  return {
    t: (key: string, params?: Record<string, string | number>) => i18n.t(key, params),
    locale,
  };
}
