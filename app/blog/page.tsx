import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on product visibility, AI recommendation visibility, SEO, GEO, and getting found by buyers.",
};

const posts = [
  {
    slug: "product-visibility-vs-seo-vs-geo",
    title: "Product visibility vs SEO vs GEO",
    date: "July 1, 2026",
    desc: "A practical definition of product visibility, how it differs from SEO and GEO, and what an AI visibility snapshot should inspect.",
  },
  {
    slug: "why-your-product-gets-zero-traffic-after-launch",
    title: "Why your product gets zero traffic after launch",
    date: "June 13, 2026",
    desc: "Building is getting cheaper, but being found still isn't. Here is what visibility actually looks like for a new site.",
  },
];

export default function BlogPage() {
  return (
    <main className="page blog-listing">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark">PV</span>
            Product Visibility Checklist
          </div>
          <nav className="top-nav">
            <Link className="nav-link" href="/">Home</Link>
            <Link className="nav-link" href="/blog">Blog</Link>
          </nav>
        </div>
      </header>

      <div className="blog-container">
        <h1>Blog</h1>
        <p className="blog-subtitle">
          Notes on product visibility, AI recommendations, SEO, GEO, and getting found by buyers.
        </p>
        <div className="post-list">
          {posts.map((p) => (
            <article key={p.slug} className="post-card">
              <time className="post-date">{p.date}</time>
              <Link href={`/blog/${p.slug}`} className="post-title-link">
                <h2>{p.title}</h2>
              </Link>
              <p className="post-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
