import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://product-visibility.vercel.app/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: "https://product-visibility.vercel.app/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: "https://product-visibility.vercel.app/blog/product-visibility-vs-seo-vs-geo",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://product-visibility.vercel.app/blog/why-your-product-gets-zero-traffic-after-launch",
      lastModified: new Date("2026-06-13"),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
