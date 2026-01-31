// @ts-nocheck
import { Target, Users, TrendingUp, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Newsletter } from "@/components/Newsletter";

const values = [
  {
    icon: Target,
    title: "Accuracy",
    description:
      "We are committed to the accuracy and truthfulness of all the information we publish, always based on reliable sources.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description:
      "We make financial knowledge accessible to everyone, regardless of their level of investment experience.",
  },
  {
    icon: TrendingUp,
    title: "Education",
    description:
      "We believe that financial education is the foundation for more conscious and secure investment decisions.",
  },
  {
    icon: Shield,
    title: "Independence",
    description:
      "We maintain editorial independence, with no ties to financial institutions that could influence our content.",
  },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About Us"
        description="Learn about Intern Action Functions, your trusted portal for financial information, market analysis and investment education."
      />

      <div className="container py-8">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="headline-xl mb-6">
            About <span className="text-accent-gradient">{"Intern Action Functions"}</span>
          </h1>
          <p className="body-lg text-muted-foreground">
            We are a portal dedicated to democratizing access to quality financial information.
            Our mission is to empower you with knowledge to make smarter financial decisions
            and achieve your goals.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <div className="card-finance-featured p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="headline-lg mb-4">Our Mission</h2>
                <p className="body-md text-muted-foreground mb-4">
                  {"Intern Action Functions"} was born from the belief that everyone deserves access to
                  clear and impartial financial information. In a world where financial decisions
                  directly impact quality of life, our role is to bridge the gap between the complex
                  world of investments and the everyday investor.
                </p>
                <p className="body-md text-muted-foreground">
                  We analyze the market, translate financial jargon and offer practical tools
                  so you can build your wealth with security and confidence.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="headline-lg text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-finance p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="headline-sm mb-2">{value.title}</h3>
                <p className="body-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="headline-lg text-center mb-8">What We Offer</h2>
          <div className="space-y-6">
            <div className="card-finance p-6">
              <h3 className="headline-sm mb-2">Market Analysis</h3>
              <p className="body-md text-muted-foreground">
                Daily coverage of the main events in the Brazilian and international financial
                markets, with in-depth and contextualized analyses.
              </p>
            </div>
            <div className="card-finance p-6">
              <h3 className="headline-sm mb-2">Financial Education</h3>
              <p className="body-md text-muted-foreground">
                Articles and guides for all levels, from basic personal finance concepts
                to advanced investment strategies.
              </p>
            </div>
            <div className="card-finance p-6">
              <h3 className="headline-sm mb-2">Practical Tools</h3>
              <p className="body-md text-muted-foreground">
                Calculators, simulators and interactive tools to help you
                plan and track your finances.
              </p>
            </div>
            <div className="card-finance p-6">
              <h3 className="headline-sm mb-2">Exclusive Newsletter</h3>
              <p className="body-md text-muted-foreground">
                Weekly summaries with the main news and analyses delivered directly
                to your inbox.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="headline-sm mb-4">Important Notice</h3>
            <p className="body-sm text-muted-foreground">
              {"Intern Action Functions"} provides exclusively informational and educational content.
              We are not a brokerage, distributor or securities consultant.
              The information presented does not constitute investment recommendations.
              Always consult qualified professionals before making financial decisions.
            </p>
            <p className="body-sm text-muted-foreground mt-4">
              The site may include technical, typographical or photographic errors.
              We do not guarantee that any material on the site is accurate, complete or current.
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section>
          <Newsletter />
        </section>
      </div>
    </Layout>
  );
};

export default About;
