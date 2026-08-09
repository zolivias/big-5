import { PageShell } from "./Shell";

const traits = [
  ["O", "Openness", "How you explore ideas and experiences", "74"],
  ["C", "Conscientiousness", "How you organize effort", "61"],
  ["E", "Extraversion", "How you direct social energy", "42"],
  ["A", "Agreeableness", "How you approach cooperation", "83"],
  ["S", "Emotional stability", "How you respond to stress", "55"],
];

export function HomePage() {
  return (
    <PageShell>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Science-backed self-discovery</p>
          <h1>Five traits.<br /><em>Your path</em> forward.</h1>
          <p className="hero-lede">Understand the patterns that shape how you think, connect, and grow—then turn insight into small steps that actually fit you.</p>
          <div className="hero-actions"><a className="button" href="/assessment">Discover your traits <span aria-hidden="true">→</span></a><a className="text-link" href="/methodology">See how it works <span aria-hidden="true">↘</span></a></div>
          <div className="trust-row"><span>About 8 minutes</span><span>Private by design</span><span>Free to explore</span></div>
        </div>
        <div className="portrait-card" aria-label="Illustrative preview of the five personality traits">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="portrait-shape"><div className="portrait-face" /><div className="portrait-neck" /></div>
          <span className="trait-orb orb-o">O</span><span className="trait-orb orb-c">C</span><span className="trait-orb orb-e">E</span><span className="trait-orb orb-a">A</span><span className="trait-orb orb-s">S</span>
          <p><strong>Your personality isn’t a box.</strong><br />It’s a landscape you can learn to navigate.</p>
        </div>
      </section>

      <section className="intro-section">
        <p className="section-kicker">Meet your five traits</p>
        <div className="intro-heading"><h2>A clearer way to understand <em>yourself</em></h2><p>The Big Five describes personality through five broad, continuous traits. There are no “good” scores—just patterns, preferences, and room to grow.</p></div>
        <div className="trait-preview">
          {traits.map(([letter, name, description, score]) => <article key={letter} className={`trait-row trait-${letter.toLowerCase()}`}><span className="trait-letter">{letter}</span><div><h3>{name}</h3><p>{description}</p></div><div className="mini-scale" aria-label={`Example ${name} score: ${score} out of 100`}><span style={{ width: `${score}%` }} /></div><span className="sample-tag">example</span></article>)}
        </div>
      </section>

      <section className="steps-section">
        <p className="section-kicker">A path built around you</p><h2>Insight that goes somewhere.</h2>
        <div className="steps-grid">
          <article><span className="step-number">01</span><h3>Notice your patterns</h3><p>Answer 50 simple prompts based on how you see yourself today. There are no right answers.</p></article>
          <article><span className="step-number">02</span><h3>See the whole picture</h3><p>Explore five trait spectrums with balanced context—strengths, tradeoffs, and nuance.</p></article>
          <article><span className="step-number">03</span><h3>Try what fits</h3><p>Choose a goal and get practical experiments shaped around your results, not a personality label.</p></article>
        </div>
        <a className="button button-light" href="/assessment">Start your path <span aria-hidden="true">→</span></a>
      </section>

      <section className="science-callout"><div><p className="eyebrow">Grounded, not diagnostic</p><h2>Personality is one part of your story.</h2></div><p>The Big Five is a widely researched framework for describing patterns—not measuring your worth, diagnosing mental health, or predicting who you must become.</p><a href="/methodology" className="text-link">Read our approach →</a></section>
    </PageShell>
  );
}
