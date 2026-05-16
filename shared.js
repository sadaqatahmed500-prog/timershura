// shared.js
const app = firebase.initializeApp(window.TIMER_FIREBASE_CONFIG);
const db = firebase.database();

function getRoom() {
  const params = new URLSearchParams(location.search);
  return params.get("room") || window.DEFAULT_TIMER_ROOM || "redbook";
}

function refForRoom() {
  return db.ref("obsTimers/" + getRoom());
}

function now() {
  return Date.now();
}

function calcRemaining(state) {
  const duration = Number(state.duration || 120);
  let remaining = Number(state.remaining ?? duration);

  if (state.running && state.startedAt) {
    const elapsed = Math.floor((now() - Number(state.startedAt)) / 1000);
    remaining = Number(state.baseRemaining ?? remaining) - elapsed;
  }
  return remaining;
}

function formatTime(sec) {
  const sign = sec < 0 ? "+" : "";
  sec = Math.abs(Math.floor(sec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return sign + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function defaultState() {
  return {
    duration: 120,
    remaining: 120,
    baseRemaining: 120,
    running: false,
    startedAt: null,
    updatedAt: now()
  };
}

async function ensureState() {
  const snap = await refForRoom().get();
  if (!snap.exists()) {
    await refForRoom().set(defaultState());
  }
}
