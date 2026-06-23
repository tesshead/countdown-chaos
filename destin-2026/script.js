// Countdown target: August 7, 2026 at 12:00 PM America/New_York.
const tripDate = new Date("2026-08-07T12:00:00-04:00").getTime();

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

  const hype = calculateHype(days, diff);
  document.getElementById("hype-fill").style.width = `${hype}%`;
  document.getElementById("hype-percent").textContent = `${hype}%`;
}

function calculateHype(daysUntilTrip, millisecondsUntilTrip) {
  if (millisecondsUntilTrip <= 0) return 100;
  if (daysUntilTrip > 90) return 10;
  if (daysUntilTrip > 60) return 25;
  if (daysUntilTrip > 30) return 55;
  if (daysUntilTrip > 14) return 78;
  if (daysUntilTrip > 7) return 90;
  return 98;
}

function playBeachSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.34, context.currentTime + 0.12);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.35);
  master.connect(context.destination);

  const noiseLength = Math.floor(context.sampleRate * 2.4);
  const noiseBuffer = context.createBuffer(1, noiseLength, context.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseLength; i += 1) {
    const fadeIn = Math.min(1, i / (context.sampleRate * .45));
    const fadeOut = Math.min(1, (noiseLength - i) / (context.sampleRate * .7));
    data[i] = (Math.random() * 2 - 1) * fadeIn * fadeOut;
  }

  const surf = context.createBufferSource();
  const surfLowpass = context.createBiquadFilter();
  const surfHighpass = context.createBiquadFilter();
  const surfGain = context.createGain();
  surf.buffer = noiseBuffer;
  surfLowpass.type = "lowpass";
  surfLowpass.frequency.value = 920;
  surfHighpass.type = "highpass";
  surfHighpass.frequency.value = 120;
  surfGain.gain.setValueAtTime(0.0001, context.currentTime);
  surfGain.gain.exponentialRampToValueAtTime(0.42, context.currentTime + .45);
  surfGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.35);
  surf.connect(surfLowpass).connect(surfHighpass).connect(surfGain).connect(master);
  surf.start();
  surf.stop(context.currentTime + 2.45);

  [0.32, 0.62].forEach((offset, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(index ? 980 : 860, context.currentTime + offset);
    osc.frequency.exponentialRampToValueAtTime(index ? 1380 : 1260, context.currentTime + offset + .11);
    osc.frequency.exponentialRampToValueAtTime(index ? 740 : 680, context.currentTime + offset + .32);
    gain.gain.setValueAtTime(.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(.12, context.currentTime + offset + .06);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + offset + .42);
    osc.connect(gain).connect(master);
    osc.start(context.currentTime + offset);
    osc.stop(context.currentTime + offset + .45);
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
  playBeachSound();
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
