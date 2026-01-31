# Colors Guide - Customization System

This template uses a centralized color system that makes customization easy for LangChain based on the niche/domain.

## Main File

**`src/lib/color-config.ts`** - This is the file LangChain should modify to customize colors.

## File Structure

The file contains:

1. **`ColorConfig` Interface**: Defines all available colors
2. **`defaultColorConfig`**: Default configuration (blue for finance)
3. **`colorSchemesByNiche`**: Pre-defined schemes by niche
4. **Helper functions**: To generate CSS and convert colors

## How LangChain Should Modify

### Option 1: Use Pre-defined Scheme

If the niche has a pre-defined scheme, just add to `.env`:
```
VITE_COLOR_NICHE=health
```

### Option 2: Modify the File Directly

Edit `src/lib/color-config.ts` and modify the `defaultColorConfig` object:

```typescript
export const defaultColorConfig: ColorConfig = {
  // Change only the necessary colors
  primary: '#10b981', // Green for health
  primaryHover: '#059669',
  primaryLight: '#34d399',
  primaryDark: '#047857',
  // ... rest remains the same
};
```

### Option 3: Create New Scheme

Add a new scheme in `colorSchemesByNiche`:

```typescript
export const colorSchemesByNiche: Record<string, Partial<ColorConfig>> = {
  // ... existing schemes

  myNiche: {
    primary: '#8b5cf6', // Purple
    primaryHover: '#7c3aed',
    primaryLight: '#a78bfa',
    primaryDark: '#6d28d9',
  },
};
```

## Available Colors

### Primary Colors (Required)
- `primary`: Main site color
- `primaryForeground`: Text on primary
- `primaryHover`: Hover color
- `primaryLight`: Light version
- `primaryDark`: Dark version

### Secondary Colors
- `secondary`: Secondary color
- `secondaryForeground`: Text on secondary
- `secondaryHover`: Hover color

### Background Colors
- `background`: Main background
- `backgroundCard`: Card background
- `backgroundMuted`: Soft background
- `backgroundAccent`: Accent background

### Text Colors
- `foreground`: Main text
- `foregroundMuted`: Secondary text
- `foregroundSubtle`: Subtle text

### State Colors
- `success`: Green for success
- `warning`: Yellow for warnings
- `error`: Red for errors
- `info`: Blue for information

### Border Colors
- `border`: Default border
- `borderLight`: Light border
- `borderDark`: Dark border

### Input Colors
- `inputBackground`: Input background
- `inputBorder`: Input border
- `inputFocus`: Focus color
- `inputPlaceholder`: Placeholder color

## Pre-defined Schemes

- `health`: Green (#10b981)
- `technology`: Purple (#8b5cf6)
- `education`: Orange (#f59e0b)
- `fashion`: Pink (#ec4899)
- `sports`: Red (#ef4444)
- `food`: Orange (#f97316)
- `news`: Dark blue (#1e40af)

## Color Format

All colors should be in hexadecimal format:
- Correct: `'#2563eb'`
- Incorrect: `'rgb(37, 99, 235)'` or `'blue'`

## Example Prompt for LangChain

```
Modify the file src/lib/color-config.ts to customize the site colors.

NICHE: Health
PRIMARY COLOR: Green (#10b981)

Actions:
1. Update the defaultColorConfig object with:
   - primary: '#10b981'
   - primaryHover: '#059669'
   - primaryLight: '#34d399'
   - primaryDark: '#047857'

2. Keep all other colors unchanged.
```

## Tailwind Integration

Colors are automatically converted to HSL and injected as CSS variables that Tailwind uses. There's no need to modify `tailwind.config.ts` or `index.css` directly.

## Verification

After modifying colors:
1. Check if all colors are in hexadecimal format
2. Test if the site loads without errors
3. Verify if colors appear correctly in components
