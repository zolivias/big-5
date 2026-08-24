"use client";

import { useEffect, useMemo, useState } from "react";
import { PageShell } from "./Shell";
import { activityLibrary, describeRecommendationReason, getRecommendations, goals } from "../../lib/recommendations";
import { loadProfile, saveProfile } from "../../lib/storage";
import type { GoalKey, LocalProfile } from "../../lib/types";

export function ToolkitClient() {
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  useEffect(() => { queueMicrotask(() => setProfile(loadProfile())); }, []);
  const rankedItems = useMemo(() => profile ? getRecommendations(profile.scores, profile.goal, profile.activityPreferences).filter((item) => !profile.dismissed.includes(item.id)) : [], [profile]);
  const items = rankedItems.slice(0, visibleCount);
  if (!profile) return <div className="loading-state" role="status">Opening your toolkit…</div>;
  if (!profile.scores.length) return <PageShell><section className="empty-state"><p className="eyebrow">Personalize your toolkit</p><h1>Start with your five traits.</h1><p>Your assessment results help explain why each activity might fit.</p><a className="button" href="/assessment">Take the test →</a></section></PageShell>;
  const currentProfile = profile;
  function update(next: LocalProfile) { setProfile(next); saveProfile(next); }
  function setGoal(goal: GoalKey) { setVisibleCount(6); update({ ...currentProfile, goal, dismissed: [] }); }
  function toggleBookmark(id: string) { update({ ...currentProfile, bookmarks: currentProfile.bookmarks.includes(id) ? currentProfile.bookmarks.filter((entry) => entry !== id) : [...currentProfile.bookmarks, id] }); }
  function dismiss(id: string) { update({ ...currentProfile, dismissed: [...currentProfile.dismissed, id] }); }
  return (
    <PageShell>
      <section className="toolkit-hero"><p className="eyebrow">Your Toolkit</p><h1>What do you want <em>help with</em> right now?</h1><p>Choose a goal. Your traits and activity preferences help rank the library for you.</p><div className="goal-grid">{goals.map((goal) => <button key={goal.key} className={currentProfile.goal === goal.key ? "active" : ""} onClick={() => setGoal(goal.key)}><span aria-hidden="true">{goal.icon}</span>{goal.label}</button>)}</div><a className="preference-edit-link" href="/preferences">{currentProfile.activityPreferences ? "Edit activity preferences" : "Add activity preferences"} →</a></section>
      <section className="recommendations"><div className="recommendation-heading"><div><p className="section-kicker">Personalized from {activityLibrary.length} activities</p><h2>Ideas matched to you.</h2></div><p>Personality is only one signal. Time, setting, interests, practical needs, and your current goal also shape this list.</p></div>
        <div className="recommendation-grid">{items.map((item, index) => <article className="resource-card" key={item.id}><div className="resource-top"><span className="resource-number">{String(index + 1).padStart(2,"0")}</span><span>{item.duration}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="why-box"><strong>Why we suggested it</strong><p>{describeRecommendationReason(item, currentProfile.scores, currentProfile.activityPreferences)}</p></div><div className="action-line"><span aria-hidden="true">↗</span><p><strong>Try this:</strong> {item.action}</p></div><div className="card-actions"><button onClick={() => toggleBookmark(item.id)} aria-pressed={currentProfile.bookmarks.includes(item.id)}>{currentProfile.bookmarks.includes(item.id) ? "★ Saved" : "☆ Save"}</button><button onClick={() => dismiss(item.id)}>Not for me</button></div></article>)}</div>
        {visibleCount < rankedItems.length && <div className="more-ideas"><button className="ghost-button" onClick={() => setVisibleCount((count) => count + 6)}>Show more ideas</button><span>{rankedItems.length - visibleCount} more in this goal</span></div>}
        {!items.length && <div className="all-dismissed"><h3>You’ve cleared this set.</h3><p>Switch goals or restore the suggestions to keep exploring.</p><button className="button" onClick={() => update({ ...currentProfile, dismissed: [] })}>Restore suggestions</button></div>}
      </section>
      <section className="account-preview"><div><p className="eyebrow">Coming later</p><h2>Save your results across devices.</h2><p>Optional accounts will let you open your toolkit on another device. For now, everything stays in this browser.</p></div><button className="disabled-button" disabled>Cloud saving, coming soon</button></section>
    </PageShell>
  );
}
