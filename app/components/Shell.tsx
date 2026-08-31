import type { ReactNode } from "react";
import { AccountStatus } from "./AccountStatus";

export function Brand() {
  return <a className="brand" href="/" aria-label="Path Five home"><span className="brand-mark" aria-hidden="true">5</span><span>Path Five</span></a>;
}

export function Header() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Main navigation">
        <a href="/methodology">The Science</a>
        <a href="/toolkit">Your Toolkit</a>
        <a className="support-nav" href="/support"><span aria-hidden="true">♡</span> Get Support</a>
        <AccountStatus />
      </nav>
      <a className="button button-small" href="/assessment">Build My Toolkit <span aria-hidden="true">→</span></a>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div><Brand /><p>Personality insight for your next chapter.</p></div>
      <div className="footer-links"><a href="/methodology">Methodology</a><a href="/privacy">Privacy</a><a href="/disclaimer">Disclaimer</a><a href="/support">Get Support</a></div>
      <p className="footer-note">Path Five is educational and does not provide mental health diagnosis or treatment.</p>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <><Header /><AccountStatus warning /><main>{children}</main><Footer /><a className="floating-support" href="/support" aria-label="Get Support"><span aria-hidden="true">♡</span><span>Get Support</span></a></>;
}

export function InfoHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="info-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{intro}</p></section>;
}
