import type { LocalProfile } from "./types";

export const STORAGE_KEY = "path-five-profile-v1";
export const CLOUD_SYNC_KEY = "path-five-cloud-sync-enabled";
let cloudSaveTimer: ReturnType<typeof setTimeout> | undefined;

export const emptyProfile: LocalProfile = {
  version: 1,
  responses: {},
  currentQuestion: 0,
  scores: [],
  goal: "studying",
  bookmarks: [],
  dismissed: [],
  activityHistory: [],
};

export function loadProfile(): LocalProfile {
  if (typeof window === "undefined") return emptyProfile;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (parsed?.version !== 1) return emptyProfile;
    const sanitized = { ...parsed };
    delete sanitized.generatedActivities;
    const profile = { ...emptyProfile, ...sanitized } as LocalProfile;
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
  try {
    const next = { ...profile, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (localStorage.getItem(CLOUD_SYNC_KEY) === "1") {
      clearTimeout(cloudSaveTimer);
      cloudSaveTimer = setTimeout(() => { void fetch("/api/account", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profile: next }) }).catch(() => undefined); }, 700);
    }
  } catch { /* private browsing or full storage */ }
}

export function clearProfile() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ }
}
