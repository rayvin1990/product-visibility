import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: {
    default: "Product Visibility Checklist - Free Launch Visibility Check for SaaS & AI Tools",
    template: "%s | Product Visibility Checklist"
  },
  description:
    "Free manual launch visibility audit for micro-SaaS and AI tool founders. Check where your product is invisible on Google search, directories, communities, and AI recommendations after launch.",
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
    title: "Product Visibility Checklist - Free Launch Visibility Check for SaaS & AI Tools",
    description:
      "Free manual launch visibility audit. Check where your micro-SaaS or AI tool is invisible across Google search, directories, communities, and AI recommendations after launch.",
    url: "https://product-visibility.vercel.app/",
    siteName: "Product Visibility Checklist",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Product Visibility Checklist - Free Launch Visibility Check",
    description:
      "Free manual launch visibility audit. Check where your micro-SaaS or AI tool is invisible on Google, directories, communities, and AI recommendations."
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
