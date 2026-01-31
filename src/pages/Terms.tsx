// @ts-nocheck
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";

const Terms = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Use"
        description="Read the terms of use for Intern Action Functions and learn about the conditions for using our finance portal."
      />

      <div className="container py-8 max-w-4xl">
        <h1 className="headline-xl mb-8">Terms of Use</h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <p className="body-lg text-muted-foreground">
              Welcome to {"Intern Action Functions"}. By accessing and using our site {"internactionfuncions.com"}, you agree
              to comply with and be bound by the following terms and conditions of use.
            </p>
            <p className="body-md text-muted-foreground">
              Last updated: January 2025
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">1. Acceptance of Terms</h2>
            <p className="body-md text-muted-foreground">
              By accessing or using {"Intern Action Functions"}, you confirm that you have read, understood and agree to
              be bound by these Terms of Use. If you do not agree with any part
              of these terms, you should not use our site.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">2. Description of Service</h2>
            <p className="body-md text-muted-foreground mb-4">
              {"Intern Action Functions"} is an informational content portal about finance, investments,
              economy and financial markets. We offer:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Articles and analyses about the financial market</li>
              <li>Economic and investment news</li>
              <li>Financial tools and calculators</li>
              <li>Newsletter with exclusive content</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">3. Financial Disclaimer</h2>
            <p className="body-md text-muted-foreground mb-4">
              <strong>IMPORTANT:</strong> The content published on {"Intern Action Functions"} is
              exclusively for informational and educational purposes. It does not constitute:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Professional financial advice</li>
              <li>Investment recommendation</li>
              <li>Securities consulting</li>
              <li>Legal or accounting guidance</li>
            </ul>
            <p className="body-md text-muted-foreground mt-4">
              Investment decisions should be made after consulting with qualified
              professionals registered with the appropriate regulatory bodies.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">4. Intellectual Property</h2>
            <p className="body-md text-muted-foreground mb-4">
              All content on {"Intern Action Functions"}, including texts, graphics, logos, icons,
              images and software, is the exclusive property of {"Intern Action Functions"} or its
              licensors and is protected by copyright laws.
            </p>
            <p className="body-md text-muted-foreground">
              Reproduction, distribution, modification or commercial use of the content
              without prior written authorization is prohibited.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">5. Acceptable Use</h2>
            <p className="body-md text-muted-foreground mb-4">
              By using our site, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide truthful information when registering</li>
              <li>Not use the site for illegal or harmful activities</li>
              <li>Not attempt to access restricted areas of the system</li>
              <li>Not interfere with the site's operation</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">6. Registration and Newsletter</h2>
            <p className="body-md text-muted-foreground mb-4">
              By subscribing to our newsletter, you:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Agree to receive email communications from {"Intern Action Functions"}</li>
              <li>Confirm that the email address provided is yours</li>
              <li>Can unsubscribe at any time through the link in the emails</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">7. Advertising</h2>
            <p className="body-md text-muted-foreground">
              {"Intern Action Functions"} displays third-party advertisements to fund its operations.
              We are not responsible for the content of advertisements or the products/services
              advertised. Displaying an advertisement does not imply endorsement or recommendation.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">8. External Links</h2>
            <p className="body-md text-muted-foreground">
              Our site may contain links to third-party sites. We have no control over
              the content or practices of these sites and are not responsible for them. Access
              to external sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">9. Limitation of Liability</h2>
            <p className="body-md text-muted-foreground">
              To the maximum extent permitted by law, {"Intern Action Functions"} will not be liable for
              any direct, indirect, incidental, special or consequential damages
              resulting from the use or inability to use our site or content.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">10. Modifications to Terms</h2>
            <p className="body-md text-muted-foreground">
              We reserve the right to modify these Terms of Use at any time.
              Changes take effect immediately upon publication. Continued use
              of the site after modifications constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">11. Governing Law</h2>
            <p className="body-md text-muted-foreground">
              These Terms of Use are governed by applicable laws.
              Any dispute will be resolved in the appropriate courts.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">12. Contact</h2>
            <p className="body-md text-muted-foreground">
              For questions related to these Terms of Use, please contact us through
              our{" "}
              <a href="/contato" className="link-finance" data-bvx-track="TERMS_CONTACT_LINK">
                Contact
              </a> page.
            </p>
          </section>

          <section className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              The site may include technical, typographical or photographic errors.
              We do not guarantee that any material on the site is accurate, complete or current.
              The information provided does not constitute financial, investment or legal advice.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
