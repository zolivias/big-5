import Link from "next/link";
import type { ReactNode } from "react";

export function Brand() {
  return <Link className="brand" href="/" aria-label="Path Five home"><span className="brand-mark" aria-hidden="true">5</span><span>Path Five</span></Link>;
}

export function Header() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Main navigation">
        <Link href="/methodology">The science</Link>
        <Link href="/toolkit">Your toolkit</Link>
        <Link className="support-nav" href="/support"><span aria-hidden="true">♡</span> Get support</Link>
      </nav>
      <Link className="button button-small" href="/assessment">Take the test <span aria-hidden="true">→</span></Link>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div><Brand /><p>Personality insight for your next chapter.</p></div>
      <div className="footer-links"><Link href="/methodology">Methodology</Link><Link href="/privacy">Privacy</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/support">Get support</Link></div>
      <p className="footer-note">Path Five is educational and does not provide mental health diagnosis or treatment.</p>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /><Link className="floating-support" href="/support" aria-label="Get support"><span aria-hidden="true">♡</span><span>Get support</span></Link></>;
}

export function InfoHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="info-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{intro}</p></section>;
}
