// Countdown target: August 7, 2026 at 12:00 PM America/New_York.
const tripDate = new Date("2026-08-07T12:00:00-04:00").getTime();

// Hype ramps from this date to max chaos on trip day.
const hypeStartDate = new Date("2026-06-23T00:00:00-04:00").getTime();

// Easy edit zone for future nonsense.
const moods = [
  "Already mentally on the beach.",
  "Checking Google Flights again for emotional support.",
  "Productivity has left the chat.",
  "Packing list created way too early.",
  "Out of office message forming in the distance.",
  "Sunscreen? Packed. Financial judgment? Not invited."
];

const prophecies = [
  "This trip was approved by zero financial advisors.",
  "Future us can deal with the consequences.",
  "Somewhere, a beach chair is waiting for us.",
  "The vibes are non-refundable.",
  "We ride at dawn. Or like, after coffee."
];

const statusMessages = [
  "Too early to pack? Spiritually, no.",
  "Group chat monitoring has intensified.",
  "The outfit discourse window is now open.",
  "Pre-trip chaos is stretching in the hallway.",
  "Begin beach goblin transformation.",
  "This is not a drill. Hydrate and overreact.",
  "IT IS GIRLS TRIP O'CLOCK. BE NORMAL? IMPOSSIBLE."
];

const moodEl = document.getElementById("mood");
const prophecyEl = document.getElementById("prophecy");
const emergencyMessage = document.getElementById("emergency-message");
const fireworks = document.getElementById("fireworks");
const beachButton = document.getElementById("beach-button");

function pad(value) {
  return String(value).padStart(2, "0");
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function rotateCopy() {
  moodEl.textContent = randomItem(moods);
  prophecyEl.textContent = randomItem(prophecies);
}

function updateCountdown() {
  const diff = tripDate - Date.now();
  const safeDiff = Math.max(0, diff);
  const totalSeconds = Math.floor(safeDiff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);

  let index = 0;
  if (days <= 60) index = 1;
  if (days <= 45) index = 2;
  if (days <= 30) index = 3;
  if (days <= 14) index = 4;
  if (days <= 7) index = 5;
  if (diff <= 0) index = 6;
  document.getElementById("status").textContent = statusMessages[index];

  const progress = (Date.now() - hypeStartDate) / (tripDate - hypeStartDate);
  const hype = Math.max(3, Math.min(100, Math.round(progress * 100)));
  document.getElementById("hype-fill").style.width = `${hype}%`;
  document.getElementById("hype-percent").textContent = `${hype}%`;
}

function playSeagullAlarm() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.28, context.currentTime + 0.03);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.85);
  master.connect(context.destination);

  [0, .18, .36].forEach((offset) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(780, context.currentTime + offset);
    osc.frequency.exponentialRampToValueAtTime(1450, context.currentTime + offset + .08);
    osc.frequency.exponentialRampToValueAtTime(520, context.currentTime + offset + .2);
    gain.gain.setValueAtTime(.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(.22, context.currentTime + offset + .025);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + offset + .24);
    osc.connect(gain).connect(master);
    osc.start(context.currentTime + offset);
    osc.stop(context.currentTime + offset + .26);
  });
}

function launchFireworks(count = 26) {
  for (let i = 0; i < count; i += 1) {
    const burst = document.createElement("span");
    burst.className = "burst";
    burst.style.left = `${Math.random() * 100}%`;
    burst.style.top = `${Math.random() * 100}%`;
    burst.style.background = randomItem(["#fff04f", "#ff2d95", "#22d3ee", "#65ff73", "#ffffff"]);
    fireworks.appendChild(burst);
    window.setTimeout(() => burst.remove(), 850);
  }
}

function declareBeachEmergency() {
  playSeagullAlarm();
  launchFireworks();
  document.body.classList.remove("shake");
  void document.body.offsetWidth;
  document.body.classList.add("shake");
  emergencyMessage.textContent = "BEACH EMERGENCY DECLARED";
  window.setTimeout(() => {
    emergencyMessage.textContent = "";
    document.body.classList.remove("shake");
  }, 2600);
}

rotateCopy();
updateCountdown();
setInterval(updateCountdown, 1000);
setInterval(rotateCopy, 10000);

beachButton.addEventListener("click", declareBeachEmergency);
document.addEventListener("click", (event) => {
  if (event.target === beachButton) return;
  if (Math.random() > .55) launchFireworks(6);
});
