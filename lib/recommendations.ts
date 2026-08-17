import type { ActivityPreferences, GoalKey, Recommendation, TraitScore } from "./types";

export const goals: Array<{ key: GoalKey; label: string; icon: string }> = [
  { key: "studying", label: "Study with less friction", icon: "✦" },
  { key: "relationships", label: "Build stronger relationships", icon: "♡" },
  { key: "stress", label: "Handle stress more gently", icon: "○" },
  { key: "confidence", label: "Grow steady confidence", icon: "↗" },
  { key: "reflection", label: "Understand myself better", icon: "◎" },
];

const universal: Recommendation[] = [
  { id: "study-start", goal: "studying", title: "The ten-minute opening", description: "Choose the smallest visible first step, set a ten-minute timer, and stop or continue when it rings.", why: "A tiny starting line lowers the effort needed to begin, no matter your personality pattern.", action: "Name one task and its first physical action.", duration: "10 min", preferenceTags: { settings: ["solo"], structures: ["step-by-step", "starting-point"], commitments: ["once", "weekly", "most-days"], challenges: ["easy", "small"], benefits: ["accomplished", "skill"], constraints: ["free", "quiet", "private", "no-supplies", "home", "low-energy", "no-screen"], interests: ["planning"], maxMinutes: 10 } },
  { id: "relationship-check", goal: "relationships", title: "Ask before advising", description: "Try: “Do you want ideas, help, or just company right now?”", why: "Clear invitations reduce guessing and make support feel more personal.", action: "Use the question in one conversation this week.", duration: "2 min", preferenceTags: { settings: ["pair", "small-group"], roles: ["participant", "equal"], structures: ["starting-point"], commitments: ["once", "weekly"], challenges: ["small"], benefits: ["connect"], constraints: ["free", "no-supplies", "no-screen"], interests: ["social"], maxMinutes: 2 } },
  { id: "stress-ground", goal: "stress", title: "Name five neutral things", description: "Notice five things you can see, four you can feel, and three you can hear without judging them.", why: "Focusing on what is around you can help you feel more present during an intense moment.", action: "Save this for your next stressful transition.", duration: "3 min", preferenceTags: { settings: ["solo"], structures: ["step-by-step"], commitments: ["once", "monthly", "weekly"], novelties: ["familiar", "small-change"], challenges: ["easy"], benefits: ["calm", "distract"], constraints: ["free", "quiet", "private", "no-supplies", "home", "outside", "low-energy", "no-screen"], interests: ["mindfulness"], maxMinutes: 3 } },
  { id: "confidence-proof", goal: "confidence", title: "Keep a proof file", description: "Write down one effort, brave choice, or small follow-through each day, not just outcomes.", why: "Specific examples can remind you that you are able to act, learn, and recover.", action: "Add your first example now.", duration: "4 min", preferenceTags: { settings: ["solo"], structures: ["starting-point"], commitments: ["weekly", "most-days"], challenges: ["easy", "small"], benefits: ["accomplished", "understand"], constraints: ["free", "quiet", "private", "no-supplies", "home", "low-energy"], interests: ["writing"], maxMinutes: 4 } },
  { id: "reflect-context", goal: "reflection", title: "Where does this trait help?", description: "Pick one result and name a setting where it helps you, plus one where you adjust it.", why: "Traits are tendencies, not rules. Context helps you read a score without turning it into a label.", action: "Complete both halves of the sentence.", duration: "6 min", preferenceTags: { settings: ["solo", "pair"], structures: ["starting-point", "options"], commitments: ["once", "monthly"], challenges: ["small", "moderate"], benefits: ["understand", "express"], constraints: ["free", "quiet", "private", "no-supplies", "home", "low-energy", "no-screen"], interests: ["writing", "learning"], maxMinutes: 6 } },
];

