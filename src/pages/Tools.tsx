// @ts-nocheck
import { config } from '@/lib/config';
import { AdSpot } from '@/components/AdSpot';
import { Calculator, PieChart, TrendingUp, Wallet, Target, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
// trackToolUsed will be REPLACED by the one from base-site during scaffold
import { trackToolUsed } from "@/hooks/useToolTracking";

const tools = [
  {
    icon: Calculator,
    title: "Compound Interest Calculator",
    description: "Simulate the growth of your money over time with compound interest.",
    available: false,
  },
  {
    icon: PieChart,
    title: "Investment Simulator",
    description: "Compare different types of investments and see which is best for you.",
    available: false,
  },
  {
    icon: TrendingUp,
    title: "Stock Analysis",
    description: "Track fundamental and technical indicators of the main stocks.",
    available: false,
  },
  {
    icon: Wallet,
    title: "Budget Planner",
    description: "Organize your personal finances and control your monthly expenses.",
    available: false,
  },
  {
    icon: Target,
    title: "Financial Goals",
    description: "Set and track your savings and investment goals.",
    available: false,
  },
  {
    icon: BarChart3,
    title: "Fund Comparator",
    description: "Compare returns, fees and risks of investment funds.",
    available: false,
  },
];

const Tools = () => {
  return (
    <Layout>
      <SEO
        title="Financial Tools"
        description="Use our free tools to calculate interest, simulate investments and plan your personal finances."
      />

      <div className="container py-8">
        <section className="mb-12">
          <h1 className="headline-xl mb-4">Financial Tools</h1>
          <p className="body-lg text-muted-foreground max-w-2xl">
            Use our free tools to make smarter financial decisions.
            Calculators, simulators and more.
          </p>
        </section>

        {/* Ad Spot */}
        <AdSpot position="in-content" zoneId={config.reviveZoneInArticle1} className="w-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="card-finance p-6 relative overflow-hidden"
            >
              {!tool.available && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    Coming soon
                  </span>
                </div>
              )}

              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>

              <h2 className="headline-sm mb-2">{tool.title}</h2>
              <p className="body-sm text-muted-foreground">{tool.description}</p>

              <button
                className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                  tool.available
                    ? "btn-finance"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
                disabled={!tool.available}
                onClick={() => {
                  if (tool.available) {
                    // Track tool usage (function will be copied from base-site)
                    trackToolUsed(
                      tool.title.toLowerCase().replace(/\s/g, "_"),
                      "calculator",
                      "finance",
                      `/tools/${tool.title.toLowerCase().replace(/\s/g, "-")}`
                    );
                  }
                }}
                data-bvx-track={`TOOL_${tool.title.toUpperCase().replace(/\s/g, "_")}`}
              >
                {tool.available ? "Access" : "Available soon"}
              </button>
            </div>
          ))}
        </div>

        {/* Ad Spot */}
        <AdSpot position="in-content" zoneId={config.reviveZoneInArticle2} className="w-full mt-8" />
      </div>
    </Layout>
  );
};

export default Tools;
