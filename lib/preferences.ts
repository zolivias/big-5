import type { ActivityPreferences } from "./types";

type Option = { value: string; label: string };

export const preferenceQuestions: Array<{
  key: keyof ActivityPreferences;
  title: string;
  help?: string;
  multiple?: boolean;
  options: Option[];
}> = [
  {
    key: "setting",
    title: "Which activity setting would you most likely participate in?",
    options: [
      { value: "solo", label: "On my own" }, { value: "pair", label: "With one other person" },
      { value: "small-group", label: "In a small group" }, { value: "large-group", label: "In a large group" },
      { value: "depends", label: "It depends" },
    ],
  },
  {
    key: "role",
    title: "When you are with others, what role would you prefer?",
    help: "Choose ‘No preference’ if this does not apply to you.",
    options: [
      { value: "lead", label: "Taking the lead" }, { value: "equal", label: "Sharing responsibility equally" },
      { value: "participant", label: "Participating without a specific role" },
      { value: "no-preference", label: "No preference or it depends" },
    ],
  },
  {
    key: "structure",
    title: "How much structure would you prefer?",
    options: [
      { value: "step-by-step", label: "Clear, step-by-step instructions" },
      { value: "starting-point", label: "A simple starting point that I can adapt" },
      { value: "options", label: "A few options to choose from" }, { value: "unsure", label: "I’m not sure" },
    ],
  },
  {
    key: "commitment",
    title: "How often could you realistically see yourself doing an activity?",
    options: [
      { value: "once", label: "Just once when I feel like it" }, { value: "monthly", label: "A few times a month" },
      { value: "weekly", label: "A few times a week" }, { value: "most-days", label: "Most days" },
      { value: "depends", label: "It depends" },
    ],
  },
  {
    key: "novelty",
    title: "How familiar or new should an activity feel?",
    options: [
      { value: "familiar", label: "Very familiar" }, { value: "small-change", label: "Familiar with small changes" },
      { value: "mixed", label: "A mix of familiar and new" }, { value: "new", label: "Something completely new" },
      { value: "no-preference", label: "No preference" },
    ],
  },
  {
    key: "challenge",
    title: "What level of challenge feels right?",
    options: [
      { value: "easy", label: "Easy to begin" }, { value: "small", label: "A small challenge" },
      { value: "moderate", label: "A moderate challenge" }, { value: "stretch", label: "A bigger stretch" },
      { value: "depends", label: "It depends" },
    ],
  },
  {
    key: "benefits",
    title: "What would you like to get from the activity?",
    help: "Choose up to three.", multiple: true,
    options: [
      { value: "calm", label: "Feel calmer or less stressed" }, { value: "mood", label: "Improve my mood" },
      { value: "fun", label: "Have fun" }, { value: "energy", label: "Feel more energized" },
      { value: "express", label: "Express myself" }, { value: "accomplished", label: "Feel accomplished" },
      { value: "connect", label: "Connect with others" }, { value: "skill", label: "Learn or improve a skill" },
      { value: "understand", label: "Understand myself better" }, { value: "distract", label: "Distract myself" },
      { value: "none", label: "I’m not looking for anything specific" },
    ],
  },
  {
    key: "constraints",
    title: "Does the activity need to meet any of these needs?",
    help: "Select all that apply.", multiple: true,
    options: [
      { value: "free", label: "Free" }, { value: "quiet", label: "Quiet" }, { value: "private", label: "Private" },
      { value: "no-supplies", label: "No additional supplies" }, { value: "home", label: "Possible at home" },
      { value: "outside", label: "Possible outside" }, { value: "low-energy", label: "Low physical energy" },
      { value: "no-screen", label: "No screen" }, { value: "none", label: "None of these" },
    ],
  },
  {
    key: "interests",
    title: "What kinds of activities sound most appealing?",
    help: "Select all that apply.", multiple: true,
    options: [
      { value: "writing", label: "Writing or journaling" }, { value: "creative", label: "Creative activities" },
      { value: "movement", label: "Movement or exercise" }, { value: "social", label: "Interactions with others" },
      { value: "planning", label: "Planning or organizing" }, { value: "games", label: "Games or challenges" },
      { value: "mindfulness", label: "Mindfulness and breathing" }, { value: "music", label: "Music" },
      { value: "learning", label: "Learning something new" }, { value: "outside", label: "Spending time outside" },
      { value: "open", label: "I am open to anything" },
    ],
  },
  {
    key: "time",
    title: "How much time would you usually want to spend on an activity?",
    options: [
      { value: "5", label: "5 minutes or less" }, { value: "15", label: "6 to 15 minutes" },
      { value: "30", label: "16 to 30 minutes" }, { value: "60", label: "31 to 60 minutes" },
      { value: "over-60", label: "More than an hour" }, { value: "depends", label: "It depends" },
    ],
  },
];

export const emptyActivityPreferences: Partial<ActivityPreferences> = {
  benefits: [], constraints: [], interests: [],
};

export function setMultiplePreference(key: "benefits" | "constraints" | "interests", current: string[], value: string, checked: boolean) {
  const exclusive = key === "interests" ? "open" : "none";
  if (value === exclusive) return checked ? [value] : [];

  const selected = current.filter((item) => item !== exclusive && item !== value);
  if (!checked) return selected;
  if (key === "benefits" && selected.length >= 3) return selected;
  return [...selected, value];
}
