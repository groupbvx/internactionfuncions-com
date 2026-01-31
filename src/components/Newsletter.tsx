// @ts-nocheck
import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { NewsletterService } from "@/services/NewsletterService";
import { useTranslation } from "@/lib/i18n";

export const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    if (!NewsletterService.validateEmail(email)) {
      setError(t("common.error") + ": " + t("home.newsletter.error"));
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
    <div id="bvx-newsletter-base" className="im-newsletter-box rounded">
      {/* BVX_NEWSLETTER_WIDGET */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4 text-primary-foreground">
          <Mail className="h-10 w-10 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg">{t("home.newsletter.title")}</h3>
            <p className="text-sm text-primary-foreground/80">
              {t("home.newsletter.description")}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 text-primary-foreground animate-fade-in">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">{t("home.newsletter.success")}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 w-full md:w-auto">
            <input
              type="hidden"
              name="website_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("home.newsletter.placeholder")}
                className="flex-1 px-4 py-2.5 text-sm bg-white text-foreground rounded focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={loading}
                data-bvx-track="NEWSLETTER_INPUT"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-foreground text-background font-bold text-sm rounded hover:bg-foreground/90 transition-colors disabled:opacity-50"
                data-bvx-track="NEWSLETTER_SUBMIT"
              >
                {loading ? "..." : t("home.newsletter.button")}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1 mt-2 text-sm text-white">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </form>
        )}
      </div>

      <p className="text-xs text-primary-foreground/60 mt-4 text-center md:text-left">
        {t("home.newsletter.privacy")}{" "}
        <a href="/privacidade" className="underline hover:text-primary-foreground" data-bvx-track="NEWSLETTER_PRIVACY">
          {t("home.newsletter.privacyLink")}
        </a>
      </p>
    </div>
  );
};
