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
          <p className="eyebrow"><span aria-hidden="true">✦</span> A personalized self-growth toolkit</p>
          <h1>Practical support.<br /><em>Built around you.</em></h1>
          <p className="hero-lede">Find evidence-reviewed activities that fit your goals, interests, time, and comfort level. The Big Five assessment is one starting point, not the destination.</p>
          <div className="hero-actions"><a className="button" href="/assessment">Build my toolkit <span aria-hidden="true">→</span></a><a className="text-link" href="/methodology">See how it works <span aria-hidden="true">↘</span></a></div>
          <div className="trust-row"><span>About 8 minutes</span><span>Private by design</span><span>Free to explore</span></div>
        </div>
        <div className="profile-card toolkit-preview" aria-label="Example personalized activity toolkit">
          <div className="profile-card-head"><div><p className="eyebrow">Example toolkit</p><h2>Ideas you might actually try</h2></div><span className="profile-five">↗</span></div>
          <div className="toolkit-preview-list">
            <article><span>10 min · solo</span><h3>The ten-minute opening</h3><p>For getting started with less friction.</p></article>
            <article><span>5 min · no supplies</span><h3>Move for one song</h3><p>For a quick change in energy or mood.</p></article>
            <article><span>Pair · small challenge</span><h3>Ask before advising</h3><p>For clearer, more useful support.</p></article>
          </div>
          <p className="profile-note">Your goals and preferences shape the toolkit. Personality is only one part.</p>
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
          <article><span className="step-number">01</span><h3>Share what fits</h3><p>Tell us about your goals, interests, available time, and the kinds of activities you would consider.</p></article>
          <article><span className="step-number">02</span><h3>Add personality context</h3><p>Use the Big Five to describe broad tendencies, without turning them into a type or diagnosis.</p></article>
          <article><span className="step-number">03</span><h3>Explore your toolkit</h3><p>Browse ranked activities, save useful ideas, dismiss poor fits, and switch goals whenever you want.</p></article>
        </div>
        <a className="button button-light" href="/assessment">Start your path <span aria-hidden="true">→</span></a>
      </section>

      <section className="science-callout"><div><p className="eyebrow">Grounded, not diagnostic</p><h2>Personality is one part of who you are.</h2></div><p>The Big Five describes common personality traits. It does not measure your worth, diagnose mental health, or decide who you can become.</p><a href="/methodology" className="text-link">Read our approach →</a></section>
    </PageShell>
  );
}
