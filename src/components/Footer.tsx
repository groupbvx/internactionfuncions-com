// @ts-nocheck
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4" data-bvx-track="FOOTER_LOGO">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">$</span>
              </div>
              <span className="font-display text-lg font-bold text-background">
                {"Intern Action Functions"}
              </span>
            </Link>
            <p className="text-sm text-background/70">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4 text-background">{t("footer.quickLinks")}</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_HOME">{t("nav.home")}</Link>
              <Link to="/artigos" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_ARTICLES">{t("nav.articles")}</Link>
              <Link to="/ferramentas" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_TOOLS">{t("nav.tools")}</Link>
              <Link to="/busca" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_SEARCH">{t("common.search")}</Link>
            </nav>
          </div>

          {/* Institutional */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4 text-background">Institutional</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/sobre" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_ABOUT">{t("nav.about")}</Link>
              <Link to="/contato" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_CONTACT">{t("nav.contact")}</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4 text-background">{t("footer.legal")}</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/privacidade" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_PRIVACY">{t("nav.privacy")}</Link>
              <Link to="/termos" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_TERMS">{t("nav.terms")}</Link>
              <Link to="/sitemap" className="text-sm text-background/70 hover:text-primary" data-bvx-track="FOOTER_NAV_SITEMAP">{t("nav.sitemap")}</Link>
            </nav>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-background/20 pt-6">
          <p className="text-xs text-background/50 text-center max-w-3xl mx-auto mb-4">
            The site may include technical, typographical or photographic errors.
            We do not guarantee that any material on the site is accurate, complete or current.
            The information provided does not constitute financial, investment or legal advice.
          </p>
          <p className="text-xs text-background/50 text-center">
            © {currentYear} {"Intern Action Functions"}. {t("footer.copyright")}.
          </p>
        </div>
      </div>
    </footer>
  );
};
