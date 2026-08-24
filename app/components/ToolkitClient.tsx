"use client";

import { useEffect, useMemo, useState } from "react";
import { PageShell } from "./Shell";
import { activityLibrary, describeRecommendationReason, getRecommendations, goals } from "../../lib/recommendations";
import { loadProfile, saveProfile } from "../../lib/storage";
import type { ActivityCompletion, GoalKey, LocalProfile } from "../../lib/types";

const emptyFeedback: Omit<ActivityCompletion, "activityId" | "completedAt"> = { helpful: "somewhat", similar: "maybe", nextStep: "same" };

export function ToolkitClient() {
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showDismissed, setShowDismissed] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState(emptyFeedback);
  useEffect(() => { queueMicrotask(() => setProfile(loadProfile())); }, []);
  const rankedItems = useMemo(() => profile ? getRecommendations(profile.scores, profile.goal, profile.activityPreferences, profile.activityHistory).filter((item) => !profile.dismissed.includes(item.id) && !profile.activityHistory?.some((entry) => entry.activityId === item.id)) : [], [profile]);
  const dismissedItems = useMemo(() => profile ? activityLibrary.filter((item) => profile.dismissed.includes(item.id)) : [], [profile]);
  const completedItems = useMemo(() => profile ? (profile.activityHistory || []).map((completion) => ({ completion, item: activityLibrary.find((item) => item.id === completion.activityId) })).filter((entry) => entry.item) : [], [profile]);
  const items = rankedItems.slice(0, visibleCount);
  if (!profile) return <div className="loading-state" role="status">Opening your toolkit…</div>;
  if (!profile.scores.length) return <PageShell><section className="empty-state"><p className="eyebrow">Personalize your toolkit</p><h1>Start with your five traits.</h1><p>Your assessment results help explain why each activity might fit.</p><a className="button" href="/assessment">Take the test →</a></section></PageShell>;
  const currentProfile = profile;
  function update(next: LocalProfile) { setProfile(next); saveProfile(next); }
  function setGoal(goal: GoalKey) { setVisibleCount(6); update({ ...currentProfile, goal }); }
  function toggleBookmark(id: string) { update({ ...currentProfile, bookmarks: currentProfile.bookmarks.includes(id) ? currentProfile.bookmarks.filter((entry) => entry !== id) : [...currentProfile.bookmarks, id] }); }
  function dismiss(id: string) { update({ ...currentProfile, dismissed: [...currentProfile.dismissed, id] }); }
  function restore(id: string) { update({ ...currentProfile, dismissed: currentProfile.dismissed.filter((entry) => entry !== id) }); }
  function beginCompletion(id: string) { setFeedback(emptyFeedback); setCompletingId(id); }
  function saveCompletion() {
    if (!completingId) return;
    const completion: ActivityCompletion = { activityId: completingId, completedAt: new Date().toISOString(), ...feedback };
    update({ ...currentProfile, activityHistory: [...(currentProfile.activityHistory || []).filter((entry) => entry.activityId !== completingId), completion], bookmarks: currentProfile.bookmarks.filter((id) => id !== completingId) });
    setCompletingId(null); setVisibleCount(6); setShowProgress(true);
  }
  function tryAgain(id: string) { update({ ...currentProfile, activityHistory: (currentProfile.activityHistory || []).filter((entry) => entry.activityId !== id) }); }
  return (
    <PageShell>
      <section className="toolkit-hero"><p className="eyebrow">Your Toolkit</p><h1>What do you want <em>help with</em> right now?</h1><p>Choose a goal. Your traits, preferences, and activity feedback help rank the library for you.</p><div className="goal-grid">{goals.map((goal) => <button key={goal.key} className={currentProfile.goal === goal.key ? "active" : ""} onClick={() => setGoal(goal.key)}><span aria-hidden="true">{goal.icon}</span>{goal.label}</button>)}</div><a className="preference-edit-link" href="/preferences">{currentProfile.activityPreferences ? "Edit activity preferences" : "Add activity preferences"} →</a></section>
      <section className="recommendations"><div className="recommendation-heading"><div><p className="section-kicker">Personalized from {activityLibrary.length} activities</p><h2>Ideas matched to you.</h2></div><p>Complete activities and share quick feedback. Your next suggestions will adapt to what helped and what level you want next.</p></div>
        <div className="recommendation-grid">{items.map((item, index) => <article className="resource-card" key={item.id}><div className="resource-top"><span className="resource-number">{String(index + 1).padStart(2,"0")}</span><span>{item.duration}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="why-box"><strong>Why we suggested it</strong><p>{describeRecommendationReason(item, currentProfile.scores, currentProfile.activityPreferences)}</p></div><div className="action-line"><span aria-hidden="true">↗</span><p><strong>Try this:</strong> {item.action}</p></div><div className="card-actions"><button onClick={() => toggleBookmark(item.id)} aria-pressed={currentProfile.bookmarks.includes(item.id)}>{currentProfile.bookmarks.includes(item.id) ? "★ Saved" : "☆ Save"}</button><button className="done-action" onClick={() => beginCompletion(item.id)}>Mark done</button><button onClick={() => dismiss(item.id)}>Not for me</button></div></article>)}</div>
        {visibleCount < rankedItems.length && <div className="more-ideas"><button className="ghost-button" onClick={() => setVisibleCount((count) => count + 6)}>Show more ideas</button><span>{rankedItems.length - visibleCount} more in this goal</span></div>}
        {!items.length && <div className="all-dismissed"><h3>You’ve explored this set.</h3><p>Switch goals, restore an activity, or try a completed idea again.</p></div>}
        <div className="dismissed-library">
          <button className="dismissed-toggle" type="button" aria-expanded={showDismissed} onClick={() => setShowDismissed((open) => !open)}>
            <span>Not for Me</span><span>{dismissedItems.length} saved {showDismissed ? "↑" : "↓"}</span>
          </button>
          {showDismissed && <div className="dismissed-panel"><div className="dismissed-heading"><div><h3>Suggestions you passed on</h3><p>These stay here unless you restore them.</p></div>{dismissedItems.length > 0 && <button type="button" onClick={() => update({ ...currentProfile, dismissed: [] })}>Restore all</button>}</div>
            {dismissedItems.length ? <ul>{dismissedItems.map((item) => <li key={item.id}><div><strong>{item.title}</strong><span>{goals.find((goal) => goal.key === item.goal)?.label} · {item.duration}</span></div><button type="button" onClick={() => restore(item.id)}>Bring back</button></li>)}</ul> : <p className="dismissed-empty">Activities marked “Not for me” will appear here, so you can always bring them back.</p>}
          </div>}
        </div>
        <div className="dismissed-library progress-library">
          <button className="dismissed-toggle" type="button" aria-expanded={showProgress} onClick={() => setShowProgress((open) => !open)}><span>My Progress</span><span>{completedItems.length} completed {showProgress ? "↑" : "↓"}</span></button>
          {showProgress && <div className="dismissed-panel"><div className="dismissed-heading"><div><h3>Activities you completed</h3><p>Your feedback helps refresh what appears next.</p></div></div>{completedItems.length ? <ul>{completedItems.map(({ completion, item }) => <li key={completion.activityId}><div><strong>{item?.title}</strong><span>{completion.helpful === "yes" ? "Helpful" : completion.helpful === "somewhat" ? "Somewhat helpful" : "Not helpful"} · {new Date(completion.completedAt).toLocaleDateString()}</span></div><button type="button" onClick={() => tryAgain(completion.activityId)}>Try again</button></li>)}</ul> : <p className="dismissed-empty">Complete an activity and it will appear here.</p>}</div>}
        </div>
      </section>
      {completingId && <div className="feedback-backdrop"><section className="feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-title"><button className="feedback-close" type="button" aria-label="Close reflection" onClick={() => setCompletingId(null)}>×</button><p className="eyebrow">Activity complete</p><h2 id="feedback-title">How did it go?</h2><p>This quick reflection helps choose what to show you next.</p>
        <fieldset><legend>Was this activity helpful?</legend><div>{[["yes","Yes"],["somewhat","Somewhat"],["no","Not really"]].map(([value,label]) => <label key={value}><input type="radio" name="helpful" checked={feedback.helpful === value} onChange={() => setFeedback({ ...feedback, helpful: value as ActivityCompletion["helpful"] })}/><span>{label}</span></label>)}</div></fieldset>
        <fieldset><legend>Would you be open to similar activities?</legend><div>{[["yes","Yes"],["maybe","Maybe"],["no","No"]].map(([value,label]) => <label key={value}><input type="radio" name="similar" checked={feedback.similar === value} onChange={() => setFeedback({ ...feedback, similar: value as ActivityCompletion["similar"] })}/><span>{label}</span></label>)}</div></fieldset>
        <fieldset><legend>What should the next activity feel like?</legend><div>{[["easier","A little easier"],["same","About the same"],["higher","A step further"]].map(([value,label]) => <label key={value}><input type="radio" name="next-step" checked={feedback.nextStep === value} onChange={() => setFeedback({ ...feedback, nextStep: value as ActivityCompletion["nextStep"] })}/><span>{label}</span></label>)}</div></fieldset>
        <button className="button" type="button" onClick={saveCompletion}>Save and refresh suggestions →</button></section></div>}
      <section className="account-preview"><div><p className="eyebrow">Coming later</p><h2>Save your results across devices.</h2><p>Optional accounts will let you open your toolkit on another device. For now, everything stays in this browser.</p></div><button className="disabled-button" disabled>Cloud saving, coming soon</button></section>
    </PageShell>
  );
}
