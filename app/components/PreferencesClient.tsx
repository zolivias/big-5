"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "./Shell";
import { emptyActivityPreferences, preferenceQuestions } from "../../lib/preferences";
import { loadProfile, saveProfile } from "../../lib/storage";
import type { ActivityPreferences, LocalProfile } from "../../lib/types";

export function PreferencesClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  const [answers, setAnswers] = useState<Partial<ActivityPreferences>>(emptyActivityPreferences);
  const [notice, setNotice] = useState("");
  useEffect(() => { queueMicrotask(() => { const saved = loadProfile(); setProfile(saved); setAnswers(saved.activityPreferences || emptyActivityPreferences); }); }, []);

  function choose(key: keyof ActivityPreferences, value: string, multiple = false) {
    setNotice("");
    setAnswers((current) => {
      if (!multiple) return { ...current, [key]: value };
      const values = [...((current[key] as string[] | undefined) || [])];
      if (key === "benefits" && value === "none") return { ...current, [key]: [value] };
      if (key === "benefits" && !values.includes(value) && values.filter((item) => item !== "none").length >= 3) { setNotice("Choose up to three benefits."); return current; }
      if ((key === "constraints" && value === "none") || (key === "interests" && value === "open")) return { ...current, [key]: [value] };
      const withoutExclusive = values.filter((item) => item !== "none" && item !== "open");
      const next = withoutExclusive.includes(value) ? withoutExclusive.filter((item) => item !== value) : [...withoutExclusive, value];
      return { ...current, [key]: next };
    });
  }

  function submit() {
    if (!profile) return;
    const singleKeys: Array<keyof ActivityPreferences> = ["setting", "role", "structure", "commitment", "novelty", "challenge", "time"];
    const missing = singleKeys.some((key) => !answers[key]) || !answers.benefits?.length || !answers.constraints?.length || !answers.interests?.length;
    if (missing) { setNotice("Please answer each question before continuing."); return; }
    const next = { ...profile, activityPreferences: answers as ActivityPreferences };
    saveProfile(next); router.push("/toolkit");
  }

  if (!profile) return <div className="loading-state" role="status">Opening your activity preferences…</div>;
  if (!profile.scores.length) return <PageShell><section className="empty-state"><p className="eyebrow">Start with your traits</p><h1>Take the Big Five assessment first.</h1><a className="button" href="/assessment">Take the test →</a></section></PageShell>;

  return <PageShell><section className="preference-hero"><p className="eyebrow">Activity preferences</p><h1>What would you actually want to try?</h1><p>Your answers help Path Five suggest activities that fit your time, interests, and practical needs. They do not affect your personality scores.</p></section><section className="preference-form">{preferenceQuestions.map((question, index) => { const selected = answers[question.key]; const selectedValues = Array.isArray(selected) ? selected : []; return <fieldset className="preference-question" key={question.key}><legend><span>{String(index + 1).padStart(2, "0")}</span><strong>{question.title}</strong>{question.help && <small>{question.help}</small>}</legend><div className="preference-options">{question.options.map((option) => { const checked = question.multiple ? selectedValues.includes(option.value as never) : selected === option.value; return <label className={checked ? "selected" : ""} key={option.value}><input type={question.multiple ? "checkbox" : "radio"} name={String(question.key)} checked={checked} onChange={() => choose(question.key, option.value, question.multiple)} /><span>{option.label}</span></label>; })}</div></fieldset>; })}<div className="preference-submit"><p aria-live="polite">{notice || "Your answers are stored only in this browser."}</p><button className="button" onClick={submit}>Save and see suggestions →</button></div></section></PageShell>;
}
