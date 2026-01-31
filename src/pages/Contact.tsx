// @ts-nocheck
import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://bvx-ai.my.srv.br/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error sending message");

      setSubmitted(true);
    } catch {
      setError("Error sending message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Contact"
        description="Get in touch with the Intern Action Functions team. We're ready to answer your questions and receive your feedback."
      />

      <div className="container py-8 max-w-2xl">
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="headline-xl mb-4">Get in Touch</h1>
          <p className="body-lg text-muted-foreground">
            Have a question, suggestion, or feedback? The {"Intern Action Functions"} team is
            ready to help. Fill out the form below and we'll respond as soon as possible.
          </p>
        </section>

        {submitted ? (
          <div className="card-finance-featured p-12 text-center animate-fade-in">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="headline-md mb-4">Message Sent!</h2>
            <p className="body-md text-muted-foreground">
              Thank you for reaching out. We'll review your message and get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-finance p-8 space-y-6">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
                data-bvx-track="CONTACT_NAME_INPUT"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
                data-bvx-track="CONTACT_EMAIL_INPUT"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                data-bvx-track="CONTACT_SUBJECT_SELECT"
              >
                <option value="">Select a subject</option>
                <option value="question">Question</option>
                <option value="suggestion">Content Suggestion</option>
                <option value="partnership">Partnership</option>
                <option value="bug">Report a Bug</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Write your message..."
                data-bvx-track="CONTACT_MESSAGE_INPUT"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive animate-fade-in">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-finance w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              data-bvx-track="CONTACT_SUBMIT"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              By sending this message, you agree to our{" "}
              <a href="/privacidade" className="link-finance" data-bvx-track="CONTACT_PRIVACY_LINK">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}

        {/* Notice */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground text-center">
            {"Intern Action Functions"} does not offer phone or in-person support.
            All communications are conducted exclusively through this form
            or through our newsletter.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
