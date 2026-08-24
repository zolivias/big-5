export type TraitKey = "extraversion" | "agreeableness" | "conscientiousness" | "emotionalStability" | "openness";

export type GoalKey = "studying" | "relationships" | "stress" | "confidence" | "reflection";

export type ActivityCompletion = {
  activityId: string;
  completedAt: string;
  helpful: "yes" | "somewhat" | "no";
  similar: "yes" | "maybe" | "no";
  nextStep: "easier" | "same" | "higher";
};

export type ActivityPreferences = {
  setting: "solo" | "pair" | "small-group" | "large-group" | "depends";
  role: "lead" | "equal" | "participant" | "no-preference";
  structure: "step-by-step" | "starting-point" | "options" | "unsure";
  commitment: "once" | "monthly" | "weekly" | "most-days" | "depends";
  novelty: "familiar" | "small-change" | "mixed" | "new" | "no-preference";
  challenge: "easy" | "small" | "moderate" | "stretch" | "depends";
  benefits: Array<"calm" | "mood" | "fun" | "energy" | "express" | "accomplished" | "connect" | "skill" | "understand" | "distract" | "none">;
  constraints: Array<"free" | "quiet" | "private" | "no-supplies" | "home" | "outside" | "low-energy" | "no-screen" | "none">;
  interests: Array<"writing" | "creative" | "movement" | "social" | "planning" | "games" | "mindfulness" | "music" | "learning" | "outside" | "open">;
  time: "5" | "15" | "30" | "60" | "over-60" | "depends";
};

export type AssessmentItem = {
  id: number;
  text: string;
  trait: TraitKey;
  keyed: 1 | -1;
};

export type AssessmentResponses = Record<number, number>;

export type TraitScore = {
  trait: TraitKey;
  label: string;
  score: number;
  band: "lower" | "middle" | "higher";
};

export type Recommendation = {
  id: string;
  goal: GoalKey;
  title: string;
  description: string;
  why: string;
  action: string;
  duration: string;
  source?: "curated" | "ai";
  feedbackReason?: string;
  trait?: TraitKey;
  bands?: Array<TraitScore["band"]>;
  traitMatches?: Array<{
    trait: TraitKey;
    bands: Array<TraitScore["band"]>;
    reason: string;
  }>;
  preferenceTags?: {
    settings?: ActivityPreferences["setting"][];
    roles?: ActivityPreferences["role"][];
    structures?: ActivityPreferences["structure"][];
    commitments?: ActivityPreferences["commitment"][];
    novelties?: ActivityPreferences["novelty"][];
    challenges?: ActivityPreferences["challenge"][];
    benefits?: ActivityPreferences["benefits"];
    constraints?: ActivityPreferences["constraints"];
    interests?: ActivityPreferences["interests"];
    maxMinutes?: number;
  };
};

export type LocalProfile = {
  version: 1;
  responses: AssessmentResponses;
  currentQuestion: number;
  scores: TraitScore[];
  goal: GoalKey;
  bookmarks: string[];
  dismissed: string[];
  activityHistory?: ActivityCompletion[];
  generatedActivities?: Recommendation[];
  activityPreferences?: ActivityPreferences;
  completedAt?: string;
};
