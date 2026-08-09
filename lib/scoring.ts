import { questions } from "./questions";
import type { AssessmentResponses, TraitKey, TraitScore } from "./types";

export const traitMeta: Record<TraitKey, { label: string; short: string }> = {
  extraversion: { label: "Extraversion", short: "How you direct social energy" },
  agreeableness: { label: "Agreeableness", short: "How you approach cooperation" },
  conscientiousness: { label: "Conscientiousness", short: "How you organize effort" },
  emotionalStability: { label: "Neuroticism", short: "How strongly you react to stress" },
  openness: { label: "Openness", short: "How you explore ideas and experiences" },
};

export function calculateScores(responses: AssessmentResponses): TraitScore[] {
  if (questions.some((question) => !(question.id in responses))) {
    throw new Error("All 50 questions must be answered before scoring.");
  }

  const keys = Object.keys(traitMeta) as TraitKey[];
  return keys.map((trait) => {
    const items = questions.filter((question) => question.trait === trait);
    const total = items.reduce((sum, item) => {
      const response = responses[item.id];
      if (!Number.isInteger(response) || response < 1 || response > 5) throw new Error("Responses must be whole numbers from 1 to 5.");
      return sum + (item.keyed === 1 ? response : 6 - response);
    }, 0);
    const stabilityScore = Math.round(((total - 10) / 40) * 100);
    const score = trait === "emotionalStability" ? 100 - stabilityScore : stabilityScore;
    return { trait, label: traitMeta[trait].label, score, band: score < 40 ? "lower" : score > 60 ? "higher" : "middle" };
  });
}
