// @ts-nocheck
import { config } from '@/lib/config';
/**
 * Configuração de Cores - Fácil Edição pelo LangChain
 * 
 * Este arquivo centraliza TODAS as cores do template.
 * O LangChain pode modificar este arquivo facilmente para adaptar
 * as cores ao nicho/domínio do site.
 * 
 * ESTRUTURA:
 * - Todas as cores em formato hexadecimal (#RRGGBB)
 * - Organizadas por categoria (primary, secondary, etc.)
 * - Fácil de encontrar e modificar
 */

export interface ColorConfig {
  // ===== CORES PRIMÁRIAS =====
  // Cor principal do site (botões, links, destaques)
  primary: string;
  primaryForeground: string; // Cor do texto sobre primary
  primaryHover: string; // Cor quando hover
  primaryLight: string; // Versão clara
  primaryDark: string; // Versão escura

  // ===== CORES SECUNDÁRIAS =====
  // Cor secundária (usada em elementos menos importantes)
  secondary: string;
  secondaryForeground: string;
  secondaryHover: string;

  // ===== CORES DE FUNDO =====
  background: string; // Fundo principal
  backgroundCard: string; // Fundo de cards
  backgroundMuted: string; // Fundo suave
  backgroundAccent: string; // Fundo de destaque

  // ===== CORES DE TEXTO =====
  foreground: string; // Texto principal
  foregroundMuted: string; // Texto secundário
  foregroundSubtle: string; // Texto sutil

  // ===== CORES DE ESTADO =====
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  error: string;
  errorForeground: string;
  info: string;
  infoForeground: string;

  // ===== CORES DE BORDA =====
  border: string;
  borderLight: string;
  borderDark: string;

  // ===== CORES DE INPUT =====
  inputBackground: string;
  inputBorder: string;
  inputFocus: string;
  inputPlaceholder: string;
}

/**
 * CONFIGURAÇÃO PADRÃO - Finanças/Financeiro
 * Azul profissional e confiável
 */
export const defaultColorConfig: ColorConfig = {
  // Primary - Azul profissional
  primary: '#2563eb', // blue-600
  primaryForeground: '#ffffff',
  primaryHover: '#1d4ed8', // blue-700
  primaryLight: '#3b82f6', // blue-500
  primaryDark: '#1e40af', // blue-800

  // Secondary - Cinza neutro
  secondary: '#64748b', // slate-500
  secondaryForeground: '#ffffff',
  secondaryHover: '#475569', // slate-600

  // Backgrounds
  background: '#ffffff',
  backgroundCard: '#f8fafc', // slate-50
  backgroundMuted: '#f1f5f9', // slate-100
  backgroundAccent: '#e2e8f0', // slate-200

  // Foregrounds
  foreground: '#0f172a', // slate-900
  foregroundMuted: '#64748b', // slate-500
  foregroundSubtle: '#94a3b8', // slate-400

  // States
  success: '#10b981', // emerald-500
  successForeground: '#ffffff',
  warning: '#f59e0b', // amber-500
  warningForeground: '#ffffff',
  error: '#ef4444', // red-500
  errorForeground: '#ffffff',
  info: '#3b82f6', // blue-500
  infoForeground: '#ffffff',

  // Borders
  border: '#e2e8f0', // slate-200
  borderLight: '#f1f5f9', // slate-100
  borderDark: '#cbd5e1', // slate-300

  // Inputs
  inputBackground: '#ffffff',
  inputBorder: '#e2e8f0', // slate-200
  inputFocus: '#2563eb', // blue-600
  inputPlaceholder: '#94a3b8', // slate-400
};

/**
 * ESQUEMAS PRÉ-DEFINIDOS POR NICHO
 * O LangChain pode usar estes esquemas ou criar um customizado
 */
