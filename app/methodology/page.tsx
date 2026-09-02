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
        <article><span>01</span><h2>What does Path Five measure?</h2><div className="method-copy"><p>The assessment measures five broad traits on separate scales. It does not assign you a personality type.</p><ul><li>Openness</li><li>Conscientiousness</li><li>Extraversion</li><li>Agreeableness</li><li>Neuroticism</li></ul></div></article>
        <article><span>02</span><h2>How are scores calculated?</h2><div className="method-copy"><p>Each trait is measured with ten statements. You respond on a scale from 1 to 5.</p><p>Some statements are scored in the opposite direction. The ten answers are combined and converted to a score from 0 to 100.</p></div></article>
        <article><span>03</span><h2>Why aren’t scores percentiles?</h2><div className="method-copy"><p>Path Five does not yet have a carefully matched comparison sample for people ages 13 to 24.</p><p>For now, lower, middle, and higher ranges are used to help explain your score. They are not rankings against other people.</p></div></article>
        <article><span>04</span><h2>Can results change?</h2><div className="method-copy"><p>Mood, culture, environment, life stage, and how you understand each question can affect your answers.</p><p>Your results are a useful place to begin reflecting on patterns you notice in yourself.</p></div></article>
        <article><span>05</span><h2>How are activities chosen?</h2><div className="method-copy"><p>A Big Five score does not reliably tell us which activity will improve someone’s well-being.</p><p>Path Five relies more on your goals, preferences, practical needs, and feedback when choosing what to show you next.</p></div></article>
      </section>
      <section className="citation-box">
        <p className="section-kicker">Source &amp; attribution</p><h2>International Personality Item Pool</h2>
        <p>Assessment statements and scoring keys follow the IPIP 50-item sample questionnaire and Goldberg’s Big-Five factor markers. IPIP items are in the public domain.</p>
        <a className="text-link" href="https://ipip.ori.org/new_ipip-50-item-scale.htm" target="_blank" rel="noreferrer">View the original questionnaire ↗</a>
      </section>
      <section className="citation-box"><p className="section-kicker">Recommendation research</p><h2>Every toolkit activity shows its evidence.</h2><p>Strong, promising, and contextual labels distinguish direct tests from limited or observational findings. Each card also names the most important limitation.</p><a className="text-link" href="/evidence">Explore the Evidence Library →</a></section>
      <section className="next-cta"><h2>Curious about your pattern?</h2><p>Answer based on how you usually see yourself right now. There are no right or wrong answers.</p><a className="button button-light" href="/assessment">Take the assessment →</a></section>
    </PageShell>
  );
}
