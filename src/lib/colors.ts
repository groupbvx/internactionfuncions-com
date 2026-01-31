// @ts-nocheck
/**
 * Design Tokens - Sistema de Cores Centralizado
 * 
 * Este arquivo centraliza todas as cores do template, facilitando
 * a personalização pelo LangChain baseado no nicho/domínio.
 * 
 * O LangChain pode modificar este arquivo para adaptar as cores
 * ao tema do site (ex: finanças = azul, saúde = verde, etc.)
 */

export interface ColorScheme {
  // Cores Primárias
  primary: {
    DEFAULT: string;
    foreground: string;
    hover: string;
    light: string;
    dark: string;
  };
  
  // Cores Secundárias
  secondary: {
    DEFAULT: string;
    foreground: string;
    hover: string;
    light: string;
    dark: string;
  };
  
  // Cores de Fundo
  background: {
    DEFAULT: string;
    card: string;
    muted: string;
    accent: string;
  };
  
  // Cores de Texto
  foreground: {
    DEFAULT: string;
    muted: string;
    subtle: string;
  };
  
  // Cores de Estado
  success: {
    DEFAULT: string;
    foreground: string;
    light: string;
  };
  
  warning: {
    DEFAULT: string;
    foreground: string;
    light: string;
  };
  
  error: {
    DEFAULT: string;
    foreground: string;
    light: string;
  };
  
  info: {
    DEFAULT: string;
    foreground: string;
    light: string;
  };
  
  // Cores de Borda
  border: {
    DEFAULT: string;
    light: string;
    dark: string;
  };
  
  // Cores de Input
  input: {
    background: string;
    border: string;
    focus: string;
    placeholder: string;
  };
}

/**
 * Esquema de cores padrão (Finanças/Financeiro)
 * Azul profissional e confiável
 */
export const defaultColors: ColorScheme = {
  primary: {
    DEFAULT: '#2563eb', // blue-600
    foreground: '#ffffff',
    hover: '#1d4ed8', // blue-700
    light: '#3b82f6', // blue-500
    dark: '#1e40af', // blue-800
  },
  secondary: {
    DEFAULT: '#64748b', // slate-500
    foreground: '#ffffff',
    hover: '#475569', // slate-600
    light: '#94a3b8', // slate-400
    dark: '#475569', // slate-600
  },
  background: {
    DEFAULT: '#ffffff',
    card: '#f8fafc', // slate-50
    muted: '#f1f5f9', // slate-100
    accent: '#e2e8f0', // slate-200
  },
  foreground: {
    DEFAULT: '#0f172a', // slate-900
    muted: '#64748b', // slate-500
    subtle: '#94a3b8', // slate-400
  },
  success: {
    DEFAULT: '#10b981', // emerald-500
    foreground: '#ffffff',
    light: '#d1fae5', // emerald-100
  },
  warning: {
    DEFAULT: '#f59e0b', // amber-500
    foreground: '#ffffff',
    light: '#fef3c7', // amber-100
  },
  error: {
    DEFAULT: '#ef4444', // red-500
    foreground: '#ffffff',
    light: '#fee2e2', // red-100
  },
  info: {
    DEFAULT: '#3b82f6', // blue-500
    foreground: '#ffffff',
    light: '#dbeafe', // blue-100
  },
  border: {
    DEFAULT: '#e2e8f0', // slate-200
    light: '#f1f5f9', // slate-100
    dark: '#cbd5e1', // slate-300
  },
  input: {
    background: '#ffffff',
    border: '#e2e8f0', // slate-200
    focus: '#2563eb', // blue-600
    placeholder: '#94a3b8', // slate-400
  },
};

/**
 * Esquemas de cores pré-definidos por nicho
 */
