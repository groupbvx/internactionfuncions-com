# Guia de Tracking de Eventos - BVX Analytics

Este guia explica como implementar tracking de eventos nos sites gerados para que apareçam no painel de analytics.

## ✅ Eventos Implementados Automaticamente

### 1. Newsletter Subscription
✅ **Já implementado** - O componente `NewsletterForm` e `NewsletterService` já rastreiam automaticamente.

### 2. Article Scroll Depth
✅ **Já implementado** - O hook `useScrollDepth` está sendo usado em `ArticleDetail.tsx`.

## 📝 Eventos que Precisam ser Implementados

### 3. Sponsor Banner Clicks

Use o componente `SponsorBanner` que já inclui tracking automático:

```tsx
import { SponsorBanner } from '@/components/SponsorBanner';

<SponsorBanner
    href="https://sponsor.com"
    imageUrl="/sponsor.png"
    alt="Sponsor Name"
    location="sidebar" // ou 'header', 'footer', 'in-content'
    sponsorId="sponsor-123"
    sponsorName="Sponsor Name"
/>
```

**Ou manualmente:**

```tsx
import { AnalyticsService } from '@/services/AnalyticsService';

<a
    href={sponsorUrl}
    onClick={() => {
        AnalyticsService.captureSponsorBannerClick(
            'sidebar',      // location
            'sponsor-123',  // sponsorId (opcional)
            'Sponsor Name'  // sponsorName (opcional)
        );
    }}
>
    <img src={sponsorImage} alt="Sponsor" />
</a>
```

### 4. AdSense Banner Clicks

Use o componente `GoogleAdSense` que já inclui tracking automático:

```tsx
import { GoogleAdSense } from '@/components/GoogleAdSense';

<GoogleAdSense
    adSlot="1234567890"
    location="sidebar" // ou 'header', 'footer', 'inline'
    adFormat="auto"
/>
```

**Ou para Revive Ads (AdSpot):**
✅ **Já implementado** - O componente `AdSpot` já rastreia cliques automaticamente.

### 5. Search Tracking

Use o hook `useSearchTracking` na página de busca:

```tsx
import { useSearchTracking, trackSearchResultClick } from '@/hooks/useSearchTracking';
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);

    // Rastrear busca automaticamente
    useSearchTracking(query, results.length, 'search-page');

    return (
        <div>
            {results.map((article, index) => (
                <Link
                    key={article.id}
                    to={`/artigo/${article.slug}`}
                    onClick={() => {
                        trackSearchResultClick(query, index, article.title);
                    }}
                >
                    {article.title}
                </Link>
            ))}
        </div>
    );
}
```

### 6. Tool Usage Tracking

Use o helper `trackToolUsed` quando o usuário interagir com uma ferramenta:

```tsx
import { trackToolUsed } from '@/hooks/useToolTracking';

function LoanCalculator() {
    const handleCalculate = () => {
        // ... lógica de cálculo ...

        // Rastrear uso da ferramenta
        trackToolUsed(
            'loan_calculator',  // tool_name
            'calculator',        // tool_type: 'calculator' | 'converter' | 'form' | 'other'
            'finance',           // tool_category: 'finance' | 'general' | etc
            '/tools/loan-calculator' // tool_location (opcional, usa pathname se não fornecido)
        );
    };

    return (
        <button onClick={handleCalculate}>
            Calcular
        </button>
    );
}
```

## 🎯 Checklist de Implementação

Para garantir que todos os eventos sejam rastreados:

- [x] Newsletter - ✅ Já implementado
- [x] Article Scroll - ✅ Já implementado em ArticleDetail
- [ ] Sponsor Banners - Adicionar componente `SponsorBanner` ou tracking manual
- [x] AdSense/Revive Ads - ✅ Já implementado em AdSpot
- [ ] Search - Adicionar `useSearchTracking` na página de busca
- [ ] Tools - Adicionar `trackToolUsed` em todas as ferramentas/calculadoras

## 📚 Componentes e Hooks Disponíveis

### Hooks
- `useScrollDepth(articleId?, articleSlug?, enabled?, threshold?)` - Tracking de scroll
- `useSearchTracking(query, resultsCount, location)` - Tracking de buscas

### Helpers
- `trackToolUsed(toolName, toolType, toolCategory, toolLocation?)` - Tracking de ferramentas
- `trackSearchResultClick(query, position, title)` - Tracking de cliques em resultados

### Componentes
- `SponsorBanner` - Banner de patrocínio com tracking automático
- `GoogleAdSense` - Anúncio AdSense com tracking automático
- `AdSpot` - Anúncio Revive com tracking automático ✅

### Serviços
- `AnalyticsService.captureSponsorBannerClick(...)`
- `AnalyticsService.captureAdSenseBannerClick(...)`
- `AnalyticsService.captureToolUsed(...)`
- `AnalyticsService.captureSearchPerformed(...)`
- `AnalyticsService.captureSearchResultClick(...)`
- `AnalyticsService.captureArticleScrollDeep(...)`

## 🔍 Verificação

Para verificar se os eventos estão sendo enviados:

1. Abra o DevTools do navegador
2. Vá para a aba Network
3. Filtre por "posthog" ou "capture"
4. Realize a ação (clique, busca, etc)
5. Verifique se a requisição foi enviada com os dados corretos

## 📖 Exemplos Completos

Veja os arquivos de exemplo:
- `src/pages/Search.tsx` - Exemplo completo de página de busca com tracking
- `src/pages/ToolExample.tsx` - Exemplo completo de ferramenta com tracking
- `src/pages/ArticleDetail.tsx` - Exemplo de uso do useScrollDepth
