// @ts-nocheck
import { useState } from 'react';
import { trackToolUsed } from '../hooks/useToolTracking';
import { SEO } from '../components/SEO';

/**
 * ToolExample - Exemplo de página de ferramenta/calculadora com tracking
 * 
 * Este é um exemplo. Substitua pela sua ferramenta específica.
 * 
 * IMPORTANTE: Sempre chame trackToolUsed() quando o usuário interagir com a ferramenta
 */
export function ToolExample() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const handleCalculate = () => {
        // Exemplo de cálculo simples
        const value = parseFloat(input);
        if (!isNaN(value)) {
            const calculated = value * 2; // Exemplo: dobrar o valor
            setResult(calculated);

            // Rastrear uso da ferramenta
            trackToolUsed(
                'example_calculator', // tool_name
                'calculator',           // tool_type
                'general',             // tool_category
                '/ferramentas/exemplo' // tool_location
            );
        }
    };

    return (
        <>
            <SEO 
                title="Ferramenta de Exemplo"
                description="Exemplo de ferramenta com tracking de analytics"
            />

            <main className="container mx-auto py-8 px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-6">
                    Ferramenta de Exemplo
                </h1>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Valor de entrada
                            </label>
                            <input
                                type="number"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="Digite um número"
                            />
                        </div>

                        <button
                            onClick={handleCalculate}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            data-bvx-track="tool_used"
                            data-ph-tool-name="example_calculator"
                            data-ph-tool-type="calculator"
                            data-ph-tool-category="general"
                        >
                            Calcular
                        </button>

                        {result !== null && (
                            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                                <p className="text-lg font-semibold">
                                    Resultado: {result}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-sm text-gray-600">
                    <p>
                        <strong>Nota:</strong> Esta é uma página de exemplo. 
                        Substitua pela sua ferramenta específica e sempre chame 
                        <code className="bg-gray-100 px-2 py-1 rounded">trackToolUsed()</code> 
                        quando o usuário interagir.
                    </p>
                </div>
            </main>
        </>
    );
}

export default ToolExample;
