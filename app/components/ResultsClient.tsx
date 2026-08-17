"use client";

import { useEffect, useState } from "react";
import { PageShell } from "./Shell";
import { loadProfile } from "../../lib/storage";
import { traitMeta } from "../../lib/scoring";
import type { TraitKey, TraitScore } from "../../lib/types";

const interpretation: Record<TraitKey, Record<TraitScore["band"], { headline: string; text: string; balance: string }>> = {
  extraversion: {
    lower: { headline: "You may recharge through quieter spaces", text: "Smaller groups and time to think can help you bring your best attention to people.", balance: "Lower social energy does not mean a lack of connection. You can prefer depth and still build strong relationships." },
    middle: { headline: "Your social energy may flex with context", text: "You may enjoy company in some settings and need solitude in others.", balance: "Notice which people and places leave you energized rather than following a fixed rule about being social." },
    higher: { headline: "Connection may give you momentum", text: "Talking, collaborating, and entering lively settings can help ideas and energy move.", balance: "Leave room for listening and recovery so your social strengths stay sustainable." },
  },
  agreeableness: {
    lower: { headline: "You may value candor and independent judgment", text: "You may be comfortable questioning consensus and naming hard truths.", balance: "Pair directness with curiosity so people can hear the useful part of what you see." },
    middle: { headline: "You may balance warmth with directness", text: "You can often cooperate without automatically setting your own view aside.", balance: "Different situations may pull different sides of this balance forward." },
    higher: { headline: "Care and cooperation may come naturally", text: "You may notice others’ needs quickly and help groups feel more connected.", balance: "Boundaries protect your generosity; disagreement does not make you unkind." },
  },
  conscientiousness: {
    lower: { headline: "You may prefer flexibility over tight structure", text: "Spontaneity and adapting in the moment may feel more natural than detailed systems.", balance: "Simple external cues can support follow-through without forcing you into someone else’s perfect routine." },
    middle: { headline: "You may use structure selectively", text: "You can plan when it matters while leaving room to change course.", balance: "Identify which commitments deserve a system and which can stay loose." },
    higher: { headline: "Structure may help you feel capable", text: "Planning, preparation, and follow-through can be reliable strengths.", balance: "Define “done enough” so high standards serve your goals instead of quietly expanding them." },
  },
  emotionalStability: {
    lower: { headline: "You may stay calm under pressure", text: "It may be easier for you to regain perspective during stressful moments.", balance: "Stress can still show up through sleep, tension, appetite, or focus, even when you feel calm." },
    middle: { headline: "Your stress response may depend on the situation", text: "You may stay steady in some situations and react more strongly in others.", balance: "Notice how sleep, relationships, and workload affect your reactions." },
    higher: { headline: "You may react strongly to stress", text: "You may notice worry, tension, and emotional changes quickly or intensely.", balance: "A higher score is not a weakness. Rest, coping skills, and support can make strong reactions easier to manage." },
  },
  openness: {
    lower: { headline: "You may trust the concrete and familiar", text: "Practical examples and proven approaches may feel more useful than novelty for its own sake.", balance: "Growth can begin with a small variation on something you already know works." },
    middle: { headline: "You may blend curiosity with practicality", text: "New ideas can interest you most when they connect to something useful or real.", balance: "Give both imagination and evidence a turn when making decisions." },
    higher: { headline: "Ideas and possibility may energize you", text: "Imagination, complexity, and new perspectives may hold your attention.", balance: "Small experiments can help turn a rich field of ideas into lived experience." },
  },
};

export function ResultsClient() {
  const [scores, setScores] = useState<TraitScore[]>([]);
  useEffect(() => { queueMicrotask(() => setScores(loadProfile().scores)); }, []);
  if (!scores.length) return <PageShell><section className="empty-state"><p className="eyebrow">No results yet</p><h1>Your five traits are waiting.</h1><p>Complete the assessment to see your personal trait landscape.</p><a className="button" href="/assessment">Take the test →</a></section></PageShell>;
  const top = [...scores].sort((a, b) => b.score - a.score)[0];
  return (
    <PageShell>
      <section className="results-hero"><p className="eyebrow">Your Big Five results</p><h1>Five scores based on<br /><em>your answers.</em></h1><p>These scores describe how you answered today. They are not fixed labels, and they can change over time.</p><div className="results-actions"><a className="button" href="/preferences">Personalize my toolkit →</a><button className="ghost-button" onClick={() => window.print()}>Print results</button></div></section>
      <section className="result-summary" aria-label="Your five trait scores">
        <div className="radial-summary"><span className="radial-score">{top.score}</span><span>highest score</span><strong>{top.label}</strong></div>
        <div className="summary-bars">{scores.map((item) => <div key={item.trait}><div className="bar-label"><strong>{item.label}</strong><span>{item.score}/100</span></div><div className="score-track"><span style={{ width: `${item.score}%` }} /></div></div>)}</div>
      </section>
      <section className="results-detail"><div className="section-heading"><p className="section-kicker">Your scores</p><h2>What each trait can mean.</h2></div>{scores.map((item, index) => { const copy = interpretation[item.trait][item.band]; return <article className="result-card" key={item.trait}><div className="result-index">0{index + 1}</div><div className="result-name"><p>{traitMeta[item.trait].short}</p><h3>{item.label}</h3><span className={`band-pill band-${item.band}`}>{item.band} range</span></div><div className="result-score"><strong>{item.score}</strong><span>out of 100</span></div><div className="result-copy"><h4>{copy.headline}</h4><p>{copy.text}</p><div className="balance-note"><strong>Keep in mind</strong><p>{copy.balance}</p></div></div></article>})}</section>
      <section className="next-cta"><p className="eyebrow">Your next step</p><h2>Find resources you would actually try.</h2><p>Tell us what fits your time, interests, and comfort level. Your answers will shape the suggestions in Your Toolkit.</p><a className="button button-light" href="/preferences">Choose activity preferences →</a></section>
    </PageShell>
  );
}
