import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Product Visibility Checklist",
  description:
    "A lightweight launch visibility checklist for micro-SaaS and AI tool founders. Send a product URL and find where buyers can actually discover it.",
  metadataBase: new URL("https://product-visibility.vercel.app"),
  openGraph: {
    title: "Product Visibility Checklist",
    description:
      "Find where your SaaS is invisible after launch across Google, directories, communities, and AI recommendations.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