const traitBased: Recommendation[] = [
  { id: "c-low-study", goal: "studying", trait: "conscientiousness", bands: ["lower"], title: "Borrow structure from your environment", description: "Make the next action visible, use one reminder, and study beside someone who is also working.", why: "Your results suggest rigid self-management may cost extra energy; external cues can carry part of the load.", action: "Prepare tomorrow’s first task before you stop today.", duration: "8 min", preferenceTags: { settings: ["solo", "pair"], structures: ["step-by-step"], commitments: ["weekly", "most-days"], challenges: ["small"], benefits: ["accomplished", "skill"], constraints: ["free", "quiet", "no-supplies", "home", "low-energy"], interests: ["planning", "social"], maxMinutes: 8 } },
  { id: "c-high-study", goal: "studying", trait: "conscientiousness", bands: ["higher"], title: "Define ‘done enough’ first", description: "Before you begin, write the minimum standard that would make this session worthwhile.", why: "Your organized approach is an asset; a stopping rule can keep high standards from consuming every available minute.", action: "Set one finish line for today’s work.", duration: "3 min", preferenceTags: { settings: ["solo"], structures: ["starting-point"], commitments: ["once", "most-days"], challenges: ["easy"], benefits: ["accomplished", "understand"], constraints: ["free", "quiet", "private", "no-supplies", "home", "low-energy", "no-screen"], interests: ["writing", "planning"], maxMinutes: 3 } },
  { id: "e-low-rel", goal: "relationships", trait: "extraversion", bands: ["lower"], title: "Choose depth over volume", description: "Invite one person into a low-pressure activity with a clear start and end.", why: "Your social energy may work best in smaller doses. Connection does not need a crowded room.", action: "Send one specific invitation.", duration: "5 min", preferenceTags: { settings: ["pair"], roles: ["participant", "equal"], structures: ["starting-point", "options"], commitments: ["once", "monthly"], novelties: ["familiar", "small-change"], challenges: ["small"], benefits: ["connect", "fun"], constraints: ["free"], interests: ["social"], maxMinutes: 5 } },
  { id: "e-high-rel", goal: "relationships", trait: "extraversion", bands: ["higher"], title: "Leave a listening beat", description: "After someone finishes, wait two seconds and ask one follow-up before adding your experience.", why: "Your expressive energy can build momentum; a deliberate pause makes more room for other people.", action: "Try the two-second pause today.", duration: "2 min", preferenceTags: { settings: ["pair", "small-group", "large-group"], roles: ["participant", "equal", "lead"], structures: ["starting-point"], commitments: ["once", "weekly"], challenges: ["small"], benefits: ["connect"], constraints: ["free", "no-supplies", "no-screen"], interests: ["social"], maxMinutes: 2 } },
  { id: "n-high-stress", goal: "stress", trait: "emotionalStability", bands: ["higher"], title: "Name what you feel", description: "Name the feeling, rate its intensity, and identify what your body needs in the next ten minutes.", why: "Your answers suggest that you may react strongly to stress. Naming what is happening can help you decide what to do next.", action: "Write: “Right now I notice…”", duration: "5 min", preferenceTags: { settings: ["solo", "pair"], structures: ["step-by-step"], commitments: ["once", "monthly", "weekly"], challenges: ["easy", "small"], benefits: ["calm", "express", "understand"], constraints: ["free", "quiet", "private", "no-supplies", "home", "low-energy", "no-screen"], interests: ["writing", "mindfulness"], maxMinutes: 5 } },
  { id: "n-low-stress", goal: "stress", trait: "emotionalStability", bands: ["lower"], title: "Check the quiet signals", description: "Scan your sleep, jaw, shoulders, appetite, and focus before deciding you are fine.", why: "You may stay calm under pressure, but stress can still show up in your body.", action: "Choose one body signal to check this week.", duration: "3 min", preferenceTags: { settings: ["solo"], structures: ["step-by-step", "starting-point"], commitments: ["monthly", "weekly"], challenges: ["easy"], benefits: ["calm", "understand"], constraints: ["free", "quiet", "private", "no-supplies", "home", "low-energy", "no-screen"], interests: ["mindfulness"], maxMinutes: 3 } },
  { id: "a-high-conf", goal: "confidence", trait: "agreeableness", bands: ["higher"], title: "Practice a warm no", description: "Use: “I care about this, and I can’t take it on right now.”", why: "Your cooperative style can be a strength. Boundaries help protect the energy that makes your care sustainable.", action: "Draft one sentence for a real situation.", duration: "5 min", preferenceTags: { settings: ["solo", "pair"], roles: ["participant", "equal"], structures: ["starting-point"], commitments: ["once", "monthly"], challenges: ["moderate"], benefits: ["accomplished", "connect"], constraints: ["free", "no-supplies", "home", "low-energy", "no-screen"], interests: ["writing", "social"], maxMinutes: 5 } },
  { id: "a-low-rel", goal: "relationships", trait: "agreeableness", bands: ["lower"], title: "Pair honesty with a question", description: "Try: “Here’s how I see it. What am I missing?”", why: "You may communicate directly. Asking a question can help others understand your point without feeling shut out.", action: "Use the sentence in one low-stakes discussion.", duration: "3 min", preferenceTags: { settings: ["pair", "small-group"], roles: ["participant", "lead"], structures: ["starting-point"], commitments: ["once", "monthly", "weekly"], challenges: ["small", "moderate"], benefits: ["connect", "understand"], constraints: ["free", "no-supplies", "no-screen"], interests: ["social"], maxMinutes: 3 } },
  { id: "o-high-reflect", goal: "reflection", trait: "openness", bands: ["higher"], title: "Turn one idea into an experiment", description: "Choose one interesting idea and test the smallest real version within 48 hours.", why: "Your curiosity can generate many possibilities. A tiny experiment converts insight into useful evidence.", action: "Write the idea, test, and deadline.", duration: "7 min", preferenceTags: { settings: ["solo", "pair"], roles: ["participant", "lead"], structures: ["starting-point", "options"], commitments: ["once"], novelties: ["mixed", "new"], challenges: ["moderate", "stretch"], benefits: ["understand", "skill", "accomplished"], constraints: ["free", "no-supplies", "home"], interests: ["creative", "learning", "planning"], maxMinutes: 7 } },
  { id: "o-low-conf", goal: "confidence", trait: "openness", bands: ["lower"], title: "Stretch from something familiar", description: "Change one element of a routine you already know rather than starting from a blank page.", why: "You may prefer concrete, familiar ground. Growth can begin from stability instead of novelty for its own sake.", action: "Pick one 10% change.", duration: "5 min", preferenceTags: { settings: ["solo"], structures: ["starting-point", "options"], commitments: ["once", "monthly"], novelties: ["familiar", "small-change"], challenges: ["small"], benefits: ["accomplished", "skill"], constraints: ["free", "no-supplies", "home", "low-energy"], interests: ["planning", "learning"], maxMinutes: 5 } },
];

