import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Path Five", template: "%s | Path Five" },
  description: "A private self-growth toolkit with practical activities shaped by your goals, preferences, and personality.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: { title: "Path Five", description: "Practical support, built around you.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Path Five personalized self-growth toolkit" }] },
  twitter: { card: "summary_large_image", title: "Path Five", description: "Practical support, built around you.", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
