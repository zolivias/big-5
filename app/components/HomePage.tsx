import { PageShell } from "./Shell";

const traits = [
  ["O", "Openness", "How you explore ideas and experiences", "74"],
  ["C", "Conscientiousness", "How you organize effort", "61"],
  ["E", "Extraversion", "How you direct social energy", "42"],
  ["A", "Agreeableness", "How you approach cooperation", "83"],
  ["N", "Neuroticism", "How strongly you react to stress", "45"],
];

export function HomePage() {
  return (
    <PageShell>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Science-backed self-discovery</p>
          <h1>Five traits.<br /><em>Your path</em> forward.</h1>
          <p className="hero-lede">Learn how you tend to think, plan, connect, and respond to stress. Then get practical tips based on your results.</p>
          <div className="hero-actions"><a className="button" href="/assessment">Discover your traits <span aria-hidden="true">→</span></a><a className="text-link" href="/methodology">See how it works <span aria-hidden="true">↘</span></a></div>
          <div className="trust-row"><span>About 8 minutes</span><span>Private by design</span><span>Free to explore</span></div>
        </div>
        <div className="profile-card" aria-label="Example Big Five trait profile">
          <div className="profile-card-head"><div><p className="eyebrow">Example result</p><h2>Your five-trait profile</h2></div><span className="profile-five">5</span></div>
          <div className="profile-scales">
            {traits.map(([letter, name, , score]) => <div className="profile-scale" key={letter}><span className={`profile-letter profile-${letter.toLowerCase()}`}>{letter}</span><div><div className="profile-scale-name"><strong>{name}</strong><span>{score}</span></div><div className="profile-track"><span style={{ width: `${score}%` }} /></div></div></div>)}
          </div>
          <p className="profile-note">Five separate scores. No personality types.</p>
        </div>
      </section>

      <section className="intro-section">
        <p className="section-kicker">Meet your five traits</p>
        <div className="intro-heading"><h2>Understand your personality in <em>five scores</em></h2><p>The Big Five measures five broad traits on a scale. There are no good or bad scores. Each one describes a tendency that can be useful in different situations.</p></div>
        <div className="trait-preview">
          {traits.map(([letter, name, description, score]) => <article key={letter} className={`trait-row trait-${letter.toLowerCase()}`}><span className="trait-letter">{letter}</span><div><h3>{name}</h3><p>{description}</p></div><div className="mini-scale" aria-label={`Example ${name} score: ${score} out of 100`}><span style={{ width: `${score}%` }} /></div><span className="sample-tag">example</span></article>)}
        </div>
      </section>

      <section className="steps-section">
        <p className="section-kicker">How it works</p><h2>Results you can use.</h2>
        <div className="steps-grid">
          <article><span className="step-number">01</span><h3>Notice your patterns</h3><p>Answer 50 simple prompts based on how you see yourself today. There are no right answers.</p></article>
          <article><span className="step-number">02</span><h3>Read your results</h3><p>See all five scores with clear explanations of what lower, middle, and higher scores can mean.</p></article>
          <article><span className="step-number">03</span><h3>Choose useful resources</h3><p>Pick a goal and get practical activities based on your results.</p></article>
        </div>
        <a className="button button-light" href="/assessment">Start your path <span aria-hidden="true">→</span></a>
      </section>

      <section className="science-callout"><div><p className="eyebrow">Grounded, not diagnostic</p><h2>Personality is one part of who you are.</h2></div><p>The Big Five describes common personality traits. It does not measure your worth, diagnose mental health, or decide who you can become.</p><a href="/methodology" className="text-link">Read our approach →</a></section>
    </PageShell>
  );
}
