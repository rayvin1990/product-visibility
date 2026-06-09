import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://product-visibility.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
