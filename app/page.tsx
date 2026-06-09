import { RequestForm } from "../src/RequestForm";

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "you@example.com";

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Product Visibility Checklist",
    description:
      "A lightweight launch visibility checklist for micro-SaaS and AI tool founders.",
    areaServed: "Worldwide",
    serviceType: "Launch visibility audit for micro-SaaS and AI tools"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this automated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not yet. The first version is manual on purpose, so the output can be useful before a full tool is built."
        }
      },
      {
        "@type": "Question",
        name: "Who is this for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Small SaaS, AI tools, solo founders, and builders who launched something but are not sure where buyers can discover it."
        }
      }
    ]
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }}
      />

      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark">✓</span>
            Product Visibility Checklist
          </div>
          <a className="mail-link" href={`mailto:${supportEmail}`}>Email</a>
        </div>
      </header>

      <section className="hero">
        <div>
          <div className="eyebrow">Free launch visibility check</div>
          <h1>Your product is live. But can people actually find it?</h1>
          <p className="intro">
            I am making my own product visible first. If you built a micro-SaaS or AI tool,
            send me the URL and I will manually check the places where new users might discover you.
          </p>
          <p className="note">
            This is intentionally lightweight: no login, no dashboard, no fake automation. Just one useful visibility pass.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#request">Send a product URL</a>
            <span className="email-text">{supportEmail}</span>
          </div>
        </div>

        <RequestForm />
      </section>

      <section className="section-grid">
        <div className="section">
          <h2>What I check</h2>
          <ul className="check-list">
            <li>Can Google find your brand and the words buyers actually search?</li>
            <li>Are obvious launch pages, directories, and alternative pages missing?</li>
            <li>Are people discussing the problem in communities without mentioning you?</li>
            <li>Would AI tools recommend competitors before they mention your product?</li>
            <li>What are the first 5-10 surfaces worth fixing this week?</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Why I am doing this</h2>
          <p>
            I noticed a simple truth while working on my own product: building is getting cheaper,
            but being discovered is still hard. Before turning this into software, I want to manually
            check real products and learn where visibility leaks happen.
          </p>
        </div>
      </section>

      <section className="output">
        <h2>You get back</h2>
        <div className="output-grid">
          <div className="output-item">A short visibility gap list</div>
          <div className="output-item">Search and directory notes</div>
          <div className="output-item">A 7-day repair checklist</div>
          <div className="output-item">No sales call required</div>
        </div>
      </section>

      <section className="faq-wrap">
        <h2>Quick notes</h2>
        <div className="faq">
          <div className="faq-item">
            <h3>Is this automated?</h3>
            <p>Not yet. The first version is manual on purpose, because I want the output to be useful before I build a full tool.</p>
          </div>
          <div className="faq-item">
            <h3>Is it really free?</h3>
            <p>Yes for the first batch. If the same problems repeat, I may later offer paid weekly tracking or done-for-you fixes.</p>
          </div>
          <div className="faq-item">
            <h3>Who is this for?</h3>
            <p>Small SaaS, AI tools, solo founders, and builders who launched something but are not sure where buyers can discover it.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
