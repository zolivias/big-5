import type { LocalProfile } from "./types";

export const STORAGE_KEY = "path-five-profile-v1";

export const emptyProfile: LocalProfile = {
  version: 1,
  responses: {},
  currentQuestion: 0,
  scores: [],
  goal: "studying",
  bookmarks: [],
  dismissed: [],
};

export function loadProfile(): LocalProfile {
  if (typeof window === "undefined") return emptyProfile;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (parsed?.version !== 1) return emptyProfile;
    const profile = { ...emptyProfile, ...parsed } as LocalProfile;
    profile.scores = profile.scores.map((item) => {
      if (item.trait !== "emotionalStability" || item.label === "Neuroticism") return item;
      const score = 100 - item.score;
      return { ...item, label: "Neuroticism", score, band: score < 40 ? "lower" : score > 60 ? "higher" : "middle" };
    });
    return profile;
  } catch {
    return emptyProfile;
  }
}

export function saveProfile(profile: LocalProfile) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); } catch { /* private browsing or full storage */ }
}

export function clearProfile() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ }
}
