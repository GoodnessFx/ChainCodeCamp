const KEY = "ccc_streak_v1";

interface StreakState {
  days: string[]; // ISO yyyy-mm-dd of active days, sorted
  lastVisit: string | null;
}

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function load(): StreakState {
  if (typeof window === "undefined") return { days: [], lastVisit: null };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { days: [], lastVisit: null };
    return JSON.parse(raw) as StreakState;
  } catch {
    return { days: [], lastVisit: null };
  }
}

function save(s: StreakState) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

function dayBefore(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** Record today's visit. Call once per page load on the dashboard. */
export function touchStreak(): number {
  const t = today();
  const s = load();
  if (s.lastVisit !== t) {
    s.lastVisit = t;
    if (!s.days.includes(t)) s.days.push(t);
    // keep the last 60 days only
    s.days = s.days.slice(-60);
    save(s);
  }
  return currentStreak(s);
}

export function currentStreak(s: StreakState = load()): number {
  const t = today();
  if (s.days.length === 0) return 0;
  const last = s.days[s.days.length - 1];
  if (last !== t && last !== dayBefore(t)) return 0;
  let streak = 0;
  let day = last === t ? t : dayBefore(t);
  const set = new Set(s.days);
  if (!set.has(t)) day = dayBefore(t);
  while (set.has(day)) {
    streak++;
    day = dayBefore(day);
  }
  return streak;
}

export function totalActiveDays(s: StreakState = load()): number {
  return s.days.length;
}
