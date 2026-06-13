import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on product visibility, launch strategy, and getting found after shipping.",
};

const posts = [
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
          Notes on product visibility, launch problems, and getting found.
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
