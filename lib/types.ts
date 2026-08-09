export type TraitKey = "extraversion" | "agreeableness" | "conscientiousness" | "emotionalStability" | "openness";

export type GoalKey = "studying" | "relationships" | "stress" | "confidence" | "reflection";

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
  trait?: TraitKey;
  bands?: Array<TraitScore["band"]>;
};

export type LocalProfile = {
  version: 1;
  responses: AssessmentResponses;
  currentQuestion: number;
  scores: TraitScore[];
  goal: GoalKey;
  bookmarks: string[];
  dismissed: string[];
  completedAt?: string;
};
