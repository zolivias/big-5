import { InfoHero, PageShell } from "../components/Shell";

export default function MethodologyPage() {
  return (
    <PageShell>
      <InfoHero
        eyebrow="The science, in plain language"
        title="How the assessment works."
        intro="Path Five uses the public-domain 50-item IPIP version of the Big Five factor markers. It measures five broad personality traits on separate scales."
      />
      <section className="info-content">
        <article><span>01</span><h2>Five continuous traits</h2><p>Personality research often describes individual differences across openness, conscientiousness, extraversion, agreeableness, and neuroticism. Everyone has a position on every spectrum, and no position determines your worth.</p></article>
        <article><span>02</span><h2>Transparent scoring</h2><p>Each trait is measured with ten statements. Some are keyed in the opposite direction to reduce automatic responding. Answers are scored from 1 to 5, reversed where required, summed, and normalized to a 0 to 100 scale.</p></article>
        <article><span>03</span><h2>No false precision</h2><p>Your score is not shown as a population percentile because Path Five does not yet use a carefully matched normative sample for ages 13 to 24. The ranges are descriptive signposts, not rankings.</p></article>
        <article><span>04</span><h2>Context still matters</h2><p>Mood, culture, environment, life stage, and the way you interpret each question can influence responses. Treat results as a starting point for reflection rather than a permanent verdict.</p></article>
      </section>
      <section className="citation-box">
        <p className="section-kicker">Source &amp; attribution</p><h2>International Personality Item Pool</h2>
        <p>Assessment statements and scoring keys follow the IPIP 50-item sample questionnaire and Goldberg’s Big-Five factor markers. IPIP items are in the public domain.</p>
        <a className="text-link" href="https://ipip.ori.org/new_ipip-50-item-scale.htm" target="_blank" rel="noreferrer">View the original questionnaire ↗</a>
      </section>
      <section className="next-cta"><h2>Curious about your pattern?</h2><p>Answer based on how you usually see yourself right now. There are no right or wrong answers.</p><a className="button button-light" href="/assessment">Take the assessment →</a></section>
    </PageShell>
  );
}
