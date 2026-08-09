"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions, responseOptions } from "../../lib/questions";
import { calculateScores } from "../../lib/scoring";
import { emptyProfile, loadProfile, saveProfile } from "../../lib/storage";
import type { LocalProfile } from "../../lib/types";

export function AssessmentClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<LocalProfile>(emptyProfile);
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => { queueMicrotask(() => { const saved = loadProfile(); setProfile(saved); setCurrent(Math.min(saved.currentQuestion || 0, 49)); setReady(true); }); }, []);
  const question = questions[current];
  const answered = Object.keys(profile.responses).length;

  function update(value: number) {
    const next = { ...profile, responses: { ...profile.responses, [question.id]: value }, currentQuestion: current };
    setProfile(next); saveProfile(next); setNotice("Answer saved on this device.");
    window.setTimeout(() => { if (current < 49) setCurrent((valueNow) => valueNow + 1); }, 180);
  }

  function finish() {
    if (answered !== 50) { setNotice(`You still have ${50 - answered} unanswered question${50 - answered === 1 ? "" : "s"}.`); return; }
    const next = { ...profile, scores: calculateScores(profile.responses), completedAt: new Date().toISOString(), currentQuestion: 49 };
    saveProfile(next); router.push("/results");
  }

  if (!ready) return <div className="loading-state" role="status">Opening your saved progress…</div>;

  return (
    <main className="assessment-shell">
      <div className="assessment-top"><a className="brand" href="/"><span className="brand-mark">5</span><span>Path Five</span></a><a href="/support" className="support-nav">♡ Get support</a></div>
      <div className="assessment-progress" aria-label={`${answered} of 50 questions answered`}><span style={{ width: `${(answered / 50) * 100}%` }} /></div>
      <section className="question-card">
        <div className="question-meta"><span>Question {current + 1} of 50</span><span>{answered} answered</span></div>
        <p className="question-context">How accurately does this describe you right now?</p>
        <h1>{question.text}</h1>
        <fieldset className="answer-scale"><legend className="sr-only">Choose how accurate the statement is</legend>{responseOptions.map((option) => <label key={option.value} className={profile.responses[question.id] === option.value ? "selected" : ""}><input type="radio" name={`q-${question.id}`} value={option.value} checked={profile.responses[question.id] === option.value} onChange={() => update(option.value)} /><span className="answer-dot">{option.value}</span><span>{option.label}</span></label>)}</fieldset>
        <div className="assessment-controls"><button className="ghost-button" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>← Previous</button>{current < 49 ? <button className="ghost-button" onClick={() => setCurrent(Math.min(49, current + 1))}>Next →</button> : <button className="button" onClick={finish}>See my results →</button>}</div>
        <p className="save-notice" aria-live="polite">{notice || "Your progress is stored only in this browser."}</p>
      </section>
    </main>
  );
}
