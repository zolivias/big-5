import type { GoalKey, Recommendation, TraitScore } from "./types";

export const goals: Array<{ key: GoalKey; label: string; icon: string }> = [
  { key: "studying", label: "Study with less friction", icon: "✦" },
  { key: "relationships", label: "Build stronger relationships", icon: "♡" },
  { key: "stress", label: "Handle stress more gently", icon: "○" },
  { key: "confidence", label: "Grow steady confidence", icon: "↗" },
  { key: "reflection", label: "Understand myself better", icon: "◎" },
];

const universal: Recommendation[] = [
  { id: "study-start", goal: "studying", title: "The ten-minute opening", description: "Choose the smallest visible first step, set a ten-minute timer, and stop or continue when it rings.", why: "A tiny starting line lowers the effort needed to begin, no matter your personality pattern.", action: "Name one task and its first physical action.", duration: "10 min" },
  { id: "relationship-check", goal: "relationships", title: "Ask before advising", description: "Try: “Do you want ideas, help, or just company right now?”", why: "Clear invitations reduce guessing and make support feel more personal.", action: "Use the question in one conversation this week.", duration: "2 min" },
  { id: "stress-ground", goal: "stress", title: "Name five neutral things", description: "Notice five things you can see, four you can feel, and three you can hear—without judging them.", why: "Directing attention to the present can create a little space around an intense moment.", action: "Save this for your next stressful transition.", duration: "3 min" },
  { id: "confidence-proof", goal: "confidence", title: "Keep a proof file", description: "Write down one effort, brave choice, or small follow-through each day—not just outcomes.", why: "Confidence grows from specific evidence that you can act, learn, and recover.", action: "Add your first piece of evidence now.", duration: "4 min" },
  { id: "reflect-context", goal: "reflection", title: "Where does this trait help?", description: "Pick one result and name a setting where it helps you, plus one where you adjust it.", why: "Traits are tendencies, not rules. Context helps you read a score without turning it into a label.", action: "Complete both halves of the sentence.", duration: "6 min" },
];

const traitBased: Recommendation[] = [
  { id: "c-low-study", goal: "studying", trait: "conscientiousness", bands: ["lower"], title: "Borrow structure from your environment", description: "Make the next action visible, use one reminder, and study beside someone who is also working.", why: "Your results suggest rigid self-management may cost extra energy; external cues can carry part of the load.", action: "Prepare tomorrow’s first task before you stop today.", duration: "8 min" },
  { id: "c-high-study", goal: "studying", trait: "conscientiousness", bands: ["higher"], title: "Define ‘done enough’ first", description: "Before you begin, write the minimum standard that would make this session worthwhile.", why: "Your organized approach is an asset; a stopping rule can keep high standards from consuming every available minute.", action: "Set one finish line for today’s work.", duration: "3 min" },
  { id: "e-low-rel", goal: "relationships", trait: "extraversion", bands: ["lower"], title: "Choose depth over volume", description: "Invite one person into a low-pressure activity with a clear start and end.", why: "Your social energy may work best in smaller doses. Connection does not need a crowded room.", action: "Send one specific invitation.", duration: "5 min" },
  { id: "e-high-rel", goal: "relationships", trait: "extraversion", bands: ["higher"], title: "Leave a listening beat", description: "After someone finishes, wait two seconds and ask one follow-up before adding your experience.", why: "Your expressive energy can build momentum; a deliberate pause makes more room for other people.", action: "Try the two-second pause today.", duration: "2 min" },
  { id: "s-low-stress", goal: "stress", trait: "emotionalStability", bands: ["lower"], title: "Make a weather report", description: "Name the feeling, rate its intensity, and identify what your body needs in the next ten minutes.", why: "Your answers suggest emotions may arrive vividly. Naming the current state can make it easier to choose a response.", action: "Write: “Right now I notice…”", duration: "5 min" },
  { id: "s-high-stress", goal: "stress", trait: "emotionalStability", bands: ["higher"], title: "Check the quiet signals", description: "Scan sleep, jaw, shoulders, appetite, and focus before deciding you are fine.", why: "Steadiness is useful, but stress can sometimes show up physically before it feels urgent.", action: "Choose one body signal to check this week.", duration: "3 min" },
  { id: "a-high-conf", goal: "confidence", trait: "agreeableness", bands: ["higher"], title: "Practice a warm no", description: "Use: “I care about this, and I can’t take it on right now.”", why: "Your cooperative style can be a strength. Boundaries help protect the energy that makes your care sustainable.", action: "Draft one sentence for a real situation.", duration: "5 min" },
  { id: "a-low-rel", goal: "relationships", trait: "agreeableness", bands: ["lower"], title: "Translate honesty into impact", description: "Pair your view with curiosity: “Here’s how I see it—what am I missing?”", why: "Your directness can create clarity; curiosity makes that clarity easier for others to receive.", action: "Use the sentence in one low-stakes discussion.", duration: "3 min" },
  { id: "o-high-reflect", goal: "reflection", trait: "openness", bands: ["higher"], title: "Turn one idea into an experiment", description: "Choose one interesting idea and test the smallest real version within 48 hours.", why: "Your curiosity can generate many possibilities. A tiny experiment converts insight into useful evidence.", action: "Write the idea, test, and deadline.", duration: "7 min" },
  { id: "o-low-conf", goal: "confidence", trait: "openness", bands: ["lower"], title: "Stretch from something familiar", description: "Change one element of a routine you already know rather than starting from a blank page.", why: "You may prefer concrete, familiar ground. Growth can begin from stability instead of novelty for its own sake.", action: "Pick one 10% change.", duration: "5 min" },
];

export function getRecommendations(scores: TraitScore[], goal: GoalKey): Recommendation[] {
  const matches = traitBased.filter((item) => {
    if (item.goal !== goal || !item.trait || !item.bands) return false;
    const score = scores.find((entry) => entry.trait === item.trait);
    return Boolean(score && item.bands.includes(score.band));
  });
  return [...matches, ...universal.filter((item) => item.goal === goal)].slice(0, 4);
}