function preferenceScore(item: Recommendation, preferences?: ActivityPreferences) {
  if (!preferences || !item.preferenceTags) return 0;
  const tags = item.preferenceTags;
  let score = 0;
  if (preferences.setting === "depends" || tags.settings?.includes(preferences.setting)) score += 2;
  if (preferences.role === "no-preference" || tags.roles?.includes(preferences.role)) score += 1;
  if (preferences.structure === "unsure" || tags.structures?.includes(preferences.structure)) score += 2;
  if (preferences.commitment === "depends" || tags.commitments?.includes(preferences.commitment)) score += 1;
  if (preferences.novelty === "no-preference" || tags.novelties?.includes(preferences.novelty)) score += 1;
  if (preferences.challenge === "depends" || tags.challenges?.includes(preferences.challenge)) score += 2;
  if (preferences.benefits.includes("none")) score += 1;
  else score += preferences.benefits.filter((value) => tags.benefits?.includes(value)).length * 2;
  score += preferences.constraints.filter((value) => value !== "none" && tags.constraints?.includes(value)).length;
  if (preferences.interests.includes("open")) score += 1;
  else score += preferences.interests.filter((value) => tags.interests?.includes(value)).length * 2;
  const available = preferences.time === "depends" || preferences.time === "over-60" ? Infinity : Number(preferences.time);
  if ((tags.maxMinutes || 0) <= available) score += 3;
  else score -= 4;
  return score;
}

export function getRecommendations(scores: TraitScore[], goal: GoalKey, preferences?: ActivityPreferences): Recommendation[] {
  const matches = traitBased.filter((item) => {
    if (item.goal !== goal || !item.trait || !item.bands) return false;
    const score = scores.find((entry) => entry.trait === item.trait);
    return Boolean(score && item.bands.includes(score.band));
  });
  return [...matches, ...universal.filter((item) => item.goal === goal)]
    .sort((a, b) => preferenceScore(b, preferences) - preferenceScore(a, preferences))
    .slice(0, 4);
}

export function describePreferenceMatch(item: Recommendation, preferences?: ActivityPreferences) {
  if (!preferences || !item.preferenceTags) return "";
  const matches: string[] = [];
  const available = preferences.time === "depends" || preferences.time === "over-60" ? Infinity : Number(preferences.time);
  if ((item.preferenceTags.maxMinutes || 0) <= available) matches.push("your available time");
  if (preferences.interests.includes("open") || preferences.interests.some((value) => item.preferenceTags?.interests?.includes(value))) matches.push("your interests");
  if (preferences.setting === "depends" || item.preferenceTags.settings?.includes(preferences.setting)) matches.push("your preferred setting");
  return matches.length ? `It also fits ${matches.slice(0, 2).join(" and ")}.` : "It may still be worth trying even though it is not a close preference match.";
}
