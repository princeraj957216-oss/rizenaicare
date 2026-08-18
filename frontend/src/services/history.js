const HISTORY_KEY = 'rizen_activity_history';

export function readHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

export function saveHistory(entry) {
  const next = [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry }, ...readHistory()].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function deleteHistoryItem(id) {
  const next = readHistory().filter((entry) => entry.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
