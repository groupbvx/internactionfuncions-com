// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { NewsletterService } from "@/services/NewsletterService";

// Exported as Newsletter for Lovable template compatibility
export function Newsletter() {
    const [email, setEmail] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot check - if filled, it's a bot
        if (honeypot) {
            return;
        }

        if (!NewsletterService.validateEmail(email)) {
            setError("Por favor, insira um email válido.");
            return;
        }

        setLoading(true);
        setError("");

        const response = await NewsletterService.subscribe({
            email,
            source: "newsletter_section",
        });

        if (response.success) {
            setSubmitted(true);
        } else {
            setError(response.message);
        }

        setLoading(false);
    };

    return (
        <section className="py-12 md:py-16 bg-primary relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div id="bvx-newsletter-base" className="max-w-2xl mx-auto text-center">
                    {/* BVX_NEWSLETTER_WIDGET */}

                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
                        <Mail className="w-8 h-8 text-primary-foreground" />
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                        Receba as principais notícias no seu e-mail
                    </h2>
                    <p className="text-primary-foreground/80 mb-8 text-lg">
                        Análises exclusivas, alertas de mercado e insights dos melhores especialistas. Grátis.
                    </p>

                    {submitted ? (
                        <div className="flex items-center justify-center gap-3 text-accent">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium">Inscrição realizada com sucesso!</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            {/* Honeypot field */}
                            <input
                                type="hidden"
                                name="website_url"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div className="flex-1">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Seu melhor e-mail"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                    disabled={loading || submitted}
                                    data-bvx-track="NEWSLETTER_INPUT"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="btn-gold px-8 disabled:opacity-50"
                                disabled={loading || submitted}
                                data-bvx-track="NEWSLETTER_SUBMIT"
                            >
                                {loading ? "Enviando..." : "Assinar"}
                            </Button>
                        </form>
                    )}

                    {error && (
                        <p className="text-red-300 text-sm mt-4">{error}</p>
                    )}

                    <p className="text-primary-foreground/60 text-xs mt-4">
                        Ao se inscrever, você concorda com nossa Política de Privacidade.
                    </p>
                </div>
            </div>
        </section>
    );
}

// Also export as NewsletterWidget for backward compatibility
export { Newsletter as NewsletterWidget };
