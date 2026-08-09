"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "./Shell";
import { getRecommendations, goals } from "../../lib/recommendations";
import { loadProfile, saveProfile } from "../../lib/storage";
import type { GoalKey, LocalProfile } from "../../lib/types";

export function ToolkitClient() {
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  useEffect(() => { queueMicrotask(() => setProfile(loadProfile())); }, []);
  const items = useMemo(() => profile ? getRecommendations(profile.scores, profile.goal).filter((item) => !profile.dismissed.includes(item.id)) : [], [profile]);
  if (!profile) return <div className="loading-state" role="status">Opening your toolkit…</div>;
  if (!profile.scores.length) return <PageShell><section className="empty-state"><p className="eyebrow">Personalize your toolkit</p><h1>Start with your five traits.</h1><p>Your assessment results help explain why each activity might fit.</p><Link className="button" href="/assessment">Take the test →</Link></section></PageShell>;
  const currentProfile = profile;
  function update(next: LocalProfile) { setProfile(next); saveProfile(next); }
  function setGoal(goal: GoalKey) { update({ ...currentProfile, goal, dismissed: [] }); }
  function toggleBookmark(id: string) { update({ ...currentProfile, bookmarks: currentProfile.bookmarks.includes(id) ? currentProfile.bookmarks.filter((entry) => entry !== id) : [...currentProfile.bookmarks, id] }); }
  function dismiss(id: string) { update({ ...currentProfile, dismissed: [...currentProfile.dismissed, id] }); }
  return (
    <PageShell>
      <section className="toolkit-hero"><p className="eyebrow">Your personal toolkit</p><h1>What would feel <em>useful</em> right now?</h1><p>Choose one direction. You can switch whenever your needs change.</p><div className="goal-grid">{goals.map((goal) => <button key={goal.key} className={currentProfile.goal === goal.key ? "active" : ""} onClick={() => setGoal(goal.key)}><span aria-hidden="true">{goal.icon}</span>{goal.label}</button>)}</div></section>
      <section className="recommendations"><div className="recommendation-heading"><div><p className="section-kicker">Chosen for your pattern</p><h2>A few small things to try.</h2></div><p>These are experiments, not prescriptions. Keep what works and leave what doesn’t.</p></div>
        <div className="recommendation-grid">{items.map((item, index) => <article className="resource-card" key={item.id}><div className="resource-top"><span className="resource-number">0{index + 1}</span><span>{item.duration}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="why-box"><strong>Why this showed up</strong><p>{item.why}</p></div><div className="action-line"><span aria-hidden="true">↗</span><p><strong>Try this:</strong> {item.action}</p></div><div className="card-actions"><button onClick={() => toggleBookmark(item.id)} aria-pressed={currentProfile.bookmarks.includes(item.id)}>{currentProfile.bookmarks.includes(item.id) ? "★ Saved" : "☆ Save"}</button><button onClick={() => dismiss(item.id)}>Not for me</button></div></article>)}</div>
        {!items.length && <div className="all-dismissed"><h3>You’ve cleared this set.</h3><p>Switch goals or restore the suggestions to keep exploring.</p><button className="button" onClick={() => update({ ...currentProfile, dismissed: [] })}>Restore suggestions</button></div>}
      </section>
      <section className="account-preview"><div><p className="eyebrow">Coming later</p><h2>Take your path with you.</h2><p>Optional accounts will let you revisit your toolkit across devices. For now, everything stays privately in this browser.</p></div><button className="disabled-button" disabled>Cloud saving — coming soon</button></section>
    </PageShell>
  );
}
