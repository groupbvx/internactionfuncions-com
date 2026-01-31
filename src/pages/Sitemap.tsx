// @ts-nocheck
import { Link } from "react-router-dom";
import { Home, FileText, Wrench, Search, Shield, Scale, Users, Mail, Map } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";

const sitemapSections = [
  {
    title: "Main Pages",
    links: [
      { to: "/", label: "Home", icon: Home },
      { to: "/artigos", label: "Articles", icon: FileText },
      { to: "/ferramentas", label: "Tools", icon: Wrench },
      { to: "/busca", label: "Search", icon: Search },
    ],
  },
  {
    title: "Institutional",
    links: [
      { to: "/sobre", label: "About Us", icon: Users },
      { to: "/contato", label: "Contact", icon: Mail },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacidade", label: "Privacy Policy", icon: Shield },
      { to: "/termos", label: "Terms of Use", icon: Scale },
      { to: "/sitemap", label: "Sitemap", icon: Map },
    ],
  },
];

const Sitemap = () => {
  return (
    <Layout>
      <SEO
        title="Sitemap"
        description="Navigate through all pages of Intern Action Functions. Easily find articles, tools and information."
      />

      <div className="container py-8 max-w-4xl">
        <section className="text-center mb-12">
          <h1 className="headline-xl mb-4">Sitemap</h1>
          <p className="body-lg text-muted-foreground">
            Find all pages of {"Intern Action Functions"} organized by category.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sitemapSections.map((section) => (
            <div key={section.title} className="card-finance p-6">
              <h2 className="headline-sm mb-6">{section.title}</h2>
              <nav className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                    data-bvx-track={`SITEMAP_${link.label.toUpperCase().replace(/\s/g, "_")}`}
                  >
                    <link.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Feed Link */}
        <section className="mt-12">
          <div className="card-finance p-6 text-center">
            <h2 className="headline-sm mb-4">Article Feed</h2>
            <p className="body-sm text-muted-foreground mb-4">
              Access our article feed for integration with RSS readers or applications.
            </p>
            <a
              href="https://bvx-ai.my.srv.br/feed/rss"
              target="_blank"
              rel="noopener noreferrer"
              className="link-finance"
              data-bvx-track="SITEMAP_RSS_FEED"
            >
              {"https://bvx-ai.my.srv.br/feed/rss"}
            </a>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-8">
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              The site may include technical, typographical or photographic errors.
              We do not guarantee that any material on the site is accurate, complete or current.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Sitemap;