export const colorSchemesByNiche: Record<string, Partial<ColorConfig>> = {
  // Saúde/Health - Verde
  health: {
    primary: '#10b981', // emerald-600
    primaryHover: '#059669', // emerald-700
    primaryLight: '#34d399', // emerald-400
    primaryDark: '#047857', // emerald-800
  },

  // Tecnologia/Tech - Roxo
  technology: {
    primary: '#8b5cf6', // violet-600
    primaryHover: '#7c3aed', // violet-700
    primaryLight: '#a78bfa', // violet-400
    primaryDark: '#6d28d9', // violet-800
  },

  // Educação/Education - Laranja
  education: {
    primary: '#f59e0b', // amber-600
    primaryHover: '#d97706', // amber-700
    primaryLight: '#fbbf24', // amber-400
    primaryDark: '#b45309', // amber-800
  },

  // Moda/Fashion - Rosa
  fashion: {
    primary: '#ec4899', // pink-600
    primaryHover: '#db2777', // pink-700
    primaryLight: '#f472b6', // pink-400
    primaryDark: '#be185d', // pink-800
  },

  // Esportes/Sports - Vermelho
  sports: {
    primary: '#ef4444', // red-600
    primaryHover: '#dc2626', // red-700
    primaryLight: '#f87171', // red-400
    primaryDark: '#b91c1c', // red-800
  },

  // Culinária/Food - Laranja
  food: {
    primary: '#f97316', // orange-600
    primaryHover: '#ea580c', // orange-700
    primaryLight: '#fb923c', // orange-400
    primaryDark: '#c2410c', // orange-800
  },

  // Notícias/News - Azul escuro
  news: {
    primary: '#1e40af', // blue-800
    primaryHover: '#1e3a8a', // blue-900
    primaryLight: '#3b82f6', // blue-500
    primaryDark: '#1e3a8a', // blue-900
  },
};

/**
 * Obtém a configuração de cores atual
 * Pode ser sobrescrita via variável de ambiente
 */
export function getColorConfig(): ColorConfig {
  const niche = import.meta.env.VITE_COLOR_NICHE;
  
  if (niche && colorSchemesByNiche[niche]) {
    return {
      ...defaultColorConfig,
      ...colorSchemesByNiche[niche],
    } as ColorConfig;
  }
  
  return defaultColorConfig;
}

/**
 * Converte cor hexadecimal para HSL (formato usado pelo Tailwind)
 */
function hexToHsl(hex: string): string {
  // Remove # se presente
  hex = hex.replace('#', '');
  
  // Converte para RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

/**
 * Gera variáveis CSS para uso no Tailwind
 */
export function generateColorCSS(config: ColorConfig = getColorConfig()): string {
  return `
    :root {
      /* Primary Colors */
      --primary: ${hexToHsl(config.primary)};
      --primary-foreground: ${hexToHsl(config.primaryForeground)};
      
      /* Secondary Colors */
      --secondary: ${hexToHsl(config.secondary)};
      --secondary-foreground: ${hexToHsl(config.secondaryForeground)};
      
      /* Background Colors */
      --background: ${hexToHsl(config.background)};
      --card: ${hexToHsl(config.backgroundCard)};
      --card-foreground: ${hexToHsl(config.foreground)};
      --muted: ${hexToHsl(config.backgroundMuted)};
      --muted-foreground: ${hexToHsl(config.foregroundMuted)};
      --accent: ${hexToHsl(config.backgroundAccent)};
      --accent-foreground: ${hexToHsl(config.foreground)};
      
      /* Foreground Colors */
      --foreground: ${hexToHsl(config.foreground)};
      
      /* State Colors */
      --destructive: ${hexToHsl(config.error)};
      --destructive-foreground: ${hexToHsl(config.errorForeground)};
      
      /* Border Colors */
      --border: ${hexToHsl(config.border)};
      --input: ${hexToHsl(config.inputBorder)};
      --ring: ${hexToHsl(config.primary)};
      
      /* Custom Colors for InfoMoney Style */
      --im-green: ${hexToHsl(config.success)};
      --im-green-dark: ${hexToHsl(config.primaryDark)};
      --im-red: ${hexToHsl(config.error)};
      --im-blue: ${hexToHsl(config.primary)};
      --im-gray-dark: ${hexToHsl(config.foreground)};
      --im-gray-medium: ${hexToHsl(config.foregroundMuted)};
      --im-gray-light: ${hexToHsl(config.backgroundMuted)};
    }
  `;
}
