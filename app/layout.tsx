import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Path Five", template: "%s | Path Five" },
  description: "Five traits. Your path forward. A private, educational Big Five self-growth experience for teens and college students.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: { title: "Path Five", description: "Five traits. Your path forward.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Path Five: Five traits. Your path forward." }] },
  twitter: { card: "summary_large_image", title: "Path Five", description: "Five traits. Your path forward.", images: ["/og.png"] },
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
