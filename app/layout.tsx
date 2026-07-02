import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: {
    default: "Product Visibility Checklist - AI Visibility Snapshot for B2B Products",
    template: "%s | Product Visibility Checklist"
  },
  description:
    "Manual AI visibility snapshot for B2B SaaS, AI tools, and product teams. See whether AI answers understand, cite, and recommend your product, which competitors appear instead, and what source gaps to repair.",
  metadataBase: new URL("https://product-visibility.vercel.app"),
  applicationName: "Product Visibility Checklist",
  keywords: [
    "product visibility checklist",
    "AI visibility snapshot",
    "AI search visibility audit",
    "B2B product visibility",
    "AI recommendation readiness",
    "SaaS directory submission",
    "GEO audit",
    "AI search visibility"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Product Visibility Checklist - AI Visibility Snapshot for B2B Products",
    description:
      "Check whether AI answers understand, cite, and recommend your product, which competitors appear instead, and what source gaps to repair.",
    url: "https://product-visibility.vercel.app/",
    siteName: "Product Visibility Checklist",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Product Visibility Checklist - AI Visibility Snapshot",
    description:
      "Manual AI visibility snapshot for B2B SaaS, AI tools, and product teams."
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
