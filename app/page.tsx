import { RequestForm } from "../src/RequestForm";
import Link from "next/link";

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "you@example.com";

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Product Visibility Checklist",
    url: "https://product-visibility.vercel.app/",
    description:
      "Product Visibility Checklist is a lightweight manual launch visibility audit for micro-SaaS and AI tool founders. It checks whether a launched product can be discovered through search engines, directories, communities, and AI recommendations.",
    areaServed: "Worldwide",
    serviceType: "Launch visibility audit for micro-SaaS and AI tools",
    audience: {
      "@type": "Audience",
      audienceType: "Solo founders, micro-SaaS builders, and AI tool makers"
    },
    provider: {
      "@type": "Organization",
      name: "Product Visibility Checklist",
      url: "https://product-visibility.vercel.app/"
    }
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
      },
      {
        "@type": "Question",
        name: "What does product visibility mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Product visibility means the useful places where a buyer, search engine, directory, community thread, or AI answer can discover your product after it launches."
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
            <span className="brand-mark">PV</span>
            Product Visibility Checklist
          </div>
          <nav className="top-nav">
            <Link className="nav-link" href="/blog">Blog</Link>
            <a className="mail-link" href={`mailto:${supportEmail}`}>
              Email
            </a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div>
          <div className="eyebrow">Free launch visibility check</div>
          <h1>Your product is live. But can people actually find it?</h1>
          <p className="intro">
            I am making my own product visible first. If you built a micro-SaaS or AI tool, send me the URL
            and I will manually check the places where new users might discover you.
          </p>
          <p className="note">
            This is intentionally lightweight: no login, no dashboard, no fake automation. Just one useful visibility pass.
          </p>
          <p className="definition">
            Product Visibility Checklist is a manual launch visibility audit. It helps small SaaS and AI tool makers find
            the obvious discovery gaps that appear after launch: missing search pages, missing directories, weak category
            positioning, community blind spots, and AI recommendation invisibility.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#request">
              Send a product URL
            </a>
            <span className="email-text">{supportEmail}</span>
          </div>
        </div>

        <RequestForm />
      </section>

      <section className="intro-section">
        <div className="intro-text">
          <h2>What is product visibility and why does it matter?</h2>
          <p>
            Product visibility is how easily your product can be discovered by potential buyers through the
            channels they actually use every day: Google search, AI recommendations (ChatGPT, Perplexity, Gemini),
            product directories like Product Hunt and BetaList, developer communities like Hacker News and Indie
            Hackers, and social platforms like Reddit and X.
          </p>
          <p>
            Most founders assume that once a product is live, people will find it. In practice, a typical
            micro-SaaS or AI tool launch generates close to zero organic traffic for weeks or months. The
            product exists but it is invisible on Google search because there are no indexed pages ranking for
            relevant queries. It is invisible on directories because nobody submitted it. It is invisible in
            AI recommendations because the few existing mentions lack structured context.
          </p>
          <p>
            A product visibility check reveals these gaps. Rather than guessing why traffic is flat, a
            launch visibility audit looks across search engines, directories, communities, and AI surfaces to
            give you a specific repair list. Knowing where you are invisible is the first step toward getting
            found.
          </p>
          <p>
            Whether you run a small SaaS, a new AI tool, or a solo project, the same principle applies:
            building is only half the work. Being discoverable is the other half. This checklist helps you
            find the missing half.
          </p>
        </div>
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
            I noticed a simple truth while working on my own product: building is getting cheaper, but being discovered
            is still hard. Before turning this into software, I want to manually check real products and learn where
            visibility leaks happen.
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
            <p>
              Not yet. The first version is manual on purpose, because I want the output to be useful before I build a
              full tool.
            </p>
          </div>
          <div className="faq-item">
            <h3>What does product visibility mean?</h3>
            <p>
              Product visibility means the useful places where a buyer, search engine, directory, community thread, or
              AI answer can discover your product after it launches.
            </p>
          </div>
          <div className="faq-item">
            <h3>Is it really free?</h3>
            <p>
              Yes for the first batch. If the same problems repeat, I may later offer paid weekly tracking or
              done-for-you fixes.
            </p>
          </div>
          <div className="faq-item">
            <h3>Who is this for?</h3>
            <p>
              Small SaaS, AI tools, solo founders, and builders who launched something but are not sure where buyers can
              discover it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
