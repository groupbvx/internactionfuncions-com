// @ts-nocheck
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";

const Privacy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="Learn about our privacy policy and how we handle your personal data at Intern Action Functions."
      />

      <div className="container py-8 max-w-4xl">
        <h1 className="headline-xl mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <p className="body-lg text-muted-foreground">
              This Privacy Policy describes how {"Intern Action Functions"} ("we", "our" or "site")
              collects, uses and shares information about you when you visit our site
              {"internactionfuncions.com"}.
            </p>
            <p className="body-md text-muted-foreground">
              Last updated: January 2025
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">1. Information We Collect</h2>
            <h3 className="headline-sm mb-2">1.1 Information You Provide</h3>
            <p className="body-md text-muted-foreground mb-4">
              We collect information that you provide directly to us, such as:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Email address when you subscribe to our newsletter</li>
              <li>Contact information when you send us a message</li>
              <li>Content preferences and interests</li>
            </ul>

            <h3 className="headline-sm mb-2 mt-6">1.2 Information Collected Automatically</h3>
            <p className="body-md text-muted-foreground mb-4">
              When you visit our site, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>IP address and approximate geographic location</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring site and search terms</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">2. Cookies and Tracking Technologies</h2>
            <p className="body-md text-muted-foreground mb-4">
              <strong>Important:</strong> Third parties, including Google, PostHog and advertising partners,
              may place and read cookies on users' browsers or use web beacons to collect
              information as a result of ads served on our site.
            </p>
            <p className="body-md text-muted-foreground mb-4">
              We use the following types of cookies:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Essential Cookies:</strong> Necessary for the basic functioning of the site</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site (e.g., PostHog)</li>
              <li><strong>Advertising Cookies:</strong> Used to display relevant ads (e.g., Google Ads, Revive Adserver)</li>
            </ul>
            <p className="body-md text-muted-foreground mt-4">
              You can control cookies through your browser settings. Note that
              disabling cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">3. How We Use Your Information</h2>
            <p className="body-md text-muted-foreground mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Send our newsletter and updates about financial content</li>
              <li>Improve our site and user experience</li>
              <li>Analyze usage trends and behavior</li>
              <li>Display personalized ads</li>
              <li>Respond to your questions and requests</li>
              <li>Prevent fraud and illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">4. Information Sharing</h2>
            <p className="body-md text-muted-foreground mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Service Providers:</strong> Companies that help us operate the site, such as hosting and analytics services</li>
              <li><strong>Advertising Partners:</strong> To display relevant ads on our site</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="body-md text-muted-foreground mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">5. Your Rights</h2>
            <p className="body-md text-muted-foreground mb-4">
              In accordance with applicable data protection laws, you have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Correct incomplete or outdated data</li>
              <li>Request deletion of your data</li>
              <li>Revoke your consent at any time</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">6. Security</h2>
            <p className="body-md text-muted-foreground">
              We implement technical and organizational security measures to protect your
              information against unauthorized access, alteration, disclosure or destruction.
              However, no data transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">7. Changes to This Policy</h2>
            <p className="body-md text-muted-foreground">
              We may update this Privacy Policy periodically. We will notify you of
              any changes by posting the new policy on this page and updating the
              "last updated" date.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">8. Contact</h2>
            <p className="body-md text-muted-foreground">
              If you have questions about this Privacy Policy or how we handle
              your data, please contact us through our{" "}
              <a href="/contato" className="link-finance" data-bvx-track="PRIVACY_CONTACT_LINK">
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

export default Privacy;
