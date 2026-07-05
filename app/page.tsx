import { RequestForm } from "../src/RequestForm";
import { VisibilityAnalytics } from "../src/VisibilityAnalytics";
import Link from "next/link";

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Product Visibility Checklist",
    url: "https://product-visibility.vercel.app/",
    description:
      "Product Visibility Checklist is a manual AI visibility snapshot for B2B SaaS, AI tools, and product teams. It checks whether AI answers understand, cite, and recommend a product, which competitors appear instead, and what source gaps to repair.",
    areaServed: "Worldwide",
    serviceType: "Product visibility audit and AI visibility snapshot for B2B products",
    audience: {
      "@type": "Audience",
      audienceType: "B2B SaaS teams, AI tool makers, DTC brands, and marketing owners"
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
          text: "Not fully. The current offer is a manual and agent-assisted snapshot, so the output can include judgment, competitor context, and a concrete repair path before a full monitoring dashboard is built."
        }
      },
      {
        "@type": "Question",
        name: "Who is this for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "B2B SaaS teams, AI tool makers, DTC brands, agencies, and marketing owners who need to know whether AI answers recommend them or their competitors."
        }
      },
      {
        "@type": "Question",
        name: "What does product visibility mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Product visibility means whether buyers, search engines, directories, communities, and AI answer engines can discover, understand, cite, and recommend a product."
        }
      }
    ]
  };

  return (
    <main className="page">
      <VisibilityAnalytics />
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
            <Link className="nav-link" href="/blog" data-track="nav_blog_click">Blog</Link>
            {supportEmail ? (
              <a className="mail-link" href={`mailto:${supportEmail}`} data-track="nav_email_click">
                Email
              </a>
            ) : null}
          </nav>
        </div>
      </header>

      <section className="hero">
        <div>
          <div className="eyebrow">Product Visibility Audit for B2B products</div>
          <h1>Find out if AI answers recommend you or your competitors.</h1>
          <p className="intro">
            A manual and agent-assisted audit for SaaS, AI tools, DTC brands, and marketing teams that need
            to know how ChatGPT, Perplexity, Gemini, and Google AI answers understand their product.
          </p>
          <p className="note">
            Built for teams that need a decision-ready report, not another dashboard to configure.
          </p>
          <p className="definition">
            You get a prompt-level visibility snapshot, competitor mentions, cited source gaps, and a repair
            checklist for the pages, directories, reviews, and entity signals that should be improved first.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#request" data-track="hero_request_snapshot_click">
              Request a snapshot
            </a>
            {supportEmail ? <span className="email-text">{supportEmail}</span> : null}
          </div>
          <div className="proof-strip" aria-label="Audit surfaces">
            <span>ChatGPT</span>
            <span>Perplexity</span>
            <span>Gemini</span>
            <span>Google AI answers</span>
          </div>
        </div>

        <RequestForm />
      </section>

      <section className="intro-section">
        <div className="intro-text">
          <h2>Product visibility is now a revenue and positioning problem.</h2>
          <p>
            Buyers no longer discover products only through blue links. They ask AI assistants for shortlists,
            alternatives, vendor comparisons, and purchase recommendations. If those answers mention competitors
            but not you, the issue is not only SEO. It is a visibility gap across prompts, sources, citations,
            and entity clarity.
          </p>
          <p>
            This service checks how AI systems describe your product, whether they cite useful sources, which
            competitors appear in your category, and what repair work can realistically be done this week. It is
            designed for operators who need a clear before and after, not a vague GEO report.
          </p>
          <p>
            The first version stays manual on purpose. AI answers are noisy, prompt-sensitive, and source-dependent.
            A useful report needs judgment: which gaps matter, which claims are risky, and which fixes should happen
            before monitoring is worth paying for.
          </p>
        </div>
      </section>

      <section className="evidence">
        <div>
          <h2>What the snapshot answers</h2>
          <p>
            The report turns weak AI visibility into a concrete matrix of prompts, competitors, sources, and
            repair actions.
          </p>
        </div>
        <div className="evidence-grid">
          <div className="evidence-item">
            <strong>Prompt coverage</strong>
            <span>Which buyer-intent prompts mention you, ignore you, or confuse your category.</span>
          </div>
          <div className="evidence-item">
            <strong>Competitor presence</strong>
            <span>Which products appear instead of you, and what sources make them more recommendable.</span>
          </div>
          <div className="evidence-item">
            <strong>Source gaps</strong>
            <span>Missing comparison pages, directory listings, reviews, launch pages, and entity signals.</span>
          </div>
          <div className="evidence-item">
            <strong>Repair path</strong>
            <span>A prioritized 7-day fix list before any recurring monitoring or dashboard work.</span>
          </div>
        </div>
      </section>

      <section className="section-grid">
        <div className="section">
          <h2>What I check</h2>
          <ul className="check-list">
            <li>Can AI answers explain what your product is and who should use it?</li>
            <li>Which competitors appear for high-intent category and alternative prompts?</li>
            <li>Which sources are cited, and which credible sources are missing?</li>
            <li>Do your pages support comparison, use-case, and category-level recommendations?</li>
            <li>Which repairs are worth doing before monthly tracking is introduced?</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Who it is for</h2>
          <p>
            B2B SaaS teams, AI tool makers, DTC product brands, and agencies that already care about search,
            category positioning, or lead quality. If a competitor being recommended by AI would matter to your
            pipeline, this is the right stage for a snapshot.
          </p>
        </div>
      </section>

      <section className="output">
        <h2>One audit workflow</h2>
        <div className="output-grid">
          <div className="output-item">
            <strong>1. $49 mini snapshot</strong>
            <span>5 prompts, 2 AI answer engines, competitor mentions, and 3 repair actions.</span>
          </div>
          <div className="output-item">
            <strong>2. $199 readiness audit</strong>
            <span>10 prompts, source matrix, website/entity scan, and a 7-day repair plan.</span>
          </div>
          <div className="output-item">
            <strong>3. $499 repair pack</strong>
            <span>Done-for-you page, schema, directory, and source fixes after the audit.</span>
          </div>
          <div className="output-item">
            <strong>4. Monitoring later</strong>
            <span>Weekly tracking only after the manual report proves a recurring need.</span>
          </div>
        </div>
      </section>

      <section className="faq-wrap">
        <h2>Quick notes</h2>
        <div className="faq">
          <div className="faq-item">
            <h3>Is this automated?</h3>
            <p>
              Not fully. It is manual and agent-assisted so the report can include judgment, competitor context, and
              practical repair advice before a full dashboard exists.
            </p>
          </div>
          <div className="faq-item">
            <h3>What does product visibility mean?</h3>
            <p>
              Product visibility means whether buyers, search engines, directories, communities, and AI answer engines
              can discover, understand, cite, and recommend your product.
            </p>
          </div>
          <div className="faq-item">
            <h3>Why not sell a dashboard immediately?</h3>
            <p>
              AI answers vary by prompt, model, region, and source freshness. A snapshot and repair plan should come
              before recurring monitoring, otherwise the dashboard only measures confusion.
            </p>
          </div>
          <div className="faq-item">
            <h3>Who is this for?</h3>
            <p>
              B2B SaaS teams, AI tools, DTC brands, agencies, and marketing owners who need to know whether AI answers
              recommend them, ignore them, or describe them inaccurately.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
