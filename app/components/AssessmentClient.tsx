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
  const [currentPage, setCurrentPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => { queueMicrotask(() => { const saved = loadProfile(); setProfile(saved); setCurrentPage(Math.min(Math.floor((saved.currentQuestion || 0) / 5), 9)); setReady(true); }); }, []);
  const pageQuestions = questions.slice(currentPage * 5, currentPage * 5 + 5);
  const answered = Object.keys(profile.responses).length;

  function update(questionId: number, value: number) {
    const next = { ...profile, responses: { ...profile.responses, [questionId]: value }, currentQuestion: currentPage * 5 };
    setProfile(next); saveProfile(next); setNotice("Answers saved on this device.");
  }

  function nextPage() {
    const missing = pageQuestions.filter((question) => !profile.responses[question.id]).length;
    if (missing) { setNotice(`Please answer all five questions before continuing. ${missing} remaining.`); return; }
    setNotice("");
    setCurrentPage((page) => Math.min(9, page + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finish() {
    if (answered !== 50) { setNotice(`You still have ${50 - answered} unanswered question${50 - answered === 1 ? "" : "s"}.`); return; }
    const next = { ...profile, scores: calculateScores(profile.responses), completedAt: new Date().toISOString(), currentQuestion: 45 };
    saveProfile(next); router.push("/results");
  }

  if (!ready) return <div className="loading-state" role="status">Opening your saved progress…</div>;

  return (
    <main className="assessment-shell">
      <div className="assessment-top"><a className="brand" href="/" aria-label="Path Five home"><img className="brand-mark" src="/path-five-brand-icon.png" alt="" aria-hidden="true" width="40" height="40" /><span>Path Five</span></a><a href="/support" className="support-nav">♡ Get Support</a></div>
      <div className="assessment-progress" aria-label={`${answered} of 50 questions answered`}><span style={{ width: `${(answered / 50) * 100}%` }} /></div>
      <section className="question-card question-page">
        <div className="question-meta"><span>Page {currentPage + 1} of 10</span><span>{answered} of 50 answered</span></div>
        <div className="question-page-heading"><p className="question-context">How accurately does each statement describe you right now?</p><h1>Questions {currentPage * 5 + 1}–{currentPage * 5 + 5}</h1></div>
        <div className="question-list">{pageQuestions.map((question, index) => <fieldset className="question-block" key={question.id}><legend><span>{currentPage * 5 + index + 1}.</span> {question.text}</legend><div className="answer-scale compact"><span className="scale-end">Inaccurate</span>{responseOptions.map((option) => <label key={option.value} className={profile.responses[question.id] === option.value ? "selected" : ""} title={option.label}><input type="radio" name={`q-${question.id}`} value={option.value} checked={profile.responses[question.id] === option.value} onChange={() => update(question.id, option.value)} /><span className="answer-dot">{option.value}</span><span className="sr-only">{option.label}</span></label>)}<span className="scale-end">Accurate</span></div></fieldset>)}</div>
        <div className="assessment-controls"><button className="ghost-button" onClick={() => { setCurrentPage(Math.max(0, currentPage - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={currentPage === 0}>← Previous</button>{currentPage < 9 ? <button className="button" onClick={nextPage}>Next five →</button> : <button className="button" onClick={finish}>See my results →</button>}</div>
        <p className="save-notice" aria-live="polite">{notice || "Your progress is stored only in this browser."}</p>
      </section>
    </main>
  );
}
