// @ts-nocheck
import { AnalyticsService } from '../services/AnalyticsService';

/**
 * Helper para rastrear uso de ferramenta/calculadora
 * Use esta função quando o usuário interagir com uma ferramenta
 * 
 * @param toolName - Nome da ferramenta (ex: "loan_calculator", "tax_calculator")
 * @param toolType - Tipo da ferramenta (calculator, converter, form, other)
 * @param toolCategory - Categoria (finance, general, etc)
 * @param toolLocation - Localização da ferramenta (pathname ou seção)
 */
export function trackToolUsed(
    toolName: string,
    toolType: string = 'calculator',
    toolCategory: string = 'general',
    toolLocation?: string
): void {
    AnalyticsService.captureToolUsed(toolName, toolType, toolCategory, toolLocation);
}
