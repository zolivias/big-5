import type { AssessmentItem } from "./types";

const E = "extraversion" as const;
const A = "agreeableness" as const;
const C = "conscientiousness" as const;
const S = "emotionalStability" as const;
const O = "openness" as const;

export const questions: AssessmentItem[] = [
  ["Am the life of the party.", E, 1], ["Feel little concern for others.", A, -1], ["Am always prepared.", C, 1], ["Get stressed out easily.", S, -1], ["Have a rich vocabulary.", O, 1],
  ["Don't talk a lot.", E, -1], ["Am interested in people.", A, 1], ["Leave my belongings around.", C, -1], ["Am relaxed most of the time.", S, 1], ["Have difficulty understanding abstract ideas.", O, -1],
  ["Feel comfortable around people.", E, 1], ["Insult people.", A, -1], ["Pay attention to details.", C, 1], ["Worry about things.", S, -1], ["Have a vivid imagination.", O, 1],
  ["Keep in the background.", E, -1], ["Sympathize with others' feelings.", A, 1], ["Make a mess of things.", C, -1], ["Seldom feel blue.", S, 1], ["Am not interested in abstract ideas.", O, -1],
  ["Start conversations.", E, 1], ["Am not interested in other people's problems.", A, -1], ["Get chores done right away.", C, 1], ["Am easily disturbed.", S, -1], ["Have excellent ideas.", O, 1],
  ["Have little to say.", E, -1], ["Have a soft heart.", A, 1], ["Often forget to put things back in their proper place.", C, -1], ["Get upset easily.", S, -1], ["Do not have a good imagination.", O, -1],
  ["Talk to a lot of different people at parties.", E, 1], ["Am not really interested in others.", A, -1], ["Like order.", C, 1], ["Change my mood a lot.", S, -1], ["Am quick to understand things.", O, 1],
  ["Don't like to draw attention to myself.", E, -1], ["Take time out for others.", A, 1], ["Shirk my duties.", C, -1], ["Have frequent mood swings.", S, -1], ["Use difficult words.", O, 1],
  ["Don't mind being the center of attention.", E, 1], ["Feel others' emotions.", A, 1], ["Follow a schedule.", C, 1], ["Get irritated easily.", S, -1], ["Spend time reflecting on things.", O, 1],
  ["Am quiet around strangers.", E, -1], ["Make people feel at ease.", A, 1], ["Am exacting in my work.", C, 1], ["Often feel blue.", S, -1], ["Am full of ideas.", O, 1],
].map(([text, trait, keyed], index) => ({ id: index + 1, text, trait, keyed })) as AssessmentItem[];

export const responseOptions = [
  { value: 1, label: "Very inaccurate" },
  { value: 2, label: "Moderately inaccurate" },
  { value: 3, label: "Neither" },
  { value: 4, label: "Moderately accurate" },
  { value: 5, label: "Very accurate" },
];
