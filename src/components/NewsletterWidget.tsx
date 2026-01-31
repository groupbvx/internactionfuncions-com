// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { NewsletterService } from "@/services/NewsletterService";

export function NewsletterWidget() {
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
      source: "sidebar_widget",
    });

    if (response.success) {
      setSubmitted(true);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div
      id="bvx-newsletter-base"
      className="bg-primary rounded-2xl p-6 md:p-8"
    >
      {/* BVX_NEWSLETTER_WIDGET */}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
          <Mail className="h-6 w-6 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-primary-foreground">
            Newsletter Financeira
          </h3>
          <p className="text-primary-foreground/70 text-sm">
            Receba as melhores análises diretamente no seu e-mail
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="flex items-center gap-3 text-accent">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Inscrição realizada com sucesso!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              data-bvx-track="newsletter_submit"
            >
              {loading ? "Enviando..." : "Inscrever-se"}
            </Button>
          </div>

          {/* Honeypot field - hidden from users */}
          <input
            type="hidden"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />

          <p className="text-primary-foreground/50 text-xs">
            Ao se inscrever, você concorda com nossa política de privacidade. Você pode cancelar a qualquer momento.
          </p>

          {error && (
            <p className="text-red-300 text-sm mt-2">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}