export const colorSchemes: Record<string, Partial<ColorScheme>> = {
  // Saúde/Health - Verde
  health: {
    primary: {
      DEFAULT: '#10b981', // emerald-600
      foreground: '#ffffff',
      hover: '#059669', // emerald-700
      light: '#34d399', // emerald-400
      dark: '#047857', // emerald-800
    },
  },
  
  // Tecnologia/Tech - Roxo
  technology: {
    primary: {
      DEFAULT: '#8b5cf6', // violet-600
      foreground: '#ffffff',
      hover: '#7c3aed', // violet-700
      light: '#a78bfa', // violet-400
      dark: '#6d28d9', // violet-800
    },
  },
  
  // Educação/Education - Laranja
  education: {
    primary: {
      DEFAULT: '#f59e0b', // amber-600
      foreground: '#ffffff',
      hover: '#d97706', // amber-700
      light: '#fbbf24', // amber-400
      dark: '#b45309', // amber-800
    },
  },
  
  // Moda/Fashion - Rosa
  fashion: {
    primary: {
      DEFAULT: '#ec4899', // pink-600
      foreground: '#ffffff',
      hover: '#db2777', // pink-700
      light: '#f472b6', // pink-400
      dark: '#be185d', // pink-800
    },
  },
  
  // Esportes/Sports - Vermelho
  sports: {
    primary: {
      DEFAULT: '#ef4444', // red-600
      foreground: '#ffffff',
      hover: '#dc2626', // red-700
      light: '#f87171', // red-400
      dark: '#b91c1c', // red-800
    },
  },
  
  // Culinária/Food - Laranja
  food: {
    primary: {
      DEFAULT: '#f97316', // orange-600
      foreground: '#ffffff',
      hover: '#ea580c', // orange-700
      light: '#fb923c', // orange-400
      dark: '#c2410c', // orange-800
    },
  },
};

/**
 * Obtém o esquema de cores atual
 * Pode ser sobrescrito via variável de ambiente ou configuração
 */
export function getColorScheme(): ColorScheme {
  // Verificar se há um esquema customizado via env
  const customScheme = import.meta.env.VITE_COLOR_SCHEME;
  
  if (customScheme && colorSchemes[customScheme]) {
    return {
      ...defaultColors,
      ...colorSchemes[customScheme],
    } as ColorScheme;
  }
  
  return defaultColors;
}

/**
 * Gera variáveis CSS customizadas para uso no Tailwind
 */
export function generateCSSVariables(scheme: ColorScheme = getColorScheme()): string {
  return `
    :root {
      /* Primary Colors */
      --color-primary: ${scheme.primary.DEFAULT};
      --color-primary-foreground: ${scheme.primary.foreground};
      --color-primary-hover: ${scheme.primary.hover};
      --color-primary-light: ${scheme.primary.light};
      --color-primary-dark: ${scheme.primary.dark};
      
      /* Secondary Colors */
      --color-secondary: ${scheme.secondary.DEFAULT};
      --color-secondary-foreground: ${scheme.secondary.foreground};
      --color-secondary-hover: ${scheme.secondary.hover};
      --color-secondary-light: ${scheme.secondary.light};
      --color-secondary-dark: ${scheme.secondary.dark};
      
      /* Background Colors */
      --color-background: ${scheme.background.DEFAULT};
      --color-background-card: ${scheme.background.card};
      --color-background-muted: ${scheme.background.muted};
      --color-background-accent: ${scheme.background.accent};
      
      /* Foreground Colors */
      --color-foreground: ${scheme.foreground.DEFAULT};
      --color-foreground-muted: ${scheme.foreground.muted};
      --color-foreground-subtle: ${scheme.foreground.subtle};
      
      /* State Colors */
      --color-success: ${scheme.success.DEFAULT};
      --color-success-foreground: ${scheme.success.foreground};
      --color-success-light: ${scheme.success.light};
      
      --color-warning: ${scheme.warning.DEFAULT};
      --color-warning-foreground: ${scheme.warning.foreground};
      --color-warning-light: ${scheme.warning.light};
      
      --color-error: ${scheme.error.DEFAULT};
      --color-error-foreground: ${scheme.error.foreground};
      --color-error-light: ${scheme.error.light};
      
      --color-info: ${scheme.info.DEFAULT};
      --color-info-foreground: ${scheme.info.foreground};
      --color-info-light: ${scheme.info.light};
      
      /* Border Colors */
      --color-border: ${scheme.border.DEFAULT};
      --color-border-light: ${scheme.border.light};
      --color-border-dark: ${scheme.border.dark};
      
      /* Input Colors */
      --color-input-background: ${scheme.input.background};
      --color-input-border: ${scheme.input.border};
      --color-input-focus: ${scheme.input.focus};
      --color-input-placeholder: ${scheme.input.placeholder};
    }
  `;
}
