import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: {
    default: "Product Visibility Checklist",
    template: "%s | Product Visibility Checklist"
  },
  description:
    "A lightweight launch visibility checklist for micro-SaaS and AI tool founders. Send a product URL and find where buyers can actually discover it.",
  metadataBase: new URL("https://product-visibility.vercel.app"),
  applicationName: "Product Visibility Checklist",
  keywords: [
    "product visibility checklist",
    "launch visibility check",
    "micro SaaS marketing",
    "AI tool launch checklist",
    "SaaS directory submission",
    "GEO audit",
    "AI search visibility"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Product Visibility Checklist",
    description:
      "Find where your SaaS is invisible after launch across Google, directories, communities, and AI recommendations.",
    url: "https://product-visibility.vercel.app/",
    siteName: "Product Visibility Checklist",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Product Visibility Checklist",
    description:
      "A manual launch visibility check for micro-SaaS and AI tools that need to be found after launch."
  },
  verification: {
    google: "qAvgxASrLcpk0MnK-zQFTL3qZe636USAp4V2U3LIi5M"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
