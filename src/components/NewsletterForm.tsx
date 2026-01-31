// @ts-nocheck
import { useState } from 'react';
import { NewsletterService } from '../services/NewsletterService';
import { AnalyticsService } from '../services/AnalyticsService';
import { cn } from '../lib/utils';

interface NewsletterFormProps {
    title?: string;
    description?: string;
    buttonText?: string;
    className?: string;
    variant?: 'inline' | 'stacked';
    source?: string;
}

/**
 * NewsletterForm - Formulário de inscrição na newsletter
 * 
 * @component
 * @example
 * <NewsletterForm title="Receba novidades" />
 * <NewsletterForm variant="inline" source="sidebar" />
 */
export function NewsletterForm({
    title = 'Inscreva-se na Newsletter',
    description = 'Receba as últimas novidades diretamente no seu email.',
    buttonText = 'Inscrever',
    className,
    variant = 'stacked',
    source = 'website'
}: NewsletterFormProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    
    // Honeypot field para anti-spam
    const [honeypot, setHoneypot] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Se honeypot preenchido, é bot
        if (honeypot) return;
        
        if (!NewsletterService.validateEmail(email)) {
            setStatus('error');
            setMessage('Por favor, insira um email válido.');
            return;
        }

        setStatus('loading');
        
        const response = await NewsletterService.subscribe({
            email,
            name: name || undefined,
            source,
        });

        if (response.success) {
            setStatus('success');
            setMessage(response.message);
            setEmail('');
            setName('');
            
            AnalyticsService.capture('newsletter_subscribe', {
                source,
                has_name: !!name,
            });
        } else {
            setStatus('error');
            setMessage(response.message);
        }
    };

    if (status === 'success') {
        return (
            <div className={cn('p-6 bg-green-50 rounded-lg text-center', className)}>
                <p className="text-green-700 font-medium">{message}</p>
            </div>
        );
    }

    return (
        <div className={cn('p-6 bg-gray-50 rounded-lg', className)}>
            {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
            {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}
            
            <form onSubmit={handleSubmit} className={cn(
                variant === 'inline' ? 'flex gap-2' : 'space-y-3'
            )}>
                {/* Honeypot - hidden from users, visible to bots */}
                <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                />
                
                {variant === 'stacked' && (
                    <input
                        type="text"
                        placeholder="Seu nome (opcional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                )}
                
                <input
                    type="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={cn(
                        'px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        variant === 'inline' ? 'flex-1' : 'w-full'
                    )}
                />
                
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                        'px-6 py-2 bg-blue-600 text-white font-medium rounded-md',
                        'hover:bg-blue-700 transition-colors',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        variant === 'stacked' && 'w-full'
                    )}
                >
                    {status === 'loading' ? 'Enviando...' : buttonText}
                </button>
            </form>
            
            {status === 'error' && (
                <p className="mt-2 text-red-600 text-sm">{message}</p>
            )}
        </div>
    );
}
